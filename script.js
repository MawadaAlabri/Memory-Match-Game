document.addEventListener("DOMContentLoaded", () => {
  let playerName;
  let difficulty;
  let theme;
  let numberOfMatches;
  let flippedCards = [];
  let matchedCards = [];

  const section1 = document.getElementById("section1");
  const section2 = document.getElementById("section2");
  const playerNameInput = document.getElementById("playerName");
  const difficultySelect = document.getElementById("difficulty");
  const themeSelect = document.getElementById("theme");
  const startButton = document.getElementById("startButton");
  const welcomeMessage = document.getElementById("welcomeMessage");
  const hintButton = document.getElementById("hintButton");
  const gameContainer = document.getElementById("game-container");
  const restartButton = document.getElementById("restart-button");
  const backButton = document.getElementById("backButton");

  startButton.addEventListener("click", startGame);
  hintButton.addEventListener("click", showHint);
  restartButton.addEventListener("click", restartGame);
  backButton.addEventListener("click", goToSection1);

  function startGame() {
    playerName = playerNameInput.value;
    difficulty = difficultySelect.value;
    theme = themeSelect.value;

    setNumberOfMatches();
    createCards();

    section1.style.display = "none";
    section2.style.display = "block"; // Show section2

    welcomeMessage.textContent = `Hello, ${playerName}!`;
  }

  function setNumberOfMatches() {
    // Set the number of matches based on difficulty
    switch (difficulty) {
      case "easy":
        numberOfMatches = 2;
        break;
      case "medium":
        numberOfMatches = 4;
        break;
      case "hard":
        numberOfMatches = 6;
        break;
      default:
        numberOfMatches = 4; // Default to medium difficulty
        break;
    }
  }

  function generateCards() {
    const cards = [];
    const totalPairs = numberOfMatches;

    for (let i = 1; i <= totalPairs; i++) {
      cards.push(`${theme}_${i}`, `${theme}_${i}`);
    }

    cards.sort(() => Math.random() - 0.5);

    return cards;
  }

  function createCardElement(card) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.textContent = "";
    cardElement.setAttribute("data-card", card);
    cardElement.addEventListener("click", handleCardClick);
    gameContainer.appendChild(cardElement);
  }

  function createCards() {
    gameContainer.innerHTML = ""; // Clear previous cards

    const cards = generateCards();

    // Create the card elements
    cards.forEach(createCardElement);
  }

  function handleCardClick() {
    const clickedCard = this;
    const clickedValue = clickedCard.getAttribute("data-card");

    if (
      flippedCards.length < 2 &&
      !flippedCards.includes(clickedCard) &&
      !matchedCards.includes(clickedCard)
    ) {
      flippedCards.push(clickedCard);
      revealCard(clickedCard, clickedValue);

      if (flippedCards.length === 2) {
        setTimeout(checkForMatch, 1000);
      }
    }
  }

  function revealCard(cardElement, value) {
    cardElement.style.backgroundImage = `url(${theme}/${value}.jpg)`;
  }

  function checkForMatch() {
    const [card1, card2] = flippedCards;
    const value1 = card1.getAttribute("data-card");
    const value2 = card2.getAttribute("data-card");

    if (value1 === value2) {
      card1.classList.add("matched");
      card2.classList.add("matched");
      matchedCards.push(card1, card2);
    } else {
      hideCard(card1);
      hideCard(card2);
    }

    flippedCards = [];

    if (matchedCards.length === numberOfMatches * 2) {
      setTimeout(() => {
        // alert("Congratulations! You matched all the cards.");
        initFireworks();
      }, 0);
    }
  }

  function hideCard(cardElement) {
    cardElement.style.backgroundImage = "";
  }

  function restartGame() {
    flippedCards = [];
    matchedCards = [];
    createCards();
  }

  function goToSection1() {
    section1.style.display = "block";
    section2.style.display = "none";
  }

  function showHint() {
    // Show all cards for 5 seconds
    const allCards = document.querySelectorAll(".card");
    allCards.forEach((card) => {
      const value = card.getAttribute("data-card");
      revealCard(card, value);
    });

    setTimeout(() => {
      allCards.forEach((card) => {
        if (!card.classList.contains("matched")) {
          hideCard(card);
        }
      });
    }, 3000);
  }
});
