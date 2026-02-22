Project spec

# Definition of file
What do you want to build and how do you want to build it.

# Part 1: Product requirements
Product purpose, functionality and "jobs to be done".

## Answers:
Who is the product for?
Children learning letters

What problems does it solve?
Makes letter learning fun and interactive through gameplay

What does the product do?
TypeJumper is a platformer game where players control a unicorn avatar that jumps between platforms labeled with letters. Players press keys corresponding to letters on platforms to make the avatar jump. The game teaches letter recognition and typing skills through engaging gameplay.

## Core Features:
- Pixel art platformer game with unicorn avatar
- Platforms labeled with letters that disappear when jumped off
- Moving platforms that shift downward, creating upward scrolling effect
- Letter-based jumping mechanics (press letter key to jump to that platform)
- Lives system (5 lives default)
- Points and bonuses (sweets, presents, coins)
- Enemies that reduce lives when landed on
- Power-ups (armor, wings) for temporary advantages
- Multiple levels with increasing difficulty
- Language selector for letter pronunciation

## Milestones:
- **MVP**: Basic placeholder assets, solid platforms, letter mechanics, no sound/background
- **v1**: Moving platforms, difficulty settings, visual feedback for jumpable platforms, points system
- **v2**: Sound effects
- **v3**: Enemies (witch)
- **v4**: Power-ups
- **v5**: Proper animations and assets
- **Later**: Changing backgrounds, more bonuses/enemies

# Part 2: Technical design (Engineering design)
Technical requirements for how you are building the project.

## Covers:
Tech stack
Engineering requirements
Architecture
System design

## Technical Requirements:
- Game engine: Pure HTML5 Canvas with javascript.
- Input handling: Keyboard letter detection
- Physics: No physics, no collisions, the unicor avatar can only by on a platform, or in transition between platforms.
- State management: Game state, level progression, scoring
- Asset management: Sprites, sounds, animations
- Localization: Language support for letter pronunciation

## Architecture:
- Game loop: Update → Render cycle
- Entity-component system: Platforms, avatar, enemies, bonuses
- Level system: Progressive difficulty and visual themes
- Input system: Keyboard event handling
- Audio system: Sound effects and pronunciation
- UI system: Score display, lives counter, language selector
