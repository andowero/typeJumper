// Input System for TypeJumper

class InputHandler {
    constructor() {
        this.keysPressed = new Set();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            // Handle letter keys (convert to uppercase)
            if (e.key.length === 1 && /^[a-z]$/i.test(e.key)) {
                this.keysPressed.add(e.key.toUpperCase());
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.key.length === 1 && /^[a-z]$/i.test(e.key)) {
                this.keysPressed.delete(e.key.toUpperCase());
            }
        });
    }

    isKeyPressed(key) {
        return this.keysPressed.has(key);
    }

    getPressedKeys() {
        return Array.from(this.keysPressed);
    }

    clearPressedKeys() {
        this.keysPressed.clear();
    }
}