let numOfCellsinRow = 4;
let newCellsValue = [];
const createPage = () => {
  const body = document.querySelector('body');

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

  let arrOfNum = getCorrectArray(numOfCellsinRow);
  // let arrOfNum = [...JSON.parse(localStorage.getItem('newCellsValue')).map(c => c.value)];
  const createField = () => {

    const numbers = arrOfNum;

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
      field.insertAdjacentHTML('beforeend',
        `<div class="cell" draggable="true">${c === 0 ? '' : c}</div>`);
    });
  }
  createField();

  const createModalWindow = () => {
    body.insertAdjacentHTML('afterbegin',
      `<div class="modal">
              <div class="modal__dialog">
                <div class="modal__item">New game</div>
                <div class="modal__item">Save game</div>
                <div class="modal__item">Change size</div>
                <div class="modal__item">Best scores</div>
                <div class="modal__item">Sound</div>
                <div class="close">
                <img src="./assets/icons/close.svg" alt="close-icon">
                </div>
              </div>
             </div>`
    );
  }
  createModalWindow();
//global variable
  const container = document.querySelector('.container'),
    field = document.querySelector('.field'),
    cell = document.querySelectorAll('.cell'),
    counter = document.querySelector('.counter'),
    timer = document.querySelector('.timer'),
    gear = document.querySelector('.gear'),
    gearIcon = document.querySelector('.gear img'),
    modal = document.querySelector('.modal'),
    modalDialog = document.querySelector('.modal__dialog'),
    close = document.querySelector('.close'),
    modalItems = document.querySelectorAll('.modal__item'),
    fieldSizeValue = ['3x3', '4x4', '5x5', '6x6', '7x7', '8x8'];

// let initArrLength = 15;
  let fieldWidth = '';
  let cellWidth = '';
  let cellHeight = '';
  let fontSize = '';
  const cells = [];
  let empty = {};
  let counterValue = 0;
  let audioStatus = true;

  const initGame = () => {
    fieldWidth = window.getComputedStyle(field).getPropertyValue('width');
    cellWidth = parseInt(fieldWidth, 10) / numOfCellsinRow + 'px';
    cellHeight = cellWidth;
    field.style.height = fieldWidth;

    cell.forEach((c, i) => {
        c.style.width = parseInt(fieldWidth, 10) / numOfCellsinRow + 'px';
        c.style.height = parseInt(fieldWidth, 10) / numOfCellsinRow + 'px';
        c.style.fontSize = '5vw';

        const left = i % numOfCellsinRow;
        // const left = JSON.parse(localStorage.getItem('newCellsValue'))[i].left
        const top = (i - left) / numOfCellsinRow;
        // const top = JSON.parse(localStorage.getItem('newCellsValue'))[i].top

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

        //drag
        const dragStart = () => {
          setTimeout(() => {
            c.classList.toggle('hide');
          }, 0);
        }
        const dragEnd = () => {
          c.classList.toggle('hide');
          move(i);
        }

        const dragOver = () => {
          console.log('over');
        }
        const dragEnter = () => {
          console.log('enter');
        }


        cell[i].addEventListener('click', () => {
          move(i);
        })

        cell[i].addEventListener('dragstart', dragStart);
        cell[i].addEventListener('dragend', dragEnd);

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
    audioStatus ? audio.play() : '';

    let cellsWithoutEmpty = cells.filter((element) => {
      return element.value !== 0;
    });

    const isFinished = cellsWithoutEmpty.every(cell => {
      return cell.value === (cell.top * numOfCellsinRow + cell.left) + 1;
    })

    if (isFinished) {
      modal.classList.toggle('modal__active')
      modalDialog.innerHTML =
        `Congrats! You are win with ${counterValue} moves and your time is ${timer.textContent}`
      setTimeout(()=> {
        modal.remove();
        container.remove();
        createPage();
      }, 2000)
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
  setInterval(startTimer, 10);


  const toggleModal = () => {
    modal.classList.toggle('modal__active')
    gear.classList.toggle('active')

  }

//start new game
  const startGame = () => {
    modal.classList.toggle('modal__active');
    modal.remove();
    container.remove();
    createPage();
  }

  //change size
  const changeFieldSize = () => {
    modalDialog.innerHTML = '';
    fieldSizeValue.map(s => {
      modalDialog.insertAdjacentHTML('beforeend',
        `<span class='field__size'>${s}</span>`)
    });

    modalDialog.addEventListener('click', (e) => {
      if (e.target.classList.contains('field__size')) {
        modal.classList.toggle('modal__active');
        numOfCellsinRow = +e.target.textContent[0]
        modal.remove();
        container.remove();
        createPage();
      }
    })
  }
// audio
  let audio = new Audio('./assets/audio/button.wav');

  const changeAudioStatus = () => {
    modalItems[4].style.textDecoration = audioStatus ? 'line-through' : 'none';
    audioStatus = !audioStatus;
  }

  //save game
  // const saveGame = () => {
  //   newCellsValue = [...cells];
  //   localStorage.setItem('newCellsValue', JSON.stringify(newCellsValue));
  //   console.log(cells);
  // }


  modalItems[0].addEventListener('click', startGame);
  // modalItems[1].addEventListener('click', saveGame);
  modalItems[2].addEventListener('click', changeFieldSize);
  modalItems[4].addEventListener('click', changeAudioStatus);
  gearIcon.addEventListener('click', toggleModal);
  close.addEventListener('click', toggleModal);

  document.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.toggle('modal__active')
      gear.classList.toggle('active')
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      modal.classList.remove('modal__active')
      gear.classList.toggle('active')
    }
  })

  window.addEventListener("resize", initGame);
}
createPage();