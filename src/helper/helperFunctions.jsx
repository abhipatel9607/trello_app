/** @format */

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
