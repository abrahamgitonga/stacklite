import styled from 'styled-components';
import Header1 from "../Header/Header1";
import BlueButton from "../Button/BlueButton";
import Input from '../Common/Input';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Navigate} from "react-router-dom";
import ReactTags from 'react-tag-autocomplete';
import PostBodyTextarea from "../Common/PostBodyTextarea";

const Container = styled.div`
  padding: 30px 20px;
  border: 1px solid gray;
  max-width: 800px;
  min-height: 400px;
  box-sizing: border-box;
  box-shadow: 4px 2px 16px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  margin:  25px auto 25px auto;
`;

export default function AskPage() {

  const reactTags = React.createRef();

  const [questionTitle,setQuestionTitle] = useState('');
  const [questionBody, setQuestionBody] = useState('');
  const [navigate, setNavigate] = useState('');
  const [tags,setTags] = useState([]);
  const [tagSuggestions,setTagSuggestions] = useState([]);

  function sendQuestion(ev) {
    ev.preventDefault();
    axios.post('http://localhost:3030/questions/', {
      title: questionTitle,         
      content: questionBody,
      tags: tags.map(tag => tag.id), 
    }, {withCredentials:true})
      .then(response => {
        console.log(response.data);
        setNavigate('/questions/'+response.data[0]);
      });
  }

  function getTags() {
    axios.get('http://localhost:3030/tags/')
      .then(response => {
        setTagSuggestions(response.data);
      })
  }

  function onTagAddition(tag) {
    const chosenTags = tags;
    chosenTags.push(tag);
    setTags(chosenTags);
  }

  function onTagDelete(indexToDelete) {
    const newTags = [];
    for (let i=0; i<tags.length; i++) {
      if (i !== indexToDelete) {
        newTags.push(tags[i]);
      }
    }
    setTags(newTags);
  }

  useEffect(() => {
    getTags();
  }, []);

  return (
    <Container>
      {navigate && (
        <Navigate to={navigate}/>
      )}
      <Header1 style={{marginBottom:'20px'}}>Ask a public question</Header1>
      <form onSubmit={ev => sendQuestion(ev)}>
        <Input type="text"
               value={questionTitle}
               onChange={e => setQuestionTitle(e.target.value)}
               placeholder="Title of your question" />
        <PostBodyTextarea
          placeholder={"More info about your question. You can use markdown here"}
          value={questionBody}
          handlePostBodyChange={value => setQuestionBody(value)} />
        <ReactTags
          ref={reactTags}
          tags={tags}
          suggestions={tagSuggestions}
          onDelete={ev => onTagDelete(ev)}
          onAddition={ev => onTagAddition(ev)} />
        <BlueButton type={'submit'}>Post question</BlueButton>
      </form>
    </Container>
  );

}