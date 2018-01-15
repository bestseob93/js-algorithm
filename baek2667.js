// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const N = 7; // 지도의 크기(N * N)
const inputArr = ['0110100', '0110101', '1110101', '0000111', '0100000', '0111110', '0111000'];

 /**
  * Breadth First Search
  * @class
  */
var BFS = function() {
    if (!(this instanceof BFS)) {
        return new BFS();
    }
    this.mapArr = [];
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
            this.mapArr[i][j] = mappedValue[j];
        }
    }
    this.checkBlock();
}

/**
 * @memberof BFS
 */

BFS.prototype.checkBlock = function() {

}

function bfs(x, y) {
    let queue = [];
    queue.push({ x, y });

    if(queue.length > 0) {
        
    }
}

const result = new BFS();
console.log(result.init(N, inputArr));

