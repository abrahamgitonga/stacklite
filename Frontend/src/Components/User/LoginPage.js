import {Component} from 'react';
import Header1 from "../Header/Header1";
import styled from "styled-components";
import Input from "../Common/Input";
import BlueButton from "../Button/BlueButton";
import axios from 'axios';
import UserContext from "../User/UserContext";
import {Navigate} from 'react-router-dom';
import ErrorBox from "../Common/ErrorBox";
import {Helmet} from "react-helmet";

const Container = styled.div`
padding: 25px;
//border: 1px solid red;
max-width: 400px;
min-height: 400px;
box-sizing: border-box;
box-shadow: 4px 2px 16px rgba(0, 0, 0, 0.4);
border-radius: 10px;
margin:  20px auto 0 auto;
`;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirectToHomePage: false,
      error: false,
    }
  }
  
  async login(ev) {
    ev.preventDefault();
    try {
      const res = await axios.post('http://localhost:3030/user/login', {
        email: this.state.email,
        password: this.state.password
      })
      localStorage.setItem("token", res.data.token)
      return res.data
    } catch (error) {
      console.log(error)
      
    }
 
 
  }

  render() {
    return (<>
      <Helmet>
        <title>StackOverflowLite - login</title>
      </Helmet>
      {this.state.redirectToHomePage && (
        <Navigate to={'/'} />
      )}
      <Container>
        <Header1 style={{marginBottom:'20px'}}>Login</Header1>
        {this.state.error && (
          <ErrorBox>Login failed</ErrorBox>
        )}
        <form onSubmit={ev => this.login(ev)}>
          <Input placeholder={'email'} type="email" value={this.state.email}
                 onChange={ev => this.setState({email:ev.target.value})} />
          <Input placeholder={'password'} type="password" value={this.state.password}
                 onChange={ev => this.setState({password:ev.target.value})} />
          <BlueButton type={'submit'}>Login</BlueButton>
        </form>
      </Container>
    </>);
  }

}

LoginPage.contextType = UserContext;

export default LoginPage;