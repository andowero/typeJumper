AGENTS.md

# Project goals
Create a fun, educational platformer game for children to learn letters through interactive gameplay.

# Project overview
TypeJumper is a browser-based platformer game where players control a unicorn avatar jumping between letter-labeled platforms. The game teaches letter recognition and typing skills.

# Design style guide
- Simple, child-friendly pixel art style
- Bright, cheerful colors
- Clear visual feedback for gameplay elements
- Intuitive controls suitable for young children

# Product & UX guidelines
- Target audience: Children aged 4-8 learning letters
- Educational focus: Letter recognition and basic typing
- Gameplay: Simple controls, progressive difficulty
- Accessibility: Clear visuals, optional audio cues

# Constraints and policies
- **MVP Focus**: Basic placeholder assets, solid platforms, core letter mechanics
- **v1 Focus**: Moving platforms, difficulty settings, visual feedback, points system
- No external dependencies (pure HTML5 Canvas + JavaScript)
- Cross-browser compatibility
- Simple physics (no complex collision detection)

# Repository etiquette
- Follow milestone-based development (MVP → v1 → v2 → ...)
- Keep commits focused and descriptive
- Update documentation after major changes

# Often used commands
```bash
# Run game in a browser
firefox index.html
chromium index.html

# Run basic HTML validation
tidy -q -e index.html

# Format JavaScript
npx prettier --write game.js

# Check JavaScript code
node -c game.js
```

# Testing instructions
1. Open index.html in multiple browsers (Chrome, Firefox)
2. Test core mechanics: letter jumping, platform movement
3. Verify visual feedback for jumpable platforms
4. Check responsive design on different screen sizes
5. Test game state persistence (lives, score)

# Documentation
- [Project spec](project_spec.md) - Full requirements and milestones
- [Architecture](docs/architecture.md) - Technical design and components
- [Changelog](docs/changelog.md) - Version history
- [Project status](docs/project_status.md) - Current progress
- Update docs after completing milestones
