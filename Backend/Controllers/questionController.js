const { exec } = require("../Helpers/databaseHelper");
const { v4: uuidv4 } = require("uuid");

const getAllQuestions = async (req, res) => {
  try {
    const questions = await exec("allQuestions");
    if (questions.length !== 0) {
      return res.status(200).json({ questions });
    } else {
      return res
        .status(200)
        .json({ message: "No questions found", questions });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getUserQuestions = async (req, res) => {
  let { user_id } = req.params;
  console.log(req.info);
  try {
    const questions = await exec("allQuestions", { user_id });
    if (questions.length > 0) {
      res.status(200).json({ questions });
    } else {
      res
        .status(200)
        .json({ message: "You haven't created any questions yet" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getQuestion = async (req, res) => {
  const { id } = req.params;

  let question = await exec("oneQuestion", { id });

  if (question.length === 0) {
    return res
      .status(400)
      .json({ message: "The question does not exist. Check the question id" });
  }
  const answers = await exec("getQuestionAnswers", { id });

  const anc = await Promise.all(
    answers.map(async (answer) => {
      let id = answer.id;
      let comments = await exec("answerComments", { id });
      let data = { ...answer, comments };
      return data;
    })
  );

  const data = { ...question[0], answers: anc };

  res.status(200).json({ question: data });
};

const postQuestion = async (req, res) => {
  console.log("que");
  const question = req.body;
  const question_id = uuidv4();
  const { id } = req.info;

  await exec("add_UpdateQuestion", {
    ...question,
    id: question_id,
    user_id: id,
  });
  res.status(201).json({ message: `You have added the question ${id}` });
};

const updateQuestion = async (req, res) => {
  let { id } = req.params;
  console.log(req.info);
  try {
    let questionDb = await exec("oneQuestion", { id });

    if (questionDb.length >= 1) {
      let { id } = req.params;
      const question = req.body;
      const user = req.info;

      await exec("add_UpdateQuestion", {
        id,
        ...question,
        user_id: user.id,
      });
      return res
        .status(200)
        .json({ message: "You have successfully updated the question" });
    } else {
      return res.status(400).json({
        message: "The question does not exist. Check the question id",
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  let question = await exec("oneQuestion", { id });
  if (question.length >= 1) {
    try {
      await exec("deleteQuestion", { id });
      res
        .status(200)
        .json({ message: "You have succesfully deleted the question" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(400).json({
      message: "The question does not exist. Check the question id",
    });
  }
};

//answer endpoints

//POST ANSWERS

const postAnswer = async (req, res) => {
  const { question_id, answer } = req.body;
  const { id } = req.info;
  const ans_id = uuidv4();
  try {
    let question = await exec("oneQuestion", { id: question_id });
    if (question.length > 0) {
      await exec("addAnswer", {
        id: ans_id,
        user_id: id,
        question_id,
        answer,
      });
      return res.status(200).json({ message: "Thank for adding a answer" });
    } else {
      return res.status(400).json({
        message:
          "You cannot add answer to a question that does not exist.Check the question id",
      });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// set answer as preferred
const markedAnswer = async (req, res) => {
  const { id } = req.body;
  const ans = await exec("getAnswer", { id });
  if (ans.length > 0) {
    try {
      await exec("markedAnswer", { id });
      res
        .status(200)
        .json({ message: "You have set this answer as preferred answer" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json({ message: "The entered id is incorect" });
  }
};

const unmarkedAnswer = async (req, res) => {
  const { id } = req.body;
  const ans = await exec("getAnswer", { id });
  if (ans.length > 0) {
    try {
      await exec("unmarkedAnswer", { id });
      res
        .status(200)
        .json({ message: "This answer is no longer the preffered answer" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json({ message: "The entered id is incorect" });
  }
};

const deleteAnswer = async (req, res) => {
  const { id } = req.paams;
  const ans = await exec("getAnswer", { id });
  if (ans.length > 0) {
    try {
      await exec("deleteAnswer", { id });
      res
        .status(200)
        .json({ message: "You have successfully deleted the answer" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json({ message: "The entered id is incorect" });
  }
};

const addComment = async (req, res) => {
  const { answer_id, comment } = req.body;
  const { id } = req.info;
  const comment_id = uuidv4();

  const ans = await exec("getAnswer", { id: answer_id });
  console.log(ans);
  if (ans.length !== 0) {
    try {
      await exec("addComment", {
        id: comment_id,
        user_id: id,
        answer_id,
        comment,
      });
      res.status(200).json({ message: "You have added a comment" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    res
      .status(400)
      .json({ message: `The entered answer id is incorect ${ans}` });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;

  const comment = await exec("getComment", { id });
  if (comment.length > 0) {
    try {
      await exec("deleteComment", { id });
      res
        .status(200)
        .json({ message: "You have succesfully deleted the comment" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    res
      .status(400)
      .json({ message: "The id is incorrect or the comment does not exist" });
  }
};

const likeVote = async (req, res) => {
  const { answer_id } = req.body;

  try {
    const votes = await exec("getAllVotes", { answer_id });
    let vote_value = votes.length > 0 ? votes[0].votes : 0;

    let new_value = +vote_value + 1;
    console.log(new_value);
    await exec("add_UpdateVotes", { answer_id, votes: new_value });
    res
      .status(200)
      .json({ message: "You have succesfully upvoted the answer" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const unlikeVote = async (req, res) => {
  const { answer_id } = req.body;

  try {
    const votes = await exec("getAllVotes", { answer_id });

    let vote_value = votes.length > 0 ? votes[0].votes : 0;

    let new_value = +vote_value - 1;
    console.log(new_value);
    await exec("add_UpdateVotes", { answer_id, votes: new_value });
    res
      .status(200)
      .json({ message: "You have succesfully downvoted the answer" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getQuestionWithMostAnswers = async (req, res) => {
  try {
    let questions = await exec("allQuestions");
    if (questions.length > 1) {
      questions = questions.sort((x, y) => {
        return +y.answers - +x.answers;
      });
      let topQuestion = questions[0];
      return res.status(200).json(topQuestion);
    } else {
      return res
        .status(200)
        .json({ message: "There are no questions found", questions });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


module.exports = {
  getAllQuestions,
  getUserQuestions,
  getQuestion,
  postQuestion,
  updateQuestion,
  deleteQuestion,
  postAnswer,
  markedAnswer,
  unmarkedAnswer,
  deleteAnswer,
  addComment,
  deleteComment,
  likeVote,
  unlikeVote,
  getQuestionWithMostAnswers,
  
};