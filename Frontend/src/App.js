import {useState, useEffect} from 'react';
import { Reset } from 'styled-reset';
import Header from "./Components/Header/Header";
import QuestionsPage from "./Components/Question/QuestionsPage";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import AskPage from "./Components/Question/AskPage";
import GlobalStyles from "./Components/Common/GlobalStyles";
import UserContext from "./Components/User/UserContext";
import LoginPage from "./Components/User/LoginPage";
import axios from "axios";
import RegisterPage from "./Components/User/RegisterPage";
import ProfilePage from "./Components/User/ProfilePage";
import QuestionPage from "./Components/Question/QuestionPage";
import TagPage from "./Components/Tag/TagPage";
import UserPage from "./Components/User/UserPage";

function App() {
  const [user,setUser] = useState(null);

  function checkAuth() {
    return new Promise(((resolve, reject) => {
      axios.get('http://localhost:3030/users/profile', {withCredentials:true})
        .then(response => {
          setUser({
            email:response.data.email,
            name: response.data.name,
            id: response.data.id,
          });
          resolve(response.data);
        })
        .catch(() => {
          setUser(null);
          reject(null);
        });
    }));

  }

  function editUser(userProps) {
    let newUserInfo = user;
    for (let key in userProps) {
      newUserInfo[key] = userProps[key];
      console.log(key, userProps[key], newUserInfo);
    }
    setUser(newUserInfo);
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div>
      <Reset />
      <GlobalStyles />
      <Router>
        <UserContext.Provider value={{user, checkAuth, editUser}}>
          <Header />
          <Routes>
            <Route path="/ask" element={<AskPage/>} />
            <Route path="/profile" element={<ProfilePage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/questions/:id" element={<QuestionPage/>} />
            <Route path="/tag/:name" element={<TagPage/>} />
            <Route path="/users/:id" element={<UserPage/>} />
            <Route path="/" element={<QuestionsPage/>} />
          </Routes>
        </UserContext.Provider>
      </Router>

    </div>
  );
}

export default App;
