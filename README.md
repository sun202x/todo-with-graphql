# todo-with-graphql

## 개요
GraphQL 응용을 위한 Todo 어플리케이션 개발

## 사용 기술

### Server
- Typescript(with tsnode)
- Apollo Server version 4
- GraphQL
- express
- MongoDB
- WebSocket
- nodemon

### Client
- Typescript
- React 18
- GraphQL
- Relay(with react-relay, relay-compilor)
- Recoil
- Material UI

## 시작하기

server
```bash
cd server
npm install
npm start
```

client
```bash
cd client
npm install
npm start
```

## 목표

### GraphQL 서버 구축
- `Apollo Server version 4`를 이용한 서버 구축
- `Typescript` 환경에서 `GraphQL` 사용을 위한 환경 설정
- `GraphQL` `Subscription 쿼리` 사용을 위한 웹소켓 서버 구축

### Todo Application 개발
- `GraphQL`을 Clien 단에서 사용하기 위한 `Relay` 도입
- 전역 상태관리 라이브러리인 `Recoil`을 통해 `Relay` 사용
  - `Atom`, `Selector를` 통해 `GraphQL 쿼리` 사용을 하므로써 사용편의성 증대
- `React error boundary`를 통해 컴포넌트 오류 모니터링
- 위젯 주도 개발 컨셉 도입
  - 각 React 컴포넌트들의 폴더 구조를 위젯 단위로 나눔으로써 개발 명확성 증대를 기대