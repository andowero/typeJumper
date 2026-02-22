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
        
        // Game entities
        this.platforms = [];
        this.unicorn = null;
        this.platformSize = 90; // 50% bigger (60 * 1.5)
        this.platformSpacing = 24; // 20% farther apart (20 * 1.2)
        
        // Initialize game
        this.init();
        
        // Start game loop
        this.lastTime = 0;
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    init() {
        // Clear any existing platforms
        this.platforms = [];
        
        // Create checkerboard pattern of platforms
        this.createCheckerboardPlatforms();
        
        // Create unicorn at random starting position
        this.createUnicorn();
        
        // Update UI
        this.updateUI();
    }

    createCheckerboardPlatforms() {
        const cols = Math.floor(this.canvas.width / (this.platformSize + this.platformSpacing));
        const rows = Math.floor(this.canvas.height / (this.platformSize + this.platformSpacing));
        
        // Generate all letters A-Z
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        
        // Shuffle letters to ensure random distribution
        for (let i = letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [letters[j], letters[i]];
        }
        
        let letterIndex = 0;
        
        // Create checkerboard pattern
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                // Only create platforms in checkerboard pattern
                if ((row + col) % 2 === 0) {
                    const x = col * (this.platformSize + this.platformSpacing);
                    const y = row * (this.platformSize + this.platformSpacing);
                    
                    // Use letter from shuffled array, wrapping around if needed
                    const letter = letters[letterIndex % letters.length];
                    letterIndex++;
                    
                    const platform = new Platform(x, y, this.platformSize, letter);
                    this.platforms.push(platform);
                }
            }
        }
        
        // Ensure each letter is unique by checking for duplicates
        this.ensureUniqueLetters();
    }

    ensureUniqueLetters() {
        const letterCount = {};
        const duplicates = [];
        
        // Count letter occurrences
        this.platforms.forEach(platform => {
            letterCount[platform.letter] = (letterCount[platform.letter] || 0) + 1;
            if (letterCount[platform.letter] > 1) {
                duplicates.push(platform);
            }
        });
        
        // If there are duplicates, fix them
        if (duplicates.length > 0) {
            const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
            const usedLetters = new Set(this.platforms.map(p => p.letter));
            const availableLetters = allLetters.filter(letter => !usedLetters.has(letter));
            
            // Fix duplicates by assigning available letters
            duplicates.forEach(platform => {
                if (availableLetters.length > 0) {
                    const newLetter = availableLetters.pop();
                    platform.letter = newLetter;
                    usedLetters.add(newLetter);
                }
            });
        }
    }

    findNeighborPlatforms(currentPlatform) {
        const neighbors = [];
        
        // In checkerboard pattern, neighbors are at different offsets depending on position
        // For platforms at (row,col) where (row+col) is even:
        // - Diagonals: ±1 in both directions (maintains even sum)
        // - Horizontals: ±2 in x direction, 0 in y (maintains even sum)
        const neighborOffsets = [
            {dx: -1, dy: -1}, // upper left
            {dx: 1, dy: -1},  // upper right
            {dx: -2, dy: 0},  // left
            {dx: 2, dy: 0},   // right
            {dx: -1, dy: 1},  // lower left
            {dx: 1, dy: 1}    // lower right
        ];
        
        const platformGrid = this.createPlatformGrid();
        
        // Find current platform position in grid
        for (let row = 0; row < platformGrid.length; row++) {
            for (let col = 0; col < platformGrid[row].length; col++) {
                if (platformGrid[row][col] === currentPlatform) {
                    // Check all neighbor positions
                    neighborOffsets.forEach(offset => {
                        const neighborRow = row + offset.dy;
                        const neighborCol = col + offset.dx;
                        
                        if (neighborRow >= 0 && neighborRow < platformGrid.length &&
                            neighborCol >= 0 && neighborCol < platformGrid[neighborRow].length) {
                            const neighbor = platformGrid[neighborRow][neighborCol];
                            if (neighbor) {
                                neighbors.push(neighbor);
                            }
                        }
                    });
                    return neighbors;
                }
            }
        }
        
        return neighbors;
    }

    createPlatformGrid() {
        const cols = Math.floor(this.canvas.width / (this.platformSize + this.platformSpacing));
        const rows = Math.floor(this.canvas.height / (this.platformSize + this.platformSpacing));
        
        const grid = Array(rows).fill().map(() => Array(cols).fill(null));
        
        this.platforms.forEach(platform => {
            const col = Math.round(platform.x / (this.platformSize + this.platformSpacing));
            const row = Math.round(platform.y / (this.platformSize + this.platformSpacing));
            if (row >= 0 && row < rows && col >= 0 && col < cols) {
                grid[row][col] = platform;
            }
        });
        
        return grid;
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
                    this.unicorn.jumpToPlatform(targetPlatform);
                    
                    // Update platform occupancy
                    this.platforms.forEach(platform => {
                        platform.isOccupied = false;
                    });
                    targetPlatform.isOccupied = true;
                    
                    // Increase score
                    this.score += 10;
                    this.updateUI();
                }
            }
        }
    }

    update() {
        if (this.paused || this.gameOver) return;
        
        // Reset jumpable status for all platforms
        this.platforms.forEach(platform => {
            platform.isJumpable = false;
        });
        
        // Mark neighbor platforms as jumpable
        if (this.unicorn && !this.unicorn.isJumping) {
            const currentPlatform = this.platforms.find(platform => platform.isOccupied);
            if (currentPlatform) {
                const neighbors = this.findNeighborPlatforms(currentPlatform);
                neighbors.forEach(neighbor => {
                    if (!neighbor.isOccupied) {
                        neighbor.isJumpable = true;
                    }
                });
            }
        }
        
        // Update unicorn position
        if (this.unicorn) {
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
        this.update();
        
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