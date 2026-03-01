# TypeJumper Architecture

## Overview
TypeJumper is a browser-based platformer game built with pure HTML5 Canvas and JavaScript, with no external dependencies. The architecture follows a simple game loop pattern with modular components.

## Core Architecture

### Game Loop
```
Request Animation Frame → Update Game State → Render Frame → Repeat
```

### Platform Lifecycle
```
Normal → Jumpable (highlighted) → Occupied → Disappearing (fade-out) → Removed
```

### Main Components

1. **Game Engine**
   - Pure HTML5 Canvas rendering
   - No external libraries or frameworks
   - Cross-browser compatible

2. **Input System**
   - Keyboard event listeners for letter keys
   - Simple key state tracking
   - No complex input handling

3. **Game State**
   - Current level and difficulty
   - Player lives (default: 5)
   - Score and collected bonuses
   - Active power-ups and timers

4. **Entity System**
   - **Platforms**: Letter-labeled surfaces with positions, states, and lifecycle (normal/jumpable/occupied/disappearing)
   - **Avatar**: Unicorn character with position and state
   - **Bonuses**: Collectible items (sweets, presents, coins)
   - **Enemies**: Hazardous entities (witch, rat, ghost, skeleton)
   - **Power-ups**: Temporary advantages (armor, wings)

5. **Level System**
   - Increasing speed of platform movement
   - Platforms are allways in checquered arrangement
   - Background and style themes
   - Final level with special ending

6. **Physics (Simplified)**
   - No complex collision detection
   - Avatar is either on a platform or in transition
   - Platforms move downward at constant speed
   - No gravity or momentum calculations
   - Platform disappearing: 500ms fade-out animation using alpha transparency

7. **Rendering**
   - Canvas-based drawing
   - Sprite-based entities
   - Visual feedback for jumpable platforms
   - Simple animations (hovering, landing impact)

8. **Audio**
   - Sound effects for jumps, landings, bonuses
   - Letter pronunciation (recordings of each letter)
   - Background music (optional)

9. **UI**
   - Score display
   - Lives counter
   - Language selector
   - Game over screen

## Data Flow

```
Keyboard Input → Game State Update → Entity Positioning → Canvas Rendering
```

## Technical Constraints

- No external dependencies
- Pure HTML5 Canvas and JavaScript
- Simple physics (no collision detection)
- Cross-browser compatibility
- Responsive design for different screen sizes

## File Structure

```
index.html          # Main HTML file
style.css           # Basic styling
game.js             # Main game logic
entities.js         # Entity definitions
levels.js           # Level data
input.js            # Input handling
audio.js            # Audio management
ui.js               # UI rendering
assets/             # Audio, sprite and background assets
```

## Development Approach

1. Start with MVP (basic mechanics without visuals)
2. Add visual elements progressively
3. Implement features in milestone order
4. Test on multiple browsers
5. Optimize for performance and accessibility
