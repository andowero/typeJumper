// TypeJumper Game - Core Logic

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.inputHandler = new InputHandler();
        
        // Game state
        this.score = 0;
        this.lives = 5;
        this.level = 1;
        this.gameOver = false;
        this.paused = false;
        
        // Animation parameters
        this.jumpDuration = 40; // ms - faster jump animation (was 200)
        this.jumpHeight = 60; // pixels - slightly lower jump height for faster speed
        this.platformSagAmount = 5; // pixels - how much platform sags on landing
        this.platformSagDuration = 150; // ms - sag animation duration
        
        // Game entities
        this.platforms = [];
        this.unicorn = null;
        this.platformSize = 90; // 50% bigger (60 * 1.5)
        this.platformSpacing = 24; // 20% farther apart (20 * 1.2)
        
        // Scrolling
        this.scrollSpeed = 30; // pixels per second
        this.nextRowY = 0;     // y position where the next new row will be spawned (above canvas)
        this.nextRowParity = 0; // 0 or 1 — tracks checkerboard row parity for new rows
        this.allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        this.letterPool = [];   // shuffled pool for new platform letters
        
        // Animation state
        this.jumpStartTime = 0;
        this.saggingPlatform = null;
        this.sagStartTime = 0;
        this.sagDirection = 1; // 1 for down, -1 for up
        
        // Initialize game
        this.init();
        
        // Start game loop
        this.lastTime = 0;
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    init() {
        // Clear any existing platforms
        this.platforms = [];
        this.letterPool = [];
        
        // Create checkerboard pattern of platforms
        this.createCheckerboardPlatforms();
        
        // Create unicorn at random starting position
        this.createUnicorn();
        
        // Update UI
        this.updateUI();
    }

    // Draw a letter from the shuffled pool (refills when empty)
    drawLetter() {
        if (this.letterPool.length === 0) {
            this.letterPool = [...this.allLetters];
            for (let i = this.letterPool.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.letterPool[i], this.letterPool[j]] = [this.letterPool[j], this.letterPool[i]];
            }
        }
        return this.letterPool.pop();
    }

    createCheckerboardPlatforms() {
        const step = this.platformSize + this.platformSpacing;
        const cols = Math.floor(this.canvas.width / step);
        const rows = Math.floor(this.canvas.height / step);
        
        // Create checkerboard pattern filling the canvas
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if ((row + col) % 2 === 0) {
                    const x = col * step;
                    const y = row * step;
                    const platform = new Platform(x, y, this.platformSize, this.drawLetter());
                    this.platforms.push(platform);
                }
            }
        }
        
        // After initial grid: the topmost row is row 0 (y=0).
        // New rows will be spawned above, starting one step above row 0.
        const step_ = this.platformSize + this.platformSpacing;
        // nextRowY is the y of the next row to spawn (above canvas = negative)
        this.nextRowY = -step_;
        // The row just above row 0 has parity: ((-1) + col) % 2 — row index -1 has parity 1
        // So nextRowParity = 1 (opposite of row 0 which is parity 0)
        this.nextRowParity = 1;
    }

    findNeighborPlatforms(currentPlatform) {
        // In the checkerboard, neighbors are exactly one step diagonally or two steps horizontally.
        // step = platformSize + platformSpacing
        const step = this.platformSize + this.platformSpacing;
        
        // Pixel offsets for the 6 neighbor positions
        const neighborOffsets = [
            {dx: -step, dy: -step}, // upper left (diagonal)
            {dx:  step, dy: -step}, // upper right (diagonal)
            {dx: -2*step, dy: 0},   // left (horizontal skip)
            {dx:  2*step, dy: 0},   // right (horizontal skip)
            {dx: -step, dy:  step}, // lower left (diagonal)
            {dx:  step, dy:  step}  // lower right (diagonal)
        ];
        
        const tolerance = step * 0.3; // allow for floating-point drift during scroll
        
        return this.platforms.filter(p => {
            if (p === currentPlatform) return false;
            return neighborOffsets.some(offset => {
                return Math.abs(p.x - (currentPlatform.x + offset.dx)) < tolerance &&
                       Math.abs(p.y - (currentPlatform.y + offset.dy)) < tolerance;
            });
        });
    }

    updatePlatformSagging() {
        if (this.saggingPlatform) {
            const elapsed = performance.now() - this.sagStartTime;
            
            if (elapsed < this.platformSagDuration) {
                // Calculate sag progress (0 to 1)
                const progress = elapsed / this.platformSagDuration;
                
                if (this.sagDirection === 1) {
                    // Sagging down
                    this.saggingPlatform.sagAmount = this.platformSagAmount * progress;
                } else {
                    // Returning up
                    this.saggingPlatform.sagAmount = this.platformSagAmount * (1 - progress);
                }
            } else {
                // Animation complete
                if (this.sagDirection === 1) {
                    // Start returning up
                    this.sagStartTime = performance.now();
                    this.sagDirection = -1;
                } else {
                    // Animation fully complete
                    this.saggingPlatform.sagAmount = 0;
                    this.saggingPlatform = null;
                }
            }
        }
    }

    createUnicorn() {
        // Find all platforms on the lowest level (highest y value)
        const lowestPlatforms = [];
        let maxY = -Infinity;
        
        this.platforms.forEach(platform => {
            if (platform.y > maxY) {
                maxY = platform.y;
                lowestPlatforms.length = 0;
                lowestPlatforms.push(platform);
            } else if (platform.y === maxY) {
                lowestPlatforms.push(platform);
            }
        });
        
        // Choose random platform from lowest level
        if (lowestPlatforms.length > 0) {
            const startPlatform = lowestPlatforms[Math.floor(Math.random() * lowestPlatforms.length)];
            
            // Create unicorn centered on the platform
            const unicornSize = this.platformSize * 0.6; // Smaller relative size
            const unicornX = startPlatform.x + (startPlatform.size - unicornSize) / 2;
            const unicornY = startPlatform.y - unicornSize; // Place unicorn ON top of the platform
            
            this.unicorn = new Unicorn(unicornX, unicornY, unicornSize);
            startPlatform.isOccupied = true;
        }
    }

    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('lives').textContent = this.lives;
        document.getElementById('level').textContent = this.level;
    }

    handleInput() {
        const pressedKeys = this.inputHandler.getPressedKeys();
        
        if (pressedKeys.length > 0 && this.unicorn && !this.unicorn.isJumping) {
            const targetKey = pressedKeys[0]; // Use the first pressed key
            
            // Find current platform (where unicorn is located)
            const currentPlatform = this.platforms.find(platform => platform.isOccupied);
            
            if (currentPlatform) {
                // Find neighbor platforms
                const neighborPlatforms = this.findNeighborPlatforms(currentPlatform);
                
                // Find target platform among neighbors only
                const targetPlatform = neighborPlatforms.find(platform => 
                    platform.letter === targetKey && !platform.isOccupied
                );
                
                if (targetPlatform) {
                    // Clear the pressed key to prevent multiple jumps
                    this.inputHandler.clearPressedKeys();
                    
                    // Make the unicorn jump to the target platform
                    this.unicorn.jumpToPlatform(targetPlatform, this.jumpDuration, this.jumpHeight);
                    
                    // Record jump start time for animation
                    this.jumpStartTime = performance.now();
                    
                    // Update platform occupancy
                    this.platforms.forEach(platform => {
                        platform.isOccupied = false;
                    });
                    targetPlatform.isOccupied = true;
                    
                    // Store target platform for sagging when jump completes
                    this.targetPlatformForSag = targetPlatform;
                    
                    // Make the platform we jumped from disappear
                    if (currentPlatform) {
                        currentPlatform.isDisappearing = true;
                        currentPlatform.disappearStartTime = performance.now();
                    }
                    
                    // Increase score
                    this.score += 10;
                    this.updateUI();
                }
            }
        }
    }

    spawnNewRow() {
        const step = this.platformSize + this.platformSpacing;
        const cols = Math.floor(this.canvas.width / step);
        // nextRowParity tells us which col parity gets a platform in this row
        for (let col = 0; col < cols; col++) {
            if ((col % 2) === this.nextRowParity) {
                const x = col * step;
                const platform = new Platform(x, this.nextRowY, this.platformSize, this.drawLetter());
                this.platforms.push(platform);
            }
        }
        // Advance for next row
        this.nextRowY -= step;
        this.nextRowParity = 1 - this.nextRowParity;
    }

    update(deltaTime) {
        if (this.paused || this.gameOver) return;
        
        const dt = Math.min(deltaTime, 100); // cap to avoid huge jumps after tab switch
        const dy = (this.scrollSpeed * dt) / 1000; // pixels to move this frame
        
        // --- Update disappearing platforms ---
        const disappearDuration = 500; // ms for disappear animation
        this.platforms.forEach(platform => {
            if (platform.isDisappearing) {
                const elapsed = performance.now() - platform.disappearStartTime;
                if (elapsed >= disappearDuration) {
                    platform.isDisappeared = true;
                } else {
                    platform.disappearProgress = elapsed / disappearDuration;
                }
            }
        });
        
        // --- Remove disappeared platforms ---
        this.platforms = this.platforms.filter(p => !p.isDisappeared);
        
        // --- Scroll all platforms down ---
        this.platforms.forEach(p => { p.y += dy; });
        
        // --- Scroll the spawn cursor with the platforms ---
        this.nextRowY += dy;
        
        // --- Unicorn floats with current platform when standing ---
        if (this.unicorn && !this.unicorn.isJumping) {
            this.unicorn.y += dy;
        }
        
        // --- Spawn new rows when the spawn cursor has scrolled close enough to the top ---
        // nextRowY is where the NEXT row will be placed. When it scrolls to within
        // one step of y=0, spawn it and push the cursor one step further up.
        const step = this.platformSize + this.platformSpacing;
        while (this.nextRowY + step >= 0) {
            this.spawnNewRow();
        }
        
        // --- Remove platforms that have scrolled below the canvas ---
        const removedPlatforms = this.platforms.filter(p => p.y > this.canvas.height);
        this.platforms = this.platforms.filter(p => p.y <= this.canvas.height);
        
        // --- Handle occupied platform disappearing ---
        const occupiedWasRemoved = removedPlatforms.some(p => p.isOccupied);
        if (occupiedWasRemoved && this.unicorn) {
            this.lives--;
            this.updateUI();
            
            if (this.lives <= 0) {
                this.gameOver = true;
                return;
            }
            
            // Teleport unicorn to the platform with the lowest y (highest on screen = closest to top)
            // among visible platforms — i.e., one "row above" where the unicorn was
            const visiblePlatforms = this.platforms.filter(p => p.y >= 0 && p.y < this.canvas.height);
            if (visiblePlatforms.length > 0) {
                // Find the platform with the smallest y (topmost visible)
                const topPlatform = visiblePlatforms.reduce((best, p) => p.y < best.y ? p : best);
                this.platforms.forEach(p => { p.isOccupied = false; });
                topPlatform.isOccupied = true;
                this.unicorn.x = topPlatform.x + (topPlatform.size - this.unicorn.size) / 2;
                this.unicorn.y = topPlatform.y - this.unicorn.size;
                this.unicorn.isJumping = false;
                this.saggingPlatform = null;
                this.targetPlatformForSag = null;
            }
        }
        
        // --- Update platform sagging animation ---
        this.updatePlatformSagging();
        
        // Check if jump just completed to trigger sagging
        if (this.unicorn && !this.unicorn.isJumping && this.targetPlatformForSag && !this.saggingPlatform) {
            this.saggingPlatform = this.targetPlatformForSag;
            this.sagStartTime = performance.now();
            this.sagDirection = 1;
            this.targetPlatformForSag = null;
        }
        
        // Make unicorn sag with the platform
        if (this.unicorn && this.saggingPlatform && !this.unicorn.isJumping) {
            const currentPlatform = this.platforms.find(platform => platform.isOccupied);
            if (currentPlatform === this.saggingPlatform) {
                this.unicorn.y = currentPlatform.y - this.unicorn.size + this.saggingPlatform.sagAmount;
            }
        }
        
        // Reset jumpable status for all platforms
        this.platforms.forEach(platform => {
            platform.isJumpable = false;
        });
        
        // Mark neighbor platforms as jumpable
        if (this.unicorn && !this.unicorn.isJumping && !this.saggingPlatform) {
            const currentPlatform = this.platforms.find(platform => platform.isOccupied);
            if (currentPlatform) {
                const neighbors = this.findNeighborPlatforms(currentPlatform);
                neighbors.forEach(neighbor => {
                    if (!neighbor.isOccupied && !neighbor.isDisappearing && !neighbor.isDisappeared) {
                        neighbor.isJumpable = true;
                    }
                });
            }
        }
        
        // Update unicorn jump animation
        if (this.unicorn && this.unicorn.isJumping) {
            this.unicorn.update();
        }
        
        // Handle input
        this.handleInput();
    }

    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw platforms
        this.platforms.forEach(platform => {
            platform.draw(this.ctx);
        });
        
        // Draw unicorn
        if (this.unicorn) {
            this.unicorn.draw(this.ctx);
        }
        
        // Draw game over message if needed
        if (this.gameOver) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.ctx.fillStyle = '#FF69B4';
            this.ctx.font = '48px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText('Game Over!', this.canvas.width / 2, this.canvas.height / 2);
            
            this.ctx.fillStyle = 'white';
            this.ctx.font = '24px Arial';
            this.ctx.fillText('Refresh to play again', this.canvas.width / 2, this.canvas.height / 2 + 50);
        }
    }

    gameLoop(timestamp) {
        // Calculate delta time
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        
        // Update game state
        this.update(deltaTime);
        
        // Render game
        this.render();
        
        // Continue game loop
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}

// Start the game when the page loads
window.addEventListener('load', () => {
    new Game();
});