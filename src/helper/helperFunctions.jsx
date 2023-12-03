/** @format */
import { updateData } from "../googleSingIn/firebaseService";

export const swapListData = (swapEl) => {
  let tempListId = swapEl[0].listId;
  let tempTitle = swapEl[0].title;
  swapEl[0].title = swapEl[1].title;
  swapEl[0].listId = swapEl[1].listId;
  swapEl[1].title = tempTitle;
  swapEl[1].listId = tempListId;
  return swapEl;
};

export const swapCardData = (swapEl) => {
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
};

export const reducePositionOfSubsequentCard = async (
  dataList,
  deletedDataPosition
) => {
  if (dataList[deletedDataPosition]) {
    const subsequentData = dataList.slice(deletedDataPosition);
    subsequentData.forEach(async (data) => {
      const id = data.cardId;
      const newPosition = data.position - 1;
      await updateData("card", id, { position: newPosition });
    });
  }
  return;
};

export const reducePositionOfSubsequentList = async (
  dataList,
  deletedDataPosition
) => {
  if (dataList[deletedDataPosition]) {
    const subsequentData = dataList.slice(deletedDataPosition);
    subsequentData.forEach(async (data) => {
      const id = data.listId;
      const newPosition = data.position - 1;
      await updateData("list", id, { position: newPosition });
    });
  }
  return;
};
