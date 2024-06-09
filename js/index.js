const output = document.querySelector(".output");
const buttons = document.querySelectorAll(".button-con button");
const digits = document.querySelectorAll(".digit")
const sum = document.querySelector("#sum");
const historyList = document.querySelector("#history-list");
const answer = document.querySelector(".result");
const operators = Array.from(document.querySelectorAll(".operator"));

function calculator() {
  output.innerText = "";
  answer.innerText = "";

  keyInput();
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.id === "clear") {
        output.innerText = "";
        answer.innerText = "";
      } else if (button.id === "squared") {
            let square = output.innerText
            let result = math.square(square);
            output.innerText += button.innerText
            answer.innerText = result
            sendHistory();
        } else if (button.id === "sq-root") {
            let x = output.innerText
            let result = Math.sqrt(x);
            output.innerText = button.innerText + output.innerText;
            answer.innerText = result;
            sendHistory();  
        } else if (button.id === "sum") {
            getSum(output.innerText);
            output.innerText = "";
        } else {
            output.innerText += button.innerText + " ";
            getSum(output.innerText);
            sendHistory();
        }
        disableOperators();
      });
    }); 
}

window.onload = function() {
  getStorage();
}

function keyInput() {
  window.addEventListener("keydown", (event) => { 
    if (event.key === "Backspace" || event.key === "Delete") {
      output.innerText = "";
      answer.innerText = "";
    } else if (event.key === "^") {
      let square = output.innerText
      let result = math.square(square);
      output.innerText += "^2"
      answer.innerText = result
      sendHistory();
    } else if (event.key === "Enter" || event.key === "=") {
      getSum(output.innerText)
      output.innerText = "";
    } else if (!isNaN(event.key) || "+-*/".includes(event.key)) {
      output.innerText += event.key;
      getSum(output.innerText)
    } 
  });
}

function getSum() {
  try {
    const arith = math.compile(output.innerText)
    const result = arith.evaluate()
    answer.innerText = result;
  } catch {
    answer.innerText += "";
  }
}

function disableOperators () {
  const lastChar = output.innerText.charAt(output.innerText.length - 1);

  buttons.forEach((button) => {
     button.disabled = false

    if (
      (operators.some((operator) => operator.innerText === lastChar) && button.classList.contains("operator"))) {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  });
}

function sendHistory() {
  const historyBtn = document.createElement("button");
  const historyIcon = document.createElement("img");
  const arithmeticHistory = output.innerText;
  const sumHistory = answer.innerText;
  const equals = document.createTextNode(' = ');

  historyIcon.src = 'img/arrow.svg';
  historyIcon.alt = 'left arrow';
  historyIcon.className = 'history-icon';

 
  historyBtn.className = "historybtn"
  historyBtn.addEventListener("click", () => {
    output.innerText = arithmeticHistory;
    answer.innerText = sumHistory;
  });

  historyBtn.appendChild(historyIcon);
  historyBtn.appendChild(document.createTextNode(arithmeticHistory));
  historyBtn.appendChild(equals)
  historyBtn.appendChild(document.createTextNode(sumHistory))
  historyList.insertBefore(historyBtn, historyList.children[0]);

  storeLocally();
}

function storeLocally() {
  localStorage.setItem('storedArithmetic', output.innerText);
  localStorage.setItem('storedSum', answer.innerText);  
  localStorage.setItem('storedHistory', historyList.innerHTML)
  
  console.log('Storing:', output.innerText, answer.innerText);
  localStorage.setItem('storedArithmetic', output.innerText);
  localStorage.setItem('storedSum', answer.innerText);  
  localStorage.setItem('storedHistory', historyList.innerHTML);
}

function getStorage() {
  const storedArithmetic = localStorage.getItem('storedArithmetic')
  const storedSum = localStorage.getItem('storedSum')
  const storedHistory = localStorage.getItem('storedHistory')

  if (storedArithmetic != null) {
    output.innerText = storedArithmetic
  } else {
    output.innerText = "";
  }

  if (storedSum != null) {
    answer.innerText = storedSum
  } else {
    answer.innerText = "";
  }
  
  if (storedHistory != null) {
    historyList.innerHTML = storedHistory
  }
}

calculator();




