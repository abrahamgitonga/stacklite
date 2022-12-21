const express = require("express");
const { verifyToken } = require("../Middleware/verifyToken");
const router = express.Router();

const {
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
  getQuestionWithMostAnswers

} = require("../Controllers/questionController");

const validateQuestion = require("../Middleware/Questions/question");
const validateAnswer = require("../Middleware/Questions/answer");
const validateComment = require("../Middleware/Questions/comments");



router.get("/", verifyToken,  getAllQuestions);
router.get("/author/:user_id", verifyToken, getUserQuestions);
router.get("/:id",verifyToken, getQuestion);

router.post("/",verifyToken, validateQuestion, postQuestion);
router.put("/:id",verifyToken, validateQuestion, updateQuestion);
router.delete("/:id", verifyToken, deleteQuestion);

router.post("/answer/add", verifyToken, validateAnswer, postAnswer);
router.put("/answer/preffered", verifyToken, markedAnswer);
router.put("/answer/unprefer", verifyToken, unmarkedAnswer);
router.delete("/answer/:id", deleteAnswer)

router.post("/answer/comment",verifyToken, validateComment, addComment)
router.delete("/comment/:id", verifyToken, deleteComment)

router.post("/answer/upvote", verifyToken, likeVote)
router.post("/answer/downvote", verifyToken, unlikeVote)

router.get("/ordered/top", verifyToken, getQuestionWithMostAnswers)

module.exports = router;