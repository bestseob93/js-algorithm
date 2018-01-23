#include <stdio.h>

int N;
int inputArr[101][101]; // 그래프 i,j i=간선, j=정점
/** 
    방향 그래프임!!
    input
    3
    0 1 0    (1, 2)로   1 -> 2
    0 0 1    (2, 3)으로  2 -> 3
    1 0 0    (3, 1)로   3 -> 1
                                    나름 그림임
                                    1  <--  3
                                     \     >
                                      \   /
                                       > /
                                        2
                                           
 */
int pathTo[101][101];
int visited[101];
void DFS(int n);

int main() {

	scanf("%d",&N); // N 입력 받음
	for(int i=1; i<=N; i++) {
		for(int j=1; j<=N; j++) {
			scanf("%d", &inputArr[i][j]);  // 2차원 배열에 입력 값 받음.
			pathTo[i][j] = 0; // 가는 방향 배열은 전체 0으로 초기화
		}
	}


	for(int i=1; i<=N; i++) {
		for(int j=1; j<=N; j++) {
			visited[j] = 0; // 각 행에서 방문할 열을 0(false)으로 초기화
        }

		DFS(i); // DFS, 재귀로 하면 스택이랑 같음.

        // printf("DFS called in main\n");
		for(int j=1; j<=N; j++) { 
            // 최초 DFS(1) 다 끝나고 나서 "DFS called in main" 호출 후 여기 loop 돔. 그리고 끝나면 다시 DFS(2)
			pathTo[i][j] = visited[j]; 
        }
	}
    
    // 출력 부분 코드
	for(int i=1; i<=N; i++) {
		for(int j=1; j<=N; j++) {
			printf("%d ", pathTo[i][j]);
        }
		printf("\n");
	}
	return 0;
}

void DFS(int n) {

	for(int i=1; i<=N; i++) {
		if(inputArr[n][i] && !visited[i]) { // !visited[i]는 visited[i] === 1이랑 같은 의미로
			visited[i] = 1; // inputArr[n][i] 값이 1일 때 visited[i]를 방문했다는 의미로 true
			DFS(i); // 깊이우선 탐색 재귀(한쪽 방향부터 파므로)
		}
	}
}