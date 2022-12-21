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

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      redirectToTheHomePage: false,
      error: false,
    }
  }

 async register(ev) {
    ev.preventDefault();
    try {
      
      const res= await axios.post('http://localhost:3030/user/signup', {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      })
      return res.data
    } catch (error) {
      console.log(error);
    }
      // .then(() => {
      //   this.context.checkAuth()
      //     .then(() => this.setState({error:false,redirectToTheHomePage:true}));
      // })
      // .catch(error => {
      //   this.setState({error:error.response.data});
      // });
  }
  render() {
    return (<>
      <Helmet>
        <title>StackOverflowLite - register</title>
      </Helmet>
      {this.state.redirectToTheHomePage && (
        <Navigate to={'/'} />
      )}
      <Container>
        <Header1 style={{marginBottom:'20px'}}>Register</Header1>
        {this.state.error && (
          <ErrorBox>{this.state.error}</ErrorBox>
        )}
        <form onSubmit={ev => this.register(ev)}>
          <Input placeholder={'email'} type="email" value={this.state.email}
                 onChange={ev => this.setState({email:ev.target.value})} />
          <Input placeholder={'your username'} type="text" value={this.state.username}
                 onChange={ev => this.setState({username:ev.target.value})} />
          <Input placeholder={'password'} type="password" value={this.state.password}
                 autocomplete={'new-password'}
                 onChange={ev => this.setState({password:ev.target.value})} />
          <BlueButton type={'submit'}>Register</BlueButton>
        </form>
      </Container>
    </>);
  }

}

RegisterPage.contextType = UserContext;

export default RegisterPage;