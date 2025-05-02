import { db } from "../firebase.js";
import {
  doc,
  collection,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  addDoc,
  query,
  where,
} from "firebase/firestore";

export const addFeedback = async (req, res) => {
  try {
    const {
      puzzleType,
      collectionName,
      productId,
      userId,
      difficulty,
      materialQuality,
      solvingExperience,
      valueForMoney,
      comment,
      userName,
      userSurname,
      productName,
      productBrand,
    } = req.body;

    if (
      !userId ||
      !difficulty ||
      !materialQuality ||
      !solvingExperience ||
      !valueForMoney
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const feedbackRef = collection(
      db,
      "puzzles",
      puzzleType,
      collectionName,
      productId,
      "feedbacks"
    );

    await addDoc(feedbackRef, {
      userId,
      difficulty,
      materialQuality,
      solvingExperience,
      valueForMoney,
      userName,
      userSurname,
      comment,
      productName,
      productBrand,
      timestamp: new Date().toISOString(),
    });

    res.status(201).json({ message: "Feedback added successfully" });
  } catch (error) {
    console.error("Error adding feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFeedbacks = async (req, res) => {
  try {
    const { puzzleType, collectionName, productId } = req.params;

    const feedbackRef = collection(
      db,
      "puzzles",
      puzzleType,
      collectionName,
      productId,
      "feedbacks"
    );

    const feedbackSnapshot = await getDocs(feedbackRef);

    if (feedbackSnapshot.empty) {
      return res.status(204).json({ error: "No feedback found" });
    }

    const feedbacks = feedbackSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error getting feedbacks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAverageRating = async (req, res) => {
  try {
    const { puzzleType, collectionName, productId } = req.params;

    const feedbackRef = collection(
      db,
      "puzzles",
      puzzleType,
      collectionName,
      productId,
      "feedbacks"
    );

    const feedbackSnapshot = await getDocs(feedbackRef);

    if (feedbackSnapshot.empty) {
      return res.status(204).json({ error: "No feedback found" });
    }

    const feedbacks = feedbackSnapshot.docs.map((doc) => doc.data());

    const ratingKeys = [
      "rating",
      "difficulty",
      "materialQuality",
      "solvingExperience",
      "valueForMoney",
    ];

    const allRatings = feedbacks.flatMap((fb) =>
      ratingKeys.map((key) => fb[key]).filter((value) => value !== undefined)
    );

    const overallAverage = allRatings.length
      ? (
          allRatings.reduce((sum, val) => sum + val, 0) / allRatings.length
        ).toFixed(2)
      : null;

    res.status(200).json({ averageRating: overallAverage });
  } catch (error) {
    console.error("Error calculating overall average rating:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserFeedbacks = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const feedbackRef = collection(db, "puzzles");
    const feedbackSnapshot = await getDocs(feedbackRef);

    let userFeedbacks = [];

    for (const puzzleDoc of feedbackSnapshot.docs) {
      const puzzleType = puzzleDoc.id;
      const subCollections = [
        "2x2",
        "3x3",
        "4x4",
        "5x5",
        "6x6",
        "7x7",
        "500",
        "1000",
        "2000",
        "3000",
        "5000",
        "Metal",
        "Plastic",
        "Lemn",
      ];

      for (const subCollectionName of subCollections) {
        const productsRef = collection(
          db,
          "puzzles",
          puzzleType,
          subCollectionName
        );
        const productsSnapshot = await getDocs(productsRef);

        for (const productDoc of productsSnapshot.docs) {
          const feedbackCollectionRef = collection(
            db,
            "puzzles",
            puzzleType,
            subCollectionName,
            productDoc.id,
            "feedbacks"
          );
          const feedbackQuery = query(
            feedbackCollectionRef,
            where("userId", "==", userId)
          );
          const userFeedbackSnapshot = await getDocs(feedbackQuery);

          userFeedbackSnapshot.docs.forEach((doc) => {
            userFeedbacks.push({
              puzzleType,
              collection: subCollectionName,
              productId: productDoc.id,
              feedbackId: doc.id,
              ...doc.data(),
            });
          });
        }
      }
    }

    res.status(200).json(userFeedbacks);
  } catch (error) {
    console.error("Error retrieving user feedbacks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const checkFeedbackExists = async (req, res) => {
  try {
    const { userId, productId, puzzleType, subCollectionName } = req.params;

    if (!userId || !productId || !puzzleType || !subCollectionName) {
      return res.status(400).json({
        error:
          "Client ID, Product ID, Puzzle Type, and SubCollection Name are required",
      });
    }

    const feedbackCollectionRef = collection(
      db,
      "puzzles",
      puzzleType,
      subCollectionName,
      productId,
      "feedbacks"
    );

    const feedbackQuery = query(
      feedbackCollectionRef,
      where("userId", "==", userId)
    );
    const feedbackSnapshot = await getDocs(feedbackQuery);

    const feedbackFound = !feedbackSnapshot.empty;

    res.status(200).json({ exists: feedbackFound });
  } catch (error) {
    console.error("Error checking feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const { puzzleType, collectionName, productId, feedbackId } = req.params;

    const feedbackDocRef = doc(
      db,
      "puzzles",
      puzzleType,
      collectionName,
      productId,
      "feedbacks",
      feedbackId
    );

    await deleteDoc(feedbackDocRef);
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
