document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-button");
    const numberContainer = document.getElementById("number-container");
    const question = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    const feedback = document.getElementById("feedback");
  
    let numbersToAsk = shuffleArray(generateEvenNumbers(10));
    let currentNumberIndex = 0;
    let isGameStarted = false;
  
    startButton.addEventListener("click", startGame);
  
    function startGame() {
      isGameStarted = true;
      startButton.style.display = "none";
      optionsContainer.style.display = "block";
      feedback.textContent = "";
      showNextNumber();
    }
  
    function showNextNumber() {
      if (currentNumberIndex < numbersToAsk.length) {
        const currentNumber = numbersToAsk[currentNumberIndex];
        numberContainer.textContent = currentNumber;
        displayOptions();
      } else {
        endGame();
        return;
      }
    }
  
    function displayOptions() {
      optionsContainer.innerHTML = ""; // Limpiar las opciones
  
      // Generar opciones múltiples aleatorias
      const correctAnswer = numbersToAsk[currentNumberIndex] / 2;
      const options = generateRandomOptions(correctAnswer, 4);
  
      // Mostrar las opciones
      options.forEach(option => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.addEventListener("click", function () {
          checkAnswer(option);
        });
        optionsContainer.appendChild(optionButton);
      });
    }
  
    function generateRandomOptions(correctAnswer, count) {
      const options = [correctAnswer];
      while (options.length < count) {
        const randomOption = getRandomInt(1, 20); // Mitad de un número par menor o igual a 20
        if (!options.includes(randomOption)) {
          options.push(randomOption);
        }
      }
      return shuffleArray(options.map(option => Math.floor(option)));
    }
  
    function generateEvenNumbers(count) {
      const evenNumbers = [];
      for (let i = 2; i <= 20; i += 2) {
        evenNumbers.push(i);
      }
      return evenNumbers.slice(0, count);
    }
  
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    function checkAnswer(answer) {
      const correctAnswer = numbersToAsk[currentNumberIndex] / 2;
      if (parseInt(answer) === correctAnswer) {
        feedback.textContent = "¡Correcto!";
        setTimeout(function () {
          currentNumberIndex++;
          showNextNumber();
          feedback.textContent = "";
        }, 1000);
      } else {
        feedback.textContent = "¡Incorrecto! Inténtalo de nuevo.";
      }
    }
  
    function endGame() {
      isGameStarted = false;
      question.textContent = "¡Bien hecho! Juego terminado.";
      startButton.textContent = "Volver a jugar";
      startButton.style.display = "block";
      optionsContainer.style.display = "none";
      startButton.addEventListener("click", resetGame);
    }
  
    function resetGame() {
      numbersToAsk = shuffleArray(generateEvenNumbers(10));
      currentNumberIndex = 0;
      startGame();
    }
  });
  