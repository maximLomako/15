let numOfCellsinRow = 4;
// пофиксить рендер
let getCorrectArray = (size) => {
  let numbers = [].fill("");
  numbers[size ** 2 - 1] = "";
  numbers.fill("");
  numbers = numbers.map((el, ind) => ind);

  let shuffle = (array, repeat) => {
    for (let i = 0; i <= repeat; i += 1) {
      array.sort(() => Math.random() - 0.5);
    }
  };
  shuffle(numbers, size ** 2);

  const field = [];
  for (let i = 0; i < size; i += 1) {
    field[i] = [];
    for (let j = 0; j < size; j += 1) {
      field[i][j] = numbers.pop();
    }
  }
  return field.flat();
};

const arrOfNum = getCorrectArray(numOfCellsinRow);

const createField = () => {
  const body = document.querySelector('body');
  const numbers = arrOfNum;
  console.log(numbers);

  body.insertAdjacentHTML('afterbegin',
    `
<div class="container">
  <div class="indicators">
    <div class="counter">000</div>
    <div class="timer">00:00</div>
    <div class="gear">
      <img src="./assets/icons/gear.svg" alt="gear-icon">
    </div>
  </div>
  <div class="field"></div>
</div>`);

  const field = document.querySelector('.field');
  numbers.map((c, i) => {
    field.insertAdjacentHTML('beforeend', `<div class="cell" >${c === 0 ? '' : c}</div>`);
  });
}
createField();

//global variable
const container = document.querySelector('.container'),
  field = document.querySelector('.field'),
  cell = document.querySelectorAll('.cell'),
  counter = document.querySelector('.counter'),
  timer = document.querySelector('.timer');
// let initArrLength = 15;
let fieldWidth = '';
let cellWidth = '';
let cellHeight = '';
const cells = [];
let empty = {};
let counterValue = 0;

const initGame = () => {
  fieldWidth = window.getComputedStyle(field).getPropertyValue('width');
  cellWidth = parseInt(fieldWidth, 10) / numOfCellsinRow + 'px';
  cellHeight = cellWidth;
  field.style.height = fieldWidth;

  cell.forEach((c, i) => {
      c.style.width = parseInt(fieldWidth, 10) / numOfCellsinRow + 'px';
      c.style.height = parseInt(fieldWidth, 10) / numOfCellsinRow + 'px';

      const left = i % numOfCellsinRow;
      const top = (i - left) / numOfCellsinRow;

      if (arrOfNum[i] === 0) {
        empty = {
          value: 0,
          top: top,
          left: left,
          element: null
        }
        cells.push({
          value: 0,
          top: top,
          left: left,
          element: null
        })
        c.style.visibility = 'hidden';

      } else {
        cells.push({ // закидываем в массив объектов все наши ячейки
          value: +cell[i].textContent, // то, что написано в ячейке
          left: left,
          top: top,
          element: cell[i]
        });
      }

      cell[i].style.top = `${top * parseInt(cellHeight, 10)}px`; // присваеваем расчетные значения в стили ячеек
      cell[i].style.left = `${left * parseInt(cellWidth, 10)}px`;

      cell[i].addEventListener('click', () => {
        move(i);

      })
    }
  )
}
initGame();


const move = index => {

  const cell = cells[index]; // взяли данные о ячейке из массива объектов
  const leftDiff = Math.abs(empty.left - cell.left); // сравниваем значения по модулю
  const topDiff = Math.abs(empty.top - cell.top); // сравниваем значения по модулю
  if (leftDiff + topDiff > 1) {
    return;
  }

  cell.element.style.top = `${empty.top * parseInt(cellHeight, 10)}px`; // по клику присваеваем значения пустой ячейки нашей ячейке
  cell.element.style.left = `${empty.left * parseInt(cellWidth, 10)}px`; // по клику присваеваем значения пустой ячейки нашей ячейке

  const emptyLeft = empty.left; // промежуточная переменная с координатами пустой ячейки
  const emptyTop = empty.top; // промежуточная переменная с координатами пустой ячейки

  empty.left = cell.left; // присваеваем нашей пустой ячейке координаты нашей ячеки по которой мы кликнули
  empty.top = cell.top; // присваеваем нашей пустой ячейке координаты нашей ячеки по которой мы кликнули

  cell.left = emptyLeft;
  cell.top = emptyTop; // записываем в координаты яейки временные координаты пустой ячнйки

  countMoves();

  let cellsWithoutEmpty = cells.filter((element) => {
    return element.value !== 0;
  });

  const isFinished = cellsWithoutEmpty.every(cell => {
    return cell.value === (cell.top * numOfCellsinRow + cell.left) + 1;
  })

  if (isFinished) {
    console.log('You win!');
  }
}


const countMoves = () => {
  counterValue = counterValue + 1;
  if (counterValue < 10) {
    counter.textContent = '00' + counterValue;
  } else if (counterValue < 100) {
    counter.textContent = '0' + counterValue;
  } else {
    counter.textContent = counterValue;
  }
}

timer.innerHTML = '00:00'
let milliseconds = 0;
const startTimer = () => {
  if (counterValue > 0) {
    milliseconds += 10;
    let dateTimer = new Date(milliseconds);
    timer.innerHTML =
      ('0' + dateTimer.getUTCMinutes()).slice(-2) + ':' +
      ('0' + dateTimer.getUTCSeconds()).slice(-2)
  }
}
setInterval(startTimer, 10)


window.addEventListener("resize", initGame);