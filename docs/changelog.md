# TypeJumper Changelog

## [Unreleased]

## [0.3.1] - 2024-02-22
### Fixed
- **Jump Animation**: Completely rewrote jumping system for smooth, beautiful motion
- **Teleportation Bug**: Unicorn no longer instantly teleports above platform
- **Platform Sag Timing**: Sagging now only occurs when unicorn lands, not immediately
- **Animation Quality**: Jump now has proper physics with acceleration/deceleration

### Animation Improvements
- **Proper Arc Trajectory**: Uses cubic easing for realistic acceleration upward and deceleration downward
- **Smooth X-Axis Movement**: Unicorn moves horizontally while jumping, not just vertically
- **Correct Starting Point**: Animation begins from current platform position
- **Perfect Landing Timing**: Platform sagging triggers exactly when jump completes
- **Visual Polish**: Professional-quality motion that feels satisfying

### Technical Fixes
- **Jump Physics**: Replaced linear motion with cubic ease-in/out for natural movement
- **Position Tracking**: Added `jumpStartX` to track horizontal starting position
- **Timing System**: Platform sagging now triggered by jump completion event
- **Animation Flow**: Sequential animation pipeline (jump → land → sag → bounce back)

### Files Modified
- `game.js`: Fixed animation sequencing and sagging timing
- `entities.js`: Rewrote jump animation with proper physics and motion

### Before vs After
**Before**: Instant teleport + awkward up/down motion + premature sagging
**After**: Smooth arc from start platform → peak → target platform + perfect landing sag

## [0.3.0] - 2024-02-22
### Added
- **Arc-Based Jumping Animation**: Beautiful parabolic jump trajectory with smooth upward/downward motion
- **Platform Sagging Effect**: Landing platforms sag downward and bounce back for realistic physics feel
- **Tunable Animation Parameters**: All animation durations and effects are configurable

### Animation Features
- **Jump Arc**: Unicorn follows perfect parabolic trajectory (starts on platform → peaks → lands on target)
- **Jump Duration**: 200ms default, fully tunable via `jumpDuration` parameter
- **Jump Height**: 80px default peak height, configurable via `jumpHeight` parameter
- **Platform Sag**: 5px sag amount with 150ms bounce-back animation
- **Smooth Transitions**: Frame-based animation with proper easing

### Technical Implementation
- **Parabolic Motion**: Mathematical arc calculation using quadratic easing
- **Platform Physics**: Sagging animation with down/up bounce cycle
- **Performance-Based Timing**: Uses `performance.now()` for accurate animation timing
- **Configurable System**: All animation parameters exposed for easy tuning

### Files Modified
- `game.js`: Added animation parameters, sagging system, and timing controls
- `entities.js`: Enhanced Unicorn with arc-based jumping, Platform with sagging support

### Animation Parameters (Tunable)
```javascript
this.jumpDuration = 200;       // ms - total jump time
this.jumpHeight = 80;         // px - maximum jump height
this.platformSagAmount = 5;    // px - sag depth
this.platformSagDuration = 150; // ms - sag animation duration
```

## [0.2.2] - 2024-02-22
### Fixed
- **Neighbor Distance**: Fixed unicorn jumping to platforms two levels away instead of nearest neighbors
- **Correct Checkerboard Offsets**: Implemented proper offset calculation for checkerboard pattern

### Technical Fix
- **Precise Offset Calculation**: 
  - Diagonals: ±1 in both directions (maintains even row+col sum)
  - Horizontals: ±2 in x direction, 0 in y (maintains even row+col sum)
- **Nearest Neighbor Detection**: Now correctly finds immediately adjacent platforms
- **Visual Confirmation**: Jumpable platforms are highlighted and are the closest possible targets

### Changed
- `findNeighborPlatforms()`: Uses mixed offsets {dx: ±1/±2, dy: ±1/0} for correct checkerboard navigation
- Neighbor test updated to reflect accurate neighbor distances

## [0.2.1] - 2024-02-22
### Fixed
- **Neighbor Detection**: Fixed checkerboard pattern neighbor calculation
- **Left/Right Jumping**: Unicorn can now jump to left and right neighbors (previously only diagonals worked)
- **All 6 Directions**: Upper left/right, left/right, and lower left/right all functional

### Technical Fix
- **Checkerboard Offset Correction**: Changed neighbor offsets from ±1 to ±2 to skip empty spaces
- **Grid Navigation**: Properly accounts for missing platforms in checkerboard pattern
- **Neighbor Test Update**: Test suite now reflects correct checkerboard neighbor distances

### Changed
- `findNeighborPlatforms()`: Uses {dx: ±2, dy: ±2} offsets instead of {dx: ±1, dy: ±1}
- Neighbor detection now correctly finds platforms through empty checkerboard spaces

## [0.2.0] - 2024-02-22
### Added
- **Neighbor-Based Jumping**: Unicorn can only jump to adjacent platforms (6 directions)
- **Visual Jumpable Indicators**: Neighbor platforms highlighted with darker colors and gold borders
- **Improved Platform Sizing**: Platforms 50% larger (90px) with 20% more spacing (24px)
- **Better Unicorn Positioning**: Unicorn now sits ON platforms instead of inside them

### Changed
- **Jumping Mechanics**: Now restricted to immediate neighbors only (upper left/right, left/right, lower left/right)
- **Platform Layout**: Fewer platforms due to increased size and spacing
- **Unicorn Graphics**: Smaller relative size (60% of platform) for better proportions
- **Jump Animation**: Smoother landing on target platforms

### Technical Implementation
- **Grid System**: Added `createPlatformGrid()` method for neighbor detection
- **Neighbor Finding**: `findNeighborPlatforms()` uses 6-directional offsets
- **Visual Highlighting**: Platform class extended with `isJumpable` property and `getDarkerColor()` method
- **Real-time Updates**: Neighbor highlighting updates every frame in game loop

### Files Modified
- `game.js`: Added grid system, neighbor detection, and jumpable highlighting
- `entities.js`: Enhanced Platform class with jumpable visual states
- `input.js`: Fixed case sensitivity for reliable key detection

### Files Added
- `neighbor-test.html`: Interactive test suite for neighbor jumping system
- `debug-test.html`: Debug tool for input handling verification

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