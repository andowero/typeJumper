// Entity System for TypeJumper

class Platform {
    constructor(x, y, size, letter) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.letter = letter;
        this.color = this.getRandomColor();
        this.isOccupied = false;
        this.isJumpable = false; // For neighbor highlighting
    }

    getRandomColor() {
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFBE0B',
            '#FB5607', '#8338EC', '#3A86FF', '#FF006E',
            '#A5DD9B', '#F9C74F', '#90BE6D', '#43AA8B'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    draw(ctx) {
        // Draw platform with darker color if jumpable
        ctx.fillStyle = this.isJumpable ? this.getDarkerColor() : this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        
        // Draw border (thicker for jumpable platforms)
        ctx.strokeStyle = this.isJumpable ? '#FFD700' : '#000';
        ctx.lineWidth = this.isJumpable ? 3 : 2;
        ctx.strokeRect(this.x, this.y, this.size, this.size);
        
        // Draw letter (white for jumpable platforms for better contrast)
        ctx.fillStyle = this.isJumpable ? '#FFF' : '#000';
        ctx.font = `${this.size * 0.7}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.letter, this.x + this.size/2, this.y + this.size/2);
    }

    getDarkerColor() {
        // Convert hex color to RGB, darken it, then back to hex
        const hex = this.color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        // Darken by 30% and add some blue tint for jumpable platforms
        const darkerR = Math.max(0, Math.floor(r * 0.7));
        const darkerG = Math.max(0, Math.floor(g * 0.7));
        const darkerB = Math.max(0, Math.floor(b * 0.8 + 50)); // Add blue tint
        
        return `#${darkerR.toString(16).padStart(2, '0')}${darkerG.toString(16).padStart(2, '0')}${darkerB.toString(16).padStart(2, '0')}`;
    }

    containsPoint(x, y) {
        return x >= this.x && x <= this.x + this.size && 
               y >= this.y && y <= this.y + this.size;
    }
}

class Unicorn {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = '#FF69B4'; // Hot pink for unicorn
        this.isJumping = false;
        this.jumpProgress = 0;
        this.targetPlatform = null;
        this.jumpDuration = 30; // frames
    }

    draw(ctx) {
        // Draw unicorn body (simple triangle for now)
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.size);
        ctx.lineTo(this.x + this.size/2, this.y);
        ctx.lineTo(this.x + this.size, this.y + this.size);
        ctx.closePath();
        ctx.fill();
        
        // Draw unicorn horn
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.moveTo(this.x + this.size/2, this.y);
        ctx.lineTo(this.x + this.size/2 - 5, this.y - 15);
        ctx.lineTo(this.x + this.size/2 + 5, this.y - 15);
        ctx.closePath();
        ctx.fill();
        
        // Draw eye
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(this.x + this.size * 0.7, this.y + this.size * 0.3, 3, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        if (this.isJumping && this.targetPlatform) {
            this.jumpProgress++;
            const progress = this.jumpProgress / this.jumpDuration;
            
            // Calculate position using ease-in-out for smoother movement
            const easeProgress = progress < 0.5 
                ? 2 * progress * progress 
                : -1 + (4 - 2 * progress) * progress;
            
            this.x = this.targetPlatform.x + (this.targetPlatform.size - this.size) / 2;
            this.y = this.targetPlatform.y - this.size * easeProgress;
            
            if (this.jumpProgress >= this.jumpDuration) {
                this.isJumping = false;
                this.jumpProgress = 0;
                this.y = this.targetPlatform.y - this.size;
            }
        }
    }

    jumpToPlatform(platform) {
        this.isJumping = true;
        this.targetPlatform = platform;
        this.jumpProgress = 0;
    }
}