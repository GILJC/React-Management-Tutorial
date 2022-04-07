import React, { Component } from 'react';

//import logo from './logo.svg';
import './App.css';

import Customer from './components/Customer';

// 마테리얼로 테이블, Head, Body, Row, Cell 까지 import
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

// 컴포넌트 외부를 감싸기 위한 컴포넌트중 하나 -> <Table>의 양 끝 감쌀것
import Paper from '@material-ui/core/Paper';

// css 사용하기 위해 import
import { withStyles } from '@material-ui/core/styles';
// 그럼 이제 스타일 변수 설정 가능

// 비동기적 호출이 이루어짐 -> API서버에서 응답을 하지 않으면 -> 상대에게 계속 로딩 화면만 출력되게 할 것
// progress bar를 API 로딩 메세지 용도로 사용하기 위해, 아래를 import
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3, // 위로 마진 3 넣어줌
    overflowX: "auto" // x축으로 오버플로우 발생 가능하게 처리함
  },
  table: {
    minWidth: 1080  //  화면 크기 줄어도, 테이블 크기는 무조건 1080만큼 유지
  },
  progress: {
    margin: theme.spacing.unit * 2
  } // progress bar 에 위쪽으로 2만큼 margin을 줌
})

/* //서버에서 받도록, 해당 데이터는 다 지워줌
// cutomer->customers로 바꾸고 -> 배열로 바꿈 [{},{},{}]
const customers = [
  {  // 아래에서 props 보내줄 값 정해줌
    'id': 1,
    'image': 'https://placeimg.com/64/64/1', // 임의의 이미지 보여주는 사이트, 64/64는 크기
    'name': '나동빈',
    'birthday': '961222',
    'gender': '남자',
    'job': '대학생'
  },
  { 
    'id': 2,
    'image': 'https://placeimg.com/64/64/2', 
    'name': '홍길동',
    'birthday': '960305',
    'gender': '남자',
    'job': '프로그래머'
  },
  {  
    'id': 3,
    'image': 'https://placeimg.com/64/64/3', 
    'name': '이순신',
    'birthday': '921205',
    'gender': '남자',
    'job': '디자이너'
  },

]
*/


   // Component : 어떤 내용을 보여주기 위한 기본적인 단위
class App extends Component { // App은 web프로그램 그 자체를 화면에 출력하기 위해
                    // Component로 만들어 준 것
                    // index.html의 root의 위치에 App.js의 App Component가 그려지게 되는 것
// + 또한 Component는 계층적으로 구성될 수 있기 때문에. App 하나 안에 여러개의 Component가 들어갈 수 있음
// 고객 component를 여러개 만들 것 -> src/components안에 만들 것
// -> components/Customer.js 생성 = Customer 의 Component를 정리해 줄 것

// Component는 라이브러리라는 점에서 -> 생명 주기가 존재

// 서버에서 값 받아오기, 생성
  state = { // 아래의 props는 변경될 수 없는 값, state는 변경될 수 있는 값
    customers: "",
    completed: 0  // progress bar는 0부터 100까지 하기 때문
  }
  // props에서 state로 값이 바뀌었기에 -> 아래의 <Table..>의 customers.map(cd...에서
  // -> this.state.customers.map(...)로 변경

  // api 서버에 접근해서, 데이터 받아오는 작업은 componentDidMount()가 함
  componentDidMount() {  // componentDidMount 는 모든 컴포넌트가 실제로 mount가 완료 되었을 때, 실행되는 부분
    this.timer = setInterval(this.progress, 200); // 0.2초마다 프로그래스 함수 실행되도록 설정 (나중에 사용한 progress bar) -> 아래의 progress 함수의 completed라는 값이 0~100까지 반복됨
 // 200으로 안하면 이상한 상황 발생 -> progress bar가 진행되다 말고 돌아가고, 80이상정도로 안넘어가는등 버그 발생 -> 원인 못찾음

  // 프로그래스bar 잘 나오는지 확인 위해 -> 일부러 지연시킴 = callApi()부분을 다 지워버림
    this.callApi()  // 이제 컴포넌트가 준비가 완료된 상황이니 -> Api()를 불러올 수 있게 해줄 것 = 아래의 callApi
      .then(res => this.setState({customers: res}))
      // 아래의 body가 callApi로 불려와져서 .then 함수로 하여금 -> res로 변수 이름이 바뀜 -> 그것을 customers라는 State의 변수 안에 넣어준다.  는 뜻
      .catch(err => console.log(err)) // 또한, 만약 오류가 발생할 경우 -> console창에 해당 오류 출력
 
  }

  callApi = async () => {     // callApi는 비동기적으로 수행할 수 있게 해줄 것.
    const response = await fetch('/api/customers'); // response , 접속하고자 하는 api의 주소 를 넣음
            // 테스트 이므로 -> localhost의 api에 접속을 함
    const body = await response.json();   // 코딩 목록이 json 형태로 출력 -> 그것을 body 안에 넣어줌
    return body;
    // 그걸 받아서 위에서 State로 설정 해줄 수 있도록 해주면 됨
  }

  progress = () => {  // 애니메이션을 위한 하나의 함수 생성
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1}); // completed 값이 100이 되는 순간 0으로 변하게 함
  } // 0~100 을 왔다갔다 하면서 계속 오르게 됨

  render() {
    const { classes } = this.props; // const로 위에서 정의한 style 적용하기 위해 아래의 <Paper>와<Table>에 className 붙임
    return (
      // Customer 불러와서  App 컴포넌트 안에서 출력
       //  이 Customer는 외부에 있는 파일 -> import 해줘야 함

       // 위의 customer 정보 3개 출력하기 위해,  <Customer 3번 써주면 됨
       /* <Customer
        id={customers[0].id}
        image={customers[0].image}
        name={customers[0].name}
        birthday={customers[0].birthday}
        gender={customers[0].gender}
        job={customers[0].job}
        />*/

        // 그러면 너무 길어짐 -> 반복문 사용 -> .map
        // Table로 출력하기 위해 <Table><TableBody> 붙여줌  ->  화면에 Table이 꽉 차게 출력됨
      <div>
        <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
          </TableHead>

        <TableBody>
        {
          //customers.map(c => {    //  위에서 값이 props에서 -> state로 변경되었기에 -> 값이 변경 가능 -> 차례로 출력해주기 위해 -> this.state로 변경
          // this.state.customers.map(c => {  // 그러나 이대로하면 에러 -> api에서 값을 받아와서 -> state에서 값을 갱신해줘야 하는데 -> (아무리 네트워크가 빨라도) 처음 서비스가 구동된 상태에서는 -> customers가 비어있음 = 내용 바꿔줘야함(있으면 실행되도록)=> ?:
          this.state.customers ? this.state.customers.map(c => {  // this.state.customers가 존재 할 경우 = true일 경우 -> 각 데이터를 출력
            return (
              <Customer
                key={c.id}//map을 사용하기 위해선 -> key값을 설정해 줘야함.
                // 없어도 작동하는데 -> 개발자도구에서 보면 -> 빨간 x로 Warning 떠있음
                // Each child in a list should have a unique "key" prop. -> key 써주면 해당 Warning 사라짐
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
                />
            )
          }) : //""  // 비어있을 경우 = false일 경우 -> ""로 아무것도 출력하지 않도록 설정.
          // 그럼 새로고침을 했을 때 -> 더이상 에러가 안나타남,  단지 아직 곡객의 데이터를 못 받아와서, 데이터 표시를 못함
          // 1. 그럼 개발자모드 -> Elements에서 오류 볼 수 있음 (여기선 Warning은 뜨는데 에러는 아님.)
          // 2. 개발자모드 -> Network에서 보면 -> customers 라는 api를 확인할 수 있음
          
          // 위의 "" 없에고, 대신 -> progress bar로 로딩 bar 출력해줌 -> table에서 progress bar 출력되게 설정
          // colSpan="6">  =>  6개의 열을 다 차지하도록 만듦
          // align="center"로 progress bar가 중간에 나타나도록 설정

          // 실제 progress bar 가 출력되게 하는 값 value={this.state.completed}/> // completed의 값이 0~100 까지 왔다갔다함.
          <TableRow>
            <TableCell colSpan="6" align="center">
              <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
            </TableCell>
          </TableRow>
        }
        </TableBody>
        </Table>
        </Paper>
      </div>
    );
  } 
}

                      // styles => 상단(21줄)의 const styles 적용한 것
export default  withStyles(styles)(App);
// 스타일 적용되면 -> 성공적으로 - 가로 스크롤바가 생긴것을 볼 수 있음