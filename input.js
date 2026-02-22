// Input System for TypeJumper

class InputHandler {
    constructor() {
        this.keysPressed = new Set();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            // Only handle letter keys (A-Z)
            if (e.key.length === 1 && e.key >= 'A' && e.key <= 'Z') {
                this.keysPressed.add(e.key);
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.key.length === 1 && e.key >= 'A' && e.key <= 'Z') {
                this.keysPressed.delete(e.key);
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