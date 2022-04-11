#Run Dev Instantly

> 특정 저장소+브랜치+커밋을 입력하면 컨테이너 빌드하고 랜덤 AA 레코드 붙여서 리턴

---
## 시나리오
1. Web Client input 에 다음 값을 입력 : Github Token, Branch Name, Commit ID
2. 입력받은 값을 통해 github 에서 코드를 받고 Docker 에서 빌드
3. 외부에서 url 접근이 가능하도록 AA 레코드가 추가된 주소 출력(ex - https://{random}.domain.dev)
4. 컨테이너와 임시 경로는 가동 후 일정 시간 뒤 자동으로 종료 / 삭제 