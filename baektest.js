
const N = 10; // 지도의 크기(N * N)
const inputArr = ['1010101010', '0101010101',
                  '1010101010', '0101010101',
                  '1010101010', '0101010101',
                  '1010101010', '0101010101',
                  '1010101010', '0101010101'];
// const N = 3;
// const inputArr = ['101', '000', '101'];
var mapArr = [];
var complexNum = 0;


// for(var i = 1; i <= N; i += 1) {
//   inputArr.push(input[i]);
// }

var mappedValue = [];
for(var i = 0; i < N; i += 1) {
    mappedValue = inputArr[i].split("");
    mapArr[i] = [];
    for(var j = 0; j < N; j+= 1) {
        mapArr[i][j] = parseInt(mappedValue[j]);
    }
}
for(var i = 0; i < N; i += 1) {
    for(var j = 0; j < N; j+= 1) {
        if(mapArr[i][j] === 1) { // 집 발견
            complexNum += 1; // 단지 번호 매기기
            dobfs(i, j, complexNum, N); // BFS 시작
        }
    }
}

var size = [];
for(var k = 0; k < complexNum; k += 1) {
    size.push('');
}

for(var i = 0; i < N; i += 1) {
    for(var j = 0; j < N; j += 1) {
        if(mapArr[i][j] === 0) {
            continue;
        }
        size[mapArr[i][j] - 1] += mapArr[i][j];
    }
}
size.sort(function(a, b) {
    return a.length - b.length;
});

console.log(complexNum);
for(var i = 0; i < size.length; i += 1) {
    console.log(size[i].length);
}


/**
 * @param {number} x - 맵의 x 좌표.
 * @param {number} y - 맵의 y 좌표.
 * @param {number} complexNum - 아파트 단지 번호
 * @param {number} N - 정사각형 크기.
 */
function dobfs(x, y, complexNum, N) {
  var queue = [];
  queue.push({ x: x, y: y });
  mapArr[x][y] = complexNum.toString(); // 단지 번호 string 으로 새기기

  var direction = [[-1, 0], [0, -1], [1, 0], [0, 1]]; // 상하좌우

  while(queue.length > 0) {
    var currentPos = queue.shift();
    var posX = currentPos.x; // 맨 처음엔 0
    var posY = currentPos.y; // 맨 처음엔 1
    for(var i = 0; i < 4; i += 1) {  // Direction에 따른 상, 하, 좌, 우 탐색
      var newPosX = posX + direction[i][0]; // 새 좌표 값 = 이전 좌표 값 + 방향 해당 값
      var newPosY = posY + direction[i][1];
      if(newPosX < 0 || newPosX >= N) continue; // 맵 밖이면 패스
      if(newPosY < 0 || newPosY >= N) continue; // 맵 밖이면 패스
      if(mapArr[newPosX][newPosY] !== 1) continue; // 1이 아닌 부분은 패스
      dobfs(newPosX, newPosY, complexNum, N);
    }
  }
}