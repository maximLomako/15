// const field = document.querySelector('.field');
//
//
//
// // init game
// const empty = {
//   value: 0,
//   top: 3, // нужно убрать хард код
//   left: 3  // нужно убрать хард код
// }
//
// const cells = []; // массив наших ячеек
// // закидываем в массив нашу пустую ячейку
//
// const numbers = [...Array(15).keys()]
// // .map(x => x + 1)
// // .sort(() => Math.random() - 0.5); // ранд массив
//
// const cellSize = parseInt(resizeFn(), 10) / 4; // нужно отредактировать
// for (let i = 0; i < 15; i++) {
//
//   // создания поля
//   const cell = document.createElement('div');
//   const value = numbers[i] + 1;
//   cell.className = 'cell';
//   cell.innerHTML = value;
//
//   const left = i % 4; //позиция элемента left,  рассчет
//   const top = (i - left) / 4; // позиция элемента top, рассчет
//
//   cells.push({ // закидываем в массив объектов все наши ячейки
//     value: value, // то, что написано в ячейке
//     left: left,
//     top: top,
//     element: cell
//   });
//
//   cell.style.top = `${top * cellSize}px`; // присваеваем расчетные значения в стили ячеек
//   cell.style.left = `${left * cellSize}px`; // присваеваем расчетные значения в стили ячеек
//
//   field.appendChild(cell);
//
//   cell.addEventListener('click', () => {
//     move(i);
//   })
// }
// cells.push(empty); // add empty cell to the arr of obj


// function move(index) {
//
//   const cell = cells[index]; // взяли данные о ячейке из массива объектов
//   const leftDiff = Math.abs(empty.left - cell.left); // сравниваем значения по модулю
//   const topDiff = Math.abs(empty.top - cell.top); // сравниваем значения по модулю
//
//   if (leftDiff + topDiff > 1) {
//     return;
//   }
//
//   cell.element.style.top = `${empty.top * cellSize}px`; // по клику присваеваем значения пустой ячейки нашей ячейке
//   cell.element.style.left = `${empty.left * cellSize}px`; // по клику присваеваем значения пустой ячейки нашей ячейке
//
//   const emptyLeft = empty.left; // промежуточная переменная с координатами пустой ячейки
//   const emptyTop = empty.top; // промежуточная переменная с координатами пустой ячейки
//
//   empty.left = cell.left; // присваеваем нашей пустой ячейке координаты нашей ячеки по которой мы кликнули
//   empty.top = cell.top; // присваеваем нашей пустой ячейке координаты нашей ячеки по которой мы кликнули
//
//   cell.left = emptyLeft;
//   cell.top = emptyTop; // записываем в координаты яейки временные координаты пустой ячнйки
//
//   let cellsWithoutEmpty = cells.filter((element) => {
//     return element.value !== 0;
//   });
//
//   const isFinished = cellsWithoutEmpty.every(cell => {
//     return cell.value === (cell.top * 4 + cell.left) + 1;
//   })
//
//
//
//   if (isFinished) {
//     console.log('You won!');
//   }
// }

// //response design
// field.style.height = window.getComputedStyle(field).getPropertyValue('width');
// const resizeFn = () => {
//   const fieldWidth = window.getComputedStyle(field).getPropertyValue('width');
//   return fieldWidth;
// }
// window.addEventListener("resize", resizeFn);


  // let getCorrectArray = (size) => {
  //   let numbers = [].fill("");
  //   numbers[size**2 - 1] = "";
  //   numbers.fill("");
  //   numbers = numbers.map((el, ind) => ind);
  //
  //   let shuffle = (array, repeat) => {
  //     for (let i = 0; i <= repeat; i += 1) {
  //       array.sort(() => Math.random() - 0.5);
  //     }
  //   };
  //   shuffle(numbers, size**2);
  //
  //   const field = [];
  //   for (let i = 0; i < size; i += 1) {
  //     field[i] = [];
  //     for (let j = 0; j < size; j += 1) {
  //       field[i][j] = numbers.pop();
  //     }
  //   }
  //
  //   return field.flat();
  // };
  // getCorrectArray(4)
  //
  // console.log(getCorrectArray(4));
  //






































