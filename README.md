# Memory Match Game

The game is designed to test the player's memory by matching pairs of cards.

It includes a user interface with two sections (section1 and section2) and various elements like input fields, buttons, and a game container.

The game allows the player to input their name, choose difficulty (easy, medium, hard), and select a theme (animal, flower, fruit) before starting the game.

## Key Features

### User Input Section:

Player Name Input: The player can enter their name.

Difficulty Selection: The player can choose the game difficulty (easy, medium, hard).

Theme Selection: The player can select a theme for the game (animal, flower, fruit).

Start Button: Initiates the game based on the chosen settings.

### Game Section:

Welcome Message: Displays a welcome message with the player's name.

Hint Button: Provides a hint by briefly revealing all cards.

Game Container: Dynamically generated grid to display the cards.

Restart Button: Allows the player to restart the game.

Back Button: Takes the player back to the initial input section.

### Game Logic:

Card Matching: Cards are generated dynamically based on the chosen theme and difficulty.

Card Click Event: Handles the click event on the cards.

Card Matching Logic: Checks for matches and updates the game state accordingly.

Restart Functionality: Allows the player to restart the game at any point.

### Styling:

Responsive Design: Uses media queries for responsiveness, adjusting the layout for smaller screens.

CSS Transitions: Provides smooth transitions for button hover effects.
Background Gradient: Adds a visually appealing background gradient.

### Audio Feedback:

Clap Sound: Plays a clap sound when the player successfully matches all cards.

### Fireworks Animation:

Canvas: Utilizes an HTML canvas for a fireworks animation when the game is successfully completed.
