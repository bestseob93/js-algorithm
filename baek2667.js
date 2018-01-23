// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const squareN = 7; // 지도의 크기(N * N)
const inputArr = ['0110100', '0110101', '1110101', '0000111','0100000', '0111110', '0111000'];

// let N = parseInt(input[0], 10);
// let inputArr = [];
// for(let i = 1; i <= N; i += 1) {
//   inputArr.push(input[i]);
// }
 /**
  * Breadth First Search
  * @class
  */
var BFS = function() {
  if (!(this instanceof BFS)) {
      return new BFS();
  }
  this.mapArr = [];
  this.complexNum = 0;
}
/**
 * @memberof BFS
 * @param {number} N - 정사각형 크기.
 * @param {array} inputArr - 각 줄에 들어오는 0과 1로된 값
 * @returns {number}
 */
BFS.prototype.init = function(N, inputArr) {
  let mappedValue = [];
  for(let i = 0; i < N; i += 1) {
    mappedValue = inputArr[i].split("");
    this.mapArr[i] = [];
    for(let j = 0; j < N; j+= 1) {
      this.mapArr[i][j] = parseInt(mappedValue[j]);
    }
  }
  // console.log(this.mapArr);
  this.checkHouse(N);
}

/**
 * @memberof BFS
 */
BFS.prototype.checkHouse = function(N) {
  for(let i = 0; i < N; i += 1) {
    for(let j = 0; j < N; j+= 1) {
      // console.log(this.mapArr[i][j]);
      if(this.mapArr[i][j] === 1) { // 집 발견
        // console.log('++ 집 발견 ++');
        this.complexNum += 1; // 단지 번호 매기기
        this.dobfs(i, j, this.complexNum, N); // BFS 시작
      }
    }
  }

  this.countHouse(N);
}

/**
 * @memberof BFS
 */
BFS.prototype.countHouse = function(N) {
  let size = [];
  for(let k = 0; k < this.complexNum; k += 1) {
    size.push('');
  }
  
  for(let i = 0; i < N; i += 1) {
    for(let j = 0; j < N; j += 1) {
      if(this.mapArr[i][j] === 0) {
        continue;
      }
      size[this.mapArr[i][j] - 1] += this.mapArr[i][j];
    }
  }
  // console.log(size);
  size.sort(function(a, b) {
    return a.length - b.length;
  });

  this.output(size);
}

/**
 * @memberof BFS
 * @param {Array} size - 단지 별 집 개수
 */
BFS.prototype.output = function(size) {
  // console.log('결과');
  console.log(this.complexNum);
  for(let i = 0; i < size.length; i += 1) {
    console.log(size[i].length);
  }
}

/**
 * @memberof BFS
 * @param {number} x - 맵의 x 좌표.
 * @param {number} y - 맵의 y 좌표.
 * @param {number} complexNum - 아파트 단지 번호
 */
BFS.prototype.dobfs = function(x, y, complexNum, N) {
  let queue = [];
  queue.push({ x, y });
  this.mapArr[x][y] = complexNum.toString(); // 단지 번호 string 으로 새기기
  console.log(queue);
  console.log(this.mapArr);
  console.log(complexNum);
  console.log('++ 단지 번호 ++');

  const direction = [[-1, 0], [0, -1], [1, 0], [0, 1]]; // 상하좌우

  while(queue.length > 0) {
    let currentPos = queue.shift();
    let posX = currentPos.x; // 맨 처음엔 0
    let posY = currentPos.y; // 맨 처음엔 1
    console.log(posX, '+', posY); // 0 '+' 1
    console.log(queue);
    // queue.pop();
    for(let i = 0; i < 4; i += 1) {  // Direction에 따른 상, 하, 좌, 우 탐색
      // console.log('formoon', i);
      let newPosX = posX + direction[i][0]; // 새 좌표 값 = 이전 좌표 값 + 방향 해당 값
      let newPosY = posY + direction[i][1];
      if(newPosX < 0 || newPosX >= N) continue; // 맵 밖이면 패스
      if(newPosY < 0 || newPosY >= N) continue; // 맵 밖이면 패스
      if(this.mapArr[newPosX][newPosY] !== 1) continue; // 1이 아닌 부분은 패스
      // console.log(newPosX, '**', newPosY, '&&', complexNum);
      this.dobfs(newPosX, newPosY, complexNum, N);
    }
  }
}

const result = new BFS();
console.log(result.init(squareN, inputArr));
////////////////////////////////////////////////////////////////////////////////////////


// var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().split('\n');

// // const N = 7; // 지도의 크기(N * N)
// // const inputArr = ['0110100', '0110101', '1110101', '0000111','0100000', '0111110', '0111000'];
// console.log(input[0]);
// var squareN = input[0];
// var inputArr = [];
// if(squareN < 5 || squareN > 25) {
//     new Error("N 범위 밖");
// }
// for(var i = 1; i <= squareN; i += 1) {
//   inputArr.push(input[i]);
// }
//  /**
//   * Breadth First Search
//   * @class
//   */
// var BFS = function() {
//   if (!(this instanceof BFS)) {
//       return new BFS();
//   }
//   this.mapArr = [];
//   this.complexNum = 0;
// }
// /**
//  * @memberof BFS
//  * @param {number} N - 정사각형 크기.
//  * @param {array} inputArr - 각 줄에 들어오는 0과 1로된 값
//  * @returns {number}
//  */
// BFS.prototype.init = function(N, inputArr) {
//   var mappedValue = [];
//   for(var i = 0; i < N; i += 1) {
//     mappedValue = inputArr[i].split("");
//     this.mapArr[i] = [];
//     for(var j = 0; j < N; j+= 1) {
//       this.mapArr[i][j] = parseInt(mappedValue[j]);
//     }
//   }
//   // console.log(this.mapArr);
//   this.checkHouse(N);
// }

// /**
//  * @memberof BFS
//  * @param {number} N - 정사각형 크기.
//  */
// BFS.prototype.checkHouse = function(N) {
//   for(var i = 0; i < N; i += 1) {
//     for(var j = 0; j < N; j+= 1) {
//       // console.log(this.mapArr[i][j]);
//       if(this.mapArr[i][j] === 1) { // 집 발견
//         // console.log('++ 집 발견 ++');
//         this.complexNum += 1; // 단지 번호 매기기
//         this.dobfs(i, j, this.complexNum, N); // BFS 시작
//       }
//     }
//   }

//   this.countHouse(N);
// }

// /**
//  * @memberof BFS
//  * @param {number} N - 정사각형 크기.
//  */
// BFS.prototype.countHouse = function(N) {
//   var size = [];
//   for(var k = 0; k < this.complexNum; k += 1) {
//     size.push('');
//   }
  
//   for(var i = 0; i < N; i += 1) {
//     for(var j = 0; j < N; j += 1) {
//       if(this.mapArr[i][j] === 0) {
//         continue;
//       }
//       size[this.mapArr[i][j] - 1] += this.mapArr[i][j];
//     }
//   }
//   // console.log(size);
//   size.sort(function(a, b) {
//     return a.length - b.length;
//   });

//   this.output(size);
// }

// /**
//  * @memberof BFS
//  * @param {Array} size - 단지 별 집 개수
//  */
// BFS.prototype.output = function(size) {
//   // console.log('결과');
//   console.log(this.complexNum);
//   for(var i = 0; i < size.length; i += 1) {
//     console.log(size[i].length);
//   }
// }

// /**
//  * @memberof BFS
//  * @param {number} x - 맵의 x 좌표.
//  * @param {number} y - 맵의 y 좌표.
//  * @param {number} complexNum - 아파트 단지 번호
//  * @param {number} N - 정사각형 크기.
//  */
// BFS.prototype.dobfs = function(x, y, complexNum, N) {
//   var queue = [];
//   queue.push({ x: x, y: y });
//   this.mapArr[x][y] = complexNum.toString(); // 단지 번호 string 으로 새기기
//   // console.log(queue);
//   // console.log(this.mapArr);
//   // console.log(complexNum);
//   // console.log('++ 단지 번호 ++');

//   var direction = [[-1, 0], [0, -1], [1, 0], [0, 1]]; // 상하좌우

//   while(queue.length > 0) {
//     var currentPos = queue.shift();
//     var posX = currentPos.x; // 맨 처음엔 0
//     var posY = currentPos.y; // 맨 처음엔 1
//     // console.log(posX, '+', posY); // 0 '+' 1
//     // console.log(queue);
//     // queue.pop();
//     for(var i = 0; i < 4; i += 1) {  // Direction에 따른 상, 하, 좌, 우 탐색
//       // console.log('formoon', i);
//       var newPosX = posX + direction[i][0]; // 새 좌표 값 = 이전 좌표 값 + 방향 해당 값
//       var newPosY = posY + direction[i][1];
//       if(newPosX < 0 || newPosX >= N) continue; // 맵 밖이면 패스
//       if(newPosY < 0 || newPosY >= N) continue; // 맵 밖이면 패스
//       if(this.mapArr[newPosX][newPosY] !== 1) continue; // 1이 아닌 부분은 패스
//       // console.log(newPosX, '**', newPosY, '&&', complexNum);
//       this.dobfs(newPosX, newPosY, complexNum, N);
//     }
//   }
// }

// var result = new BFS();

// result.init(squareN, inputArr);