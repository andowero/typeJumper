# TypeJumper Changelog

## [Unreleased]

## [0.1.0] - 2024-02-22
### Added
- **MVP Implementation**: Basic platformer game with core mechanics
- **Checkerboard Platforms**: Static platforms arranged in checkerboard pattern filling the canvas
- **Letter System**: Each platform has a unique uppercase letter (A-Z)
- **Unicorn Avatar**: Player character that starts on random platform at lowest level
- **Jumping Mechanics**: Press letter keys to jump to corresponding platforms
- **Scoring System**: Earn 10 points for each successful jump
- **UI Elements**: Score, lives, and level displays
- **Input Handling**: Keyboard detection for letter keys (A-Z)

### Technical Implementation
- **Pure HTML5 Canvas**: No external dependencies
- **Entity System**: Platform and Unicorn classes with drawing and update logic
- **Game Loop**: RequestAnimationFrame-based update-render cycle
- **Checkerboard Algorithm**: (row + col) % 2 === 0 pattern generation
- **Letter Uniqueness**: Algorithm to ensure each letter appears only once
- **Random Starting Position**: Unicorn starts on random platform at bottom level

### Files Created
- `index.html`: Main game HTML structure
- `style.css`: Basic game styling
- `game.js`: Core game logic and game loop
- `entities.js`: Platform and Unicorn entity classes
- `input.js`: Keyboard input handling system
- `test.html`: Test suite for MVP functionality

### Known Limitations
- No moving platforms (static MVP)
- No sound effects
- No enemies or power-ups
- Basic placeholder graphics
- No game over conditions beyond refresh

## [0.0.1] - 2024-02-19
### Added
- Initial project setup
- Documentation structure
- Project specification
- Architecture design
- Basic repository files