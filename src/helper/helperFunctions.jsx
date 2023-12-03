/** @format */
import { updateData } from "../googleSingIn/firebaseService";

// Swap data between two lists
export const swapListData = (swapEl) => {
  try {
    let tempListId = swapEl[0].listId;
    let tempTitle = swapEl[0].title;
    swapEl[0].title = swapEl[1].title;
    swapEl[0].listId = swapEl[1].listId;
    swapEl[1].title = tempTitle;
    swapEl[1].listId = tempListId;
    return swapEl;
  } catch (error) {
    console.error("Error swapping list data:", error);
    throw error;
  }
};

// Swap data between two cards
export const swapCardData = (swapEl) => {
  try {
    let tempCardId = swapEl[0].cardId;
    let tempTitle = swapEl[0].title;
    let tempListId = swapEl[0].listId;
    swapEl[0].title = swapEl[1].title;
    swapEl[0].cardId = swapEl[1].cardId;
    swapEl[0].listId = swapEl[1].listId;
    swapEl[1].title = tempTitle;
    swapEl[1].cardId = tempCardId;
    swapEl[1].listId = tempListId;
    return swapEl;
  } catch (error) {
    console.error("Error swapping card data:", error);
    throw error;
  }
};

// Reduce the position of subsequent cards
export const reducePositionOfSubsequentCard = async (
  dataList,
  deletedDataPosition
) => {
  try {
    if (dataList[deletedDataPosition]) {
      const subsequentData = dataList.slice(deletedDataPosition);
      // Iterate through subsequent cards and update their positions
      subsequentData.forEach(async (data) => {
        const id = data.cardId;
        const newPosition = data.position - 1;
        await updateData("card", id, { position: newPosition });
      });
    }
  } catch (error) {
    console.error("Error reducing position of subsequent cards:", error);
    throw error;
  }
};

// Reduce the position of subsequent lists
export const reducePositionOfSubsequentList = async (
  dataList,
  deletedDataPosition
) => {
  try {
    if (dataList[deletedDataPosition]) {
      const subsequentData = dataList.slice(deletedDataPosition);
      // Iterate through subsequent lists and update their positions
      subsequentData.forEach(async (data) => {
        const id = data.listId;
        const newPosition = data.position - 1;
        await updateData("list", id, { position: newPosition });
      });
    }
  } catch (error) {
    console.error("Error reducing position of subsequent lists:", error);
    throw error;
  }
};
