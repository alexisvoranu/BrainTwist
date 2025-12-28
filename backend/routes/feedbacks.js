import express from "express";
import * as feedbackController from "../controllers/feedbacks.js";

export const router = express.Router();

router.get("/getFeedbacks/:puzzleType/:collectionName/:productId", feedbackController.getFeedbacks);

router.get("/getAverageRating/:puzzleType/:collectionName/:productId", feedbackController.getAverageRating);

router.get("/getUserFeedbacks/:userId", feedbackController.getUserFeedbacks);

router.get("/checkFeedbackExists/:userId/:productId/:puzzleType/:subCollectionName", feedbackController.checkFeedbackExists);

router.post("/addFeedback", feedbackController.addFeedback);

router.delete("/deleteFeedback/:puzzleType/:collectionName/:productId/:feedbackId", feedbackController.deleteFeedback);

