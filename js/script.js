document.addEventListener("DOMContentLoaded", () => {
    const wordText = document.querySelector(".word");
    const timeText = document.querySelector(".time b");
    const hintText = document.querySelector(".hint span");
    const inputField = document.querySelector(".input");
    const refreshBtn = document.querySelector(".refresh-word");
    const checkBtn = document.querySelector(".check-word");
    const scoreText = document.querySelector(".score b");
let score = 0;

    let correctWord;
    let timer; //  Declare timer

    const initTimer = (maxTime) => {
        clearInterval(timer);
        timer = setInterval(() => {
            if (maxTime > 0) {
                maxTime--;
                timeText.innerText = maxTime;
            } else {
                clearInterval(timer);
                alert(`Time's up! ${correctWord.toUpperCase()} was the correct word`);
                score = 0;
                scoreText.innerText = score;
                initGame();
            }
        }, 1000);
    };

    const initGame = () => {
        clearInterval(timer); // Clear old timer if any
        initTimer(30); // Start new timer

        let randomObj = words[Math.floor(Math.random() * words.length)];
        let wordArray = randomObj.word.split("");

        // Shuffle the word
        for (let i = wordArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
        }

        wordText.innerText = wordArray.join("");
        hintText.innerText = randomObj.hint;
        correctWord = randomObj.word.toLowerCase();
        inputField.value = "";
        inputField.setAttribute("maxlength", correctWord.length);
    };

    const checkWord = () => {
        let userWord = inputField.value.toLowerCase();
        if (!userWord) return alert("Enter a word");
        if (userWord !== correctWord) return alert(`Oops! ${userWord} is not the correct word`);
        score++;
        scoreText.innerText = score;
        alert(`Congrats! ${userWord.toUpperCase()} is correct!`);
        initGame();
    };

    refreshBtn.addEventListener("click", initGame);
    checkBtn.addEventListener("click", checkWord);

    initGame(); // Start game on page load
});
