TypeJumper

# Brainstorming

Platformer.

Pixel art game.

Each platform has a letter written on it. The avatar jumps on a platform
with the letter the player presses.

The avatar is a little cute unicorn.

The platforms are arranged in a level style pattern. Each level is of
evenly distributed platforms. Each level is shifted for a half of
platform distance so that the avatar can jump on the next level.

Avatar can jump on any nearest platform:

-   On the same level
-   One level below
-   One level above

When avatar jump off a platform, that platform disappears.

Platforms are slowly (depending on the difficulty) shifting down, the
bottom most level disappears after it hits the bottom of the canvas.
Each time the bottom level disappears, new level appears at the top.

The background is shifting at the same pace as the platforms to create
an illusion the whole game moves upward.

When avatar stays on the lowest level when it disappears, it loses a
life and is transported onto a platform two levels above.

When avatar tries to jump on a platform that is too far away (player
presses a letter of a far away platform) the avatar loses a life.

When avatar loses all lives (default 5), the game is over.

When avatar jumps on the topmost level, the shifting speeds up and new
level appears so that the player doesn't have to wait.

On some platforms there will be bonuses to collect. When bonus is
collected, player is awarded some points.

The bonuses:

-   Sweets
-   Present
-   Coin

On some platforms there will be enemies. When avatar jumps on a platform
with an enemy, he loses a life.

Enemies:

-   Green witch -- will laugh hideously
-   Black rat -- will squeak loudly
-   Ghost -- will laugh terrifyingly
-   Skeleton -- will rattle and hiss

On some platforms there will be power-ups:

-   Armor -- for a limited time enemies won't hurt the avatar
-   Wings -- for a limited time the avatar can jump on any platform on
    the map

There will be a limited number of levels. On the final level there will
be some home of unicorns, probably on the moon.

After a certain number of levels, the background and the style of the
platforms changes.

The platforms will slightly hover (circle around a fixed point in
space). There will be an impact when the avatar lands on a platform
(sound of hoofs on the ground) and the platform will sag a little and
stop hovering.

The platforms the avatar can jump onto will have a lighter shade and the
platforms it can't jump onto will have a darker shade. The distinction
must be apparent, but not intrusive.

The avatar should say out loud the letter it landed on. Have a language
selector for different languages.

# Questions

## Q1: What are you really trying to do? What are the goals for my project?

Fun game for my daughter that will teach her letters.

## Q2: What are the milestones of functionality?

+--------------+------------------------------------------------------+
| MVP          | -   Basic placeholder assets                         |
|              | -   No sound                                         |
|              | -   Solid platforms (no floating)                    |
|              | -   Letters on platforms                             |
|              | -   No background                                    |
|              | -   Platforms disappear after avatar jumps off them  |
+--------------+------------------------------------------------------+
| v1           | -   Platforms available for jumping are lighter and  |
|              |     unavailable platforms are darker                 |
|              | -   Moving platforms                                 |
|              | -   Difficulty settings                              |
|              | -   Moving background and borders                    |
|              | -   Points                                           |
|              | -   Coins                                            |
|              | -   Lives                                            |
+--------------+------------------------------------------------------+
| v2           | -   Sounds                                           |
+--------------+------------------------------------------------------+
| v3           | -   Enemies                                          |
|              |                                                      |
|              |     -   Witch only                                   |
+--------------+------------------------------------------------------+
| v4           | -   Power-ups                                        |
+--------------+------------------------------------------------------+
| v5           | -   Animations and proper assets                     |
+--------------+------------------------------------------------------+
| Later        | -   Changing background and platform style           |
|              | -   More bonuses                                     |
|              | -   More enemies                                     |
+--------------+------------------------------------------------------+
| Not in scope |                                                      |
+--------------+------------------------------------------------------+
