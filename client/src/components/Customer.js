import React from 'react'; // 1) react 사용 위해, react 라이브러리 import 함

// material로 테이블 생성 위해 import     core/에서 /TableRow 받아옴
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';   // 각 원소는 TableCell로 사용

// 3) Customer 클래스 정의
class Customer extends React.Component {    // 
    render() {  // render -> 항상 수행되는 내용, Customer라는 컴포넌트를 실제로 화면에 그림
        return (
            /*
            // 일단 <div>로 감싸고, 내용 안에 넣어줌
            <div>
                <CustomerProfile id={this.props.id} image={this.props.image} name={this.props.name}/>
                <CustomerInfo birthday={this.props.birthday} gender={this.props.gender} job={this.props.job}/>
            </div> // JSX 문법: 위와같이 요소 2개 이상일 경우 -> <div>로 감싸야한다. <div>없으면 에러
            */

            // TableRow = 한 줄
           // 테이블 생성, 셀 = 원소 넣기
           <TableRow>
               <TableCell>{this.props.id}</TableCell>
               <TableCell><img src={this.props.image} alt="profile"/></TableCell>
               <TableCell>{this.props.name}</TableCell>
               <TableCell>{this.props.birthday}</TableCell>
               <TableCell>{this.props.gender}</TableCell>
               <TableCell>{this.props.job}</TableCell>
           </TableRow>
        )
    }
}

/*
// 테이블 상태로 정보 출력할거기 때문에, 아래의 내용은 삭제(브라우저에 그냥 세로줄로 쭉 출력되었음)
class CustomerProfile extends React.Component {
    render() {
        return (
            <div>
                <img src={this.props.image} alt="profile"/>
                <h2>{this.props.name}({this.props.id})</h2>
            </div>
        )
    }
}

// 남은 정보 출력
class CustomerInfo extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.birthday}</p>
                <p>{this.props.gender}</p>
                <p>{this.props.job}</p>
            </div>
        )
    }
}
*/
export default Customer; // 2) Customer 클래스 내보내기;