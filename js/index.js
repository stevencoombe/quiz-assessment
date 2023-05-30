/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers. **DONE**

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you. **DONE**

      3. Add 2 more questions to the app (each question must have 4 options). **DONE**

      4. Reload the page when the reset button is clicked (hint: search window.location) **DONE**

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers **DONE**
*************************** */

window.addEventListener('DOMContentLoaded', () => {
  const start = document.querySelector('#start');
  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';

    // Starts countdown timer
    startTimer(minutes, seconds, countdownDisplay);

    start.style.display = 'none';
  });
  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1,
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
    {
      q: 'What is the largest mountain on Earth',
      o: ['Kangchenjunga', 'Everest', 'Kosciuszko', 'Fuji'],
      a: 1,
    },
    {
      q: 'What is the largest continent',
      o: ['Africa', 'North America', 'Antarctica', 'Asia'],
      a: 3,
    },
  ];

  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0">
                      <input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>

                    <li class="list-group-item" id="li_${index}_1">
                      <input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>

                    <li class="list-group-item"  id="li_${index}_2">
                      <input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>

                    <li class="list-group-item"  id="li_${index}_3">
                      <input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Calculate the score
  let isQuizSubmitted = false;

  const submittedQuiz = () => {
    isQuizSubmitted = true;
    calculateScore();
  }

  const calculateScore = () => {
    if (isOutOfTime == false && isQuizSubmitted == true) {
      document.querySelector('#time').textContent = "";
      countdownDisplay.textContent = "";
    }
    
    let score = 0;
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector('#' + li);
        radioElement = document.querySelector('#' + r);

        // Radio buttons not selected by user will stay disabled
        radioElement.disabled = true;

        if (quizItem.a == i) {
          liElement.style.backgroundColor = '#007500' //Green;
        }

        if (radioElement.checked) {
          // Enables selected radio button
          radioElement.disabled = false;
            if(quizItem.a === i)
              score += 1;
            else
              liElement.style.backgroundColor = '#D10000' //Red;
        }
      }
    });
    document.getElementById('score').innerHTML = 'Total score: ' + score;
    document.getElementById('btnSubmit').disabled = 'true';
  };

  const refreshQuiz = () => {
    window.location.reload();
  }

  // Countdown timer
  let minutes = 1;
  let seconds = 0;

  let isOutOfTime = false;

  let countdownDisplay = document.querySelector('#time-remaining');

  // Converts to string to allow the 00:00 time formatting
  let formattedMinutes = String(minutes).padStart(2, '0');
  let formattedSeconds = String(seconds).padStart(2, '0');

  countdownDisplay.textContent = formattedMinutes + ":" + formattedSeconds;

  const startTimer = (timerMinutes, timerSeconds, display) => {
    const timer = setInterval(() => {  
      let isTimerOn = true; 

      if (timerSeconds === 0) {
        if (timerMinutes === 0) {
          clearInterval(timer);
          isTimerOn = false;
          isOutOfTime = true;
          calculateScore();
        }
          timerMinutes--;
          timerSeconds = 59;       
      } else {
        timerSeconds--;
      }

      let minutesLeft = String(timerMinutes).padStart(2, '0');
      let secondsLeft = String(timerSeconds).padStart(2, '0');

      display.textContent = minutesLeft + ':' + secondsLeft;
      
      if (isTimerOn == false && isQuizSubmitted == false)
      {
        document.querySelector('#time').textContent = "Time's up!";
        display.textContent = "";
        
      }   
    }, 1000);
  }

  document.getElementById('btnSubmit').addEventListener('click',submittedQuiz);
  document.getElementById('btnReset').addEventListener('click',refreshQuiz);

  displayQuiz();
});
