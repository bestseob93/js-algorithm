// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const N = 7; // 지도의 크기(N * N)
const inputArr = ['0110100', '0110101', '1110101', '0000111','0100000', '0111110', '0111000'];

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
  console.log(this.mapArr);
  this.checkHouse();
}

/**
 * @memberof BFS
 */

BFS.prototype.checkHouse = function() {
  for(let i = 0; i < N; i += 1) {
    for(let j = 0; j < N; j+= 1) {
      console.log(this.mapArr[i][j]);
      if(this.mapArr[i][j] === 1) { // 집 발견
        console.log('++ 집 발견 ++');
        this.complexNum += 1; // 단지 번호 매기기
        this.dobfs(i, j, this.complexNum); // BFS 시작
      }
    }
  }

  this.countHouse();
}

BFS.prototype.countHouse = function() {
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
  console.log(size);
}

BFS.prototype.dobfs = function(x, y, complexNum) {
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
    queue.pop();
    for(let i = 0; i < 4; i += 1) {
      console.log('formoon', i);
      let newPosX = posX + direction[i][0];
      let newPosY = posY + direction[i][1];
      if(newPosX < 0 || newPosX >= N) continue;
      if(newPosY < 0 || newPosY >= N) continue;
      if(this.mapArr[newPosX][newPosY] !== 1) continue;
      console.log(newPosX, '**', newPosY, '&&', complexNum);
      this.dobfs(newPosX, newPosY, complexNum);
    }
  }
}

const result = new BFS();

console.log(result.init(N, inputArr));

