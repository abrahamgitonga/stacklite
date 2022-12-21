import Header1 from "../Header/Header1";
import styled from "styled-components";
import axios from "axios";
import {useEffect, useState, useContext} from 'react';
import {Link, Navigate} from 'react-router-dom';
import Header2 from "../Header/Header2";
import BlueButtonLink from "../Button/BlueButtonLink";
import UserContext from "../User/UserContext";
import BlueButton from "../Button/BlueButton";
import {Helmet} from "react-helmet";

const Container = styled.div`
  padding: 30px 20px;
  display: grid;
  grid-template-columns: 1fr 200px;
`;
const Buttons = styled.div`
  text-align:right;
`;
const PostRow = styled(Link)`
  background-color: rgba(255,255,255,.05);
  padding: 15px 15px 10px;
  display: grid;
  grid-template-columns: 30px 1fr;
  column-gap: 20px;
  border-top: 1px solid #555;
  text-decoration: none;
`;
const PostPoints = styled.div`
  color: #bbb;
  font-size: 2rem;
  text-align: right;
`;

function UserPage({match}) {

  const [userInfo,setUserInfo] = useState(null);
  const [votesInfo,setVotesInfo] = useState(null);
  const [votesTotal,setVotesTotal] = useState(0);
  const {user,checkAuth} = useContext(UserContext);
  const [navigateToTheHomePage, setNavigateToTheHomePage] = useState(false);

  function logout() {
    axios.post('http://localhost:3030/user/logout', {}, {withCredentials: true})
      .then(() => {
        checkAuth().catch(() => setNavigateToTheHomePage(true));
      });
  }
  useEffect(() => {
    function getUserInfo() {
      axios.get('http://localhost:3030/users/'+match.params.id)
        .then(response => {
          setUserInfo(response.data.user);
          setVotesInfo(response.data.votesInfo);
          let total = 0;
          response.data.votesInfo.forEach(voteRow => {
            total+= voteRow.votes_sum;
          });
          setVotesTotal(total);
        });
    }
    getUserInfo();
  }, [match.params.id]);

  if (navigateToTheHomePage) {
    return (<Navigate to={'/'} />);
  }

  return (
    <main>
      {!!userInfo && (
        <Helmet>
          <title>User: {userInfo.name} - StackOverflowLite</title>
        </Helmet>
      )}
      <Container>
        <div>
          <Header1>{userInfo && userInfo.name}</Header1>
          <Header2>Total points: {votesTotal}</Header2>
        </div>
        <Buttons>
          {!!userInfo && !!user && parseInt(match.params.id) === user.id && (
            <>
              <BlueButtonLink to={'/profile'} style={{marginBottom:'10px'}}>Edit profile</BlueButtonLink>
              <br />
              <BlueButton onClick={() => logout()}>Logout</BlueButton>
            </>
          )}
        </Buttons>
      </Container>
      <ul>
        {votesInfo && votesInfo.map(voteInfoRow => (
          <PostRow to={'/questions/'+(voteInfoRow.parent_id || voteInfoRow.id)}>
            <PostPoints>{voteInfoRow.votes_sum}</PostPoints>
            <div>{voteInfoRow.title || voteInfoRow.content}</div>
          </PostRow>
        ))}
      </ul>
    </main>
  );
}

export default UserPage;