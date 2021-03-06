  import { createReducer } from 'reduxsauce'
// Import Actions
import Types from '../actions/types'

// Initial State
const initialState = {
  activists: [],
  myPages: { pages: [], lastKey: undefined }
}

// Handlers

export const resetActivists = (state = initialState) => {
  return { ...state, activists: [] }
}

export const resetMyPages = (state = initialState) => {
  return { ...state, myPages: { pages: [], lastKey: null } }
}

export const fetchActivistsSucceeded = (state = initialState, action) => {
  return { ...state, activists: [ ...state.activists, ...action.activists.Items ], lastKey: action.activists.LastEvaluatedKey }
}

export const fetchActivistsFailed = (state = initialState, action) => {
  return { ...state, err: action.err }
}

// Get My Pages
export const getMyPagesRequested = (state = initialState, action) => {
  return { ...state, state: 'GETTING_MYPAGES' }
}

export const getMyPagesSucceeded = (state = initialState, action) => {
  let myPages = state.myPages
  myPages.pages = myPages.pages.concat(action.result.Items)
  myPages.lastKey = action.result.LastEvaluatedKey
  return { ...state, state: 'GET_MYPAGES_SUCCEEDED', myPages, result: action.result }
}

export const getMyPagesFailed = (state = initialState, action) => {
  return { ...state, state: 'GET_MYPAGES_FAILED', err: action.err }
}

// Get Activism Page
export const getActivismPageRequested = (state = initialState, action) => {
  return { ...state, state: 'GETTING_ACTIVISM_PAGE', pageId: action.pageId }
}

export const getActivismPageSucceeded = (state = initialState, action) => {
  return { ...state, state: 'GET_ACTIVISM_PAGE_SUCCEEDED', activismPage: action.result }
}

export const getActivismPageFailed = (state = initialState, action) => {
  return { ...state, state: 'GET_ACTIVISM_PAGE_FAILED', err: action.err }
}

// Create Activism Page
export const createActivismPageRequested = (state = initialState, action) => {
  return { ...state, state: 'CREATING_ACTIVISM_PAGE' }
}

export const createActivismPageSucceeded = (state = initialState, action) => {
  return { ...state, state: 'CREATE_ACTIVISM_PAGE_SUCCEEDED', result: action.result }
}

export const createActivismPageFailed = (state = initialState, action) => {
  return { ...state, state: 'CREATE_ACTIVISM_PAGE_FAILED', err: action.err }
}

// Update Activism Page
export const updateActivismPageRequested = (state = initialState, action) => {
  return { ...state, state: 'UPDATING_ACTIVISM_PAGE' }
}

export const updateActivismPageSucceeded = (state = initialState, action) => {
  let page = Object.assign({}, state.activismPage, action.result ? action.result.updates : {})

  return { ...state, state: 'UPDATE_ACTIVISM_PAGE_SUCCEEDED', activismPage: page, result: action.result }
}

export const updateActivismPageFailed = (state = initialState, action) => {
  return { ...state, state: 'UPDATE_ACTIVISM_PAGE_FAILED', err: action.err }
}

// Delete Activism Page
export const deleteActivismPageRequested = (state = initialState, action) => {
  return { ...state, state: 'DELETING_ACTIVISM_PAGE' }
}

export const deleteActivismPageSucceeded = (state = initialState, action) => {
  return { ...state, state: 'DELETE_ACTIVISM_PAGE_SUCCEEDED', result: action.result }
}

export const deleteActivismPageFailed = (state = initialState, action) => {
  return { ...state, state: 'DELETE_ACTIVISM_PAGE_FAILED', err: action.err }
}

// Add User Email to Activism Page
export const addUserEmailToActivismPageRequested = (state = initialState, action) => {
  return { ...state, state: 'ADDING_USER_EMAIL_TO_ACTIVISM_PAGE' }
}

export const addUserEmailToActivismPageSucceeded = (state = initialState, action) => {
  return { ...state, state: 'ADD_USER_EMAIL_TO_ACTIVISM_PAGE_SUCCEEDED', result: action.result }
}

export const addUserEmailToActivismPageFailed = (state = initialState, action) => {
  return { ...state, state: 'ADD_USER_EMAIL_TO_ACTIVISM_PAGE_FAILED', err: action.err }
}

// Upvote Activism Page
export const upvoteActivismPageRequested = (state = initialState, action) => {
  return { ...state, state: 'UPVOTING_ACTIVISM_PAGE' }
}

export const upvoteActivismPageSucceeded = (state = initialState, action) => {
  let activismPage = state.activismPage
  activismPage.upvotes = action.result.updates.upvotes
  if (action.result.updates.downvotes !== undefined) activismPage.downvotes = action.result.updates.downvotes
  return { ...state, state: 'UPVOTE_ACTIVISM_PAGE_SUCCEEDED', activismPage, result: action.result }
}

export const upvoteActivismPageFailed = (state = initialState, action) => {
  return { ...state, state: 'UPVOTE_ACTIVISM_PAGE_FAILED', err: action.err }
}

// Downvote Activism Page
export const downvoteActivismPageRequested = (state = initialState, action) => {
  return { ...state, state: 'DOWNVOTING_ACTIVISM_PAGE' }
}

export const downvoteActivismPageSucceeded = (state = initialState, action) => {
  let activismPage = state.activismPage
  if (action.result.updates.upvotes !== undefined) activismPage.upvotes = action.result.updates.upvotes
  activismPage.downvotes = action.result.updates.downvotes
  return { ...state, state: 'DOWNVOTE_ACTIVISM_PAGE_SUCCEEDED', activismPage, result: action.result }
}

export const downvoteActivismPageFailed = (state = initialState, action) => {
  return { ...state, state: 'DOWNVOTE_ACTIVISM_PAGE_FAILED', err: action.err }
}

// Flag Activism Page
export const flagActivismPageRequested = (state = initialState, action) => {
  return { ...state, state: 'FLAGGING_ACTIVISM_PAGE' }
}

export const flagActivismPageSucceeded = (state = initialState, action) => {
  let activismPage = state.activismPage
  activismPage.flags = action.result.updates.flags
  return { ...state, state: 'FLAG_ACTIVISM_PAGE_SUCCEEDED', activismPage, result: action.result }
}

export const flagActivismPageFailed = (state = initialState, action) => {
  return { ...state, state: 'FLAG_ACTIVISM_PAGE_FAILED', err: action.err }
}

// Follow Activism Page
export const followActivismPageRequested = (state = initialState, action) => {
  return { ...state, state: 'FOLLOWING_ACTIVISM_PAGE' }
}

export const followActivismPageSucceeded = (state = initialState, action) => {
  let activismPage = state.activismPage
  activismPage.followers = action.result.followers
  return { ...state, state: 'FOLLOW_ACTIVISM_PAGE_SUCCEEDED', activismPage, result: action.result }
}

export const followActivismPageFailed = (state = initialState, action) => {
  return { ...state, state: 'FOLLOW_ACTIVISM_PAGE_FAILED', err: action.err }
}

// Get Comments of Activism Page
export const getActivismPageCommentsRequested = (state = initialState, action) => {
  return { ...state, state: 'GETTING_ACTIVISM_PAGE_COMMENTS' }
}

export const getActivismPageCommentsSucceeded = (state = initialState, action) => {
  return { ...state, state: 'GET_ACTIVISM_PAGE_COMMENTS_SUCCEEDED', comments: action.result }
}

export const getActivismPageCommentsFailed = (state = initialState, action) => {
  return { ...state, state: 'GET_ACTIVISM_PAGE_COMMENTS_FAILED', err: action.err }
}

// Add comment to Activism Page
export const addCommentToActivismPageRequested = (state = initialState, action) => {
  return { ...state, state: 'ADDING_COMMENT_TO_ACTIVISM_PAGE' }
}

export const addCommentToActivismPageSucceeded = (state = initialState, action) => {
  let comments = state.comments
  comments.Items.unshift(action.result.comment)

  return { ...state, state: 'ADD_COMMENT_TO_ACTIVISM_PAGE_SUCCEEDED', comments, result: action.result }
}

export const addCommentToActivismPageFailed = (state = initialState, action) => {
  return { ...state, state: 'ADD_COMMENT_TO_ACTIVISM_PAGE_FAILED', err: action.err }
}

// Update Comment
export const updateCommentRequested = (state = initialState, action) => {
  return { ...state, state: 'UPDATING_COMMENT' }
}

export const updateCommentSucceeded = (state = initialState, action) => {
  let comments = state.comments
  let comment = comments.Items.find(e => e.commentid === action.result.comment)
  comment.text = action.result.updates.text

  return { ...state, state: 'UPDATE_COMMENT_SUCCEEDED', comments, result: action.result }
}

export const updateCommentFailed = (state = initialState, action) => {
  return { ...state, state: 'UPDATE_COMMENT_FAILED', err: action.err }
}

// Delete Comment
export const deleteCommentRequested = (state = initialState, action) => {
  return { ...state, state: 'DELETING_COMMENT' }
}

export const deleteCommentSucceeded = (state = initialState, action) => {
  let comments = state.comments
  let index = comments.Items.findIndex(e => e.commentid === action.result.comment.commentid)
  comments.Items.splice(index, 1)

  return { ...state, state: 'DELETE_COMMENT_SUCCEEDED', comments, result: action.result }
}

export const deleteCommentFailed = (state = initialState, action) => {
  return { ...state, state: 'DELETE_COMMENT_FAILED', err: action.err }
}

// Upvote Comment
export const upvoteCommentRequested = (state = initialState, action) => {
  return { ...state, state: 'UPVOTING_COMMENT', commentId: action.commentId }
}

export const upvoteCommentSucceeded = (state = initialState, action) => {
  let comments = state.comments
  let comment = comments.Items.find(e => e.commentid === action.result.commentid)
  comment.upvotes = action.result.updates.upvotes
  if (action.result.updates.downvotes !== undefined) comment.downvotes = action.result.updates.downvotes
  return { ...state, state: 'UPVOTE_COMMENT_REQUESTED', comments, result: action.result }
}

export const upvoteCommentFailed = (state = initialState, action) => {
  return { ...state, state: 'UPVOTE_COMMENT_FAILED', err: action.err }
}

// Downvote Comment
export const downvoteCommentRequested = (state = initialState, action) => {
  return { ...state, state: 'DOWNVOTING_COMMENT', commentId: action.commentId }
}

export const downvoteCommentSucceeded = (state = initialState, action) => {
  let comments = state.comments
  let comment = comments.Items.find(e => e.commentid === action.result.commentid)
  if (action.result.updates.upvotes !== undefined) comment.upvotes = action.result.updates.upvotes
  comment.downvotes = action.result.updates.downvotes
  return { ...state, state: 'DOWNVOTE_COMMENT_REQUESTED', comments, result: action.result }
}

export const downvoteCommentFailed = (state = initialState, action) => {
  return { ...state, state: 'DOWNVOTE_COMMENT_FAILED', err: action.err }
}

// flag Comment
export const flagCommentRequested = (state = initialState, action) => {
  return { ...state, state: 'FLAGGING_COMMENT', commentId: action.commentId }
}

export const flagCommentSucceeded = (state = initialState, action) => {
  let comments = state.comments
  let comment = comments.Items.find(e => e.commentid === action.result.commentid)
  comment.flags = action.result.updates.flags
  return { ...state, state: 'FLAG_COMMENT_REQUESTED', comments, result: action.result }
}

export const flagCommentFailed = (state = initialState, action) => {
  return { ...state, state: 'FLAG_COMMENT_FAILED', err: action.err }
}

// map action types to reducer functions
export const handlers = {
  [Types.RESET_ACTIVISTS]: resetActivists,
  [Types.RESET_MYPAGES]: resetMyPages,

  [Types.ACTIVISTS_FETCH_SUCCEEDED]: fetchActivistsSucceeded,
  [Types.ACTIVISTS_FETCH_FAILED]: fetchActivistsFailed,

  [Types.GET_ACTIVISM_PAGE_REQUESTED]: getActivismPageRequested,
  [Types.GET_ACTIVISM_PAGE_SUCCEEDED]: getActivismPageSucceeded,
  [Types.GET_ACTIVISM_PAGE_FAILED]: getActivismPageFailed,

  [Types.CREATE_ACTIVISM_PAGE_REQUESTED]: createActivismPageRequested,
  [Types.CREATE_ACTIVISM_PAGE_SUCCEEDED]: createActivismPageSucceeded,
  [Types.CREATE_ACTIVISM_PAGE_FAILED]: createActivismPageFailed,

  [Types.UPDATE_ACTIVISM_PAGE_REQUESTED]: updateActivismPageRequested,
  [Types.UPDATE_ACTIVISM_PAGE_SUCCEEDED]: updateActivismPageSucceeded,
  [Types.UPDATE_ACTIVISM_PAGE_FAILED]: updateActivismPageFailed,

  [Types.DELETE_ACTIVISM_PAGE_REQUESTED]: deleteActivismPageRequested,
  [Types.DELETE_ACTIVISM_PAGE_SUCCEEDED]: deleteActivismPageSucceeded,
  [Types.DELETE_ACTIVISM_PAGE_FAILED]: deleteActivismPageFailed,

  [Types.ADD_USER_EMAIL_TO_ACTIVISM_PAGE_REQUESTED]: addUserEmailToActivismPageRequested,
  [Types.ADD_USER_EMAIL_TO_ACTIVISM_PAGE_SUCCEEDED]: addUserEmailToActivismPageSucceeded,
  [Types.ADD_USER_EMAIL_TO_ACTIVISM_PAGE_FAILED]: addUserEmailToActivismPageFailed,

  [Types.GET_ACTIVISM_PAGE_COMMENTS_REQUESTED]: getActivismPageCommentsRequested,
  [Types.GET_ACTIVISM_PAGE_COMMENTS_SUCCEEDED]: getActivismPageCommentsSucceeded,
  [Types.GET_ACTIVISM_PAGE_COMMENTS_FAILED]: getActivismPageCommentsFailed,

  [Types.UPVOTE_ACTIVISM_PAGE_REQUESTED]: upvoteActivismPageRequested,
  [Types.UPVOTE_ACTIVISM_PAGE_SUCCEEDED]: upvoteActivismPageSucceeded,
  [Types.UPVOTE_ACTIVISM_PAGE_FAILED]: upvoteActivismPageFailed,

  [Types.DOWNVOTE_ACTIVISM_PAGE_REQUESTED]: downvoteActivismPageRequested,
  [Types.DOWNVOTE_ACTIVISM_PAGE_SUCCEEDED]: downvoteActivismPageSucceeded,
  [Types.DOWNVOTE_ACTIVISM_PAGE_FAILED]: downvoteActivismPageFailed,

  [Types.FLAG_ACTIVISM_PAGE_REQUESTED]: flagActivismPageRequested,
  [Types.FLAG_ACTIVISM_PAGE_SUCCEEDED]: flagActivismPageSucceeded,
  [Types.FLAG_ACTIVISM_PAGE_FAILED]: flagActivismPageFailed,

  [Types.FOLLOW_ACTIVISM_PAGE_REQUESTED]: followActivismPageRequested,
  [Types.FOLLOW_ACTIVISM_PAGE_SUCCEEDED]: followActivismPageSucceeded,
  [Types.FOLLOW_ACTIVISM_PAGE_FAILED]: followActivismPageFailed,

  [Types.ADD_COMMENT_TO_ACTIVISM_PAGE_REQUESTED]: addCommentToActivismPageRequested,
  [Types.ADD_COMMENT_TO_ACTIVISM_PAGE_SUCCEEDED]: addCommentToActivismPageSucceeded,
  [Types.ADD_COMMENT_TO_ACTIVISM_PAGE_FAILED]: addCommentToActivismPageFailed,

  [Types.UPDATE_COMMENT_REQUESTED]: updateCommentRequested,
  [Types.UPDATE_COMMENT_SUCCEEDED]: updateCommentSucceeded,
  [Types.UPDATE_COMMENT_FAILED]: updateCommentFailed,

  [Types.DELETE_COMMENT_REQUESTED]: deleteCommentRequested,
  [Types.DELETE_COMMENT_SUCCEEDED]: deleteCommentSucceeded,
  [Types.DELETE_COMMENT_FAILED]: deleteCommentFailed,

  [Types.UPVOTE_COMMENT_REQUESTED]: upvoteCommentRequested,
  [Types.UPVOTE_COMMENT_SUCCEEDED]: upvoteCommentSucceeded,
  [Types.UPVOTE_COMMENT_FAILED]: upvoteCommentFailed,

  [Types.DOWNVOTE_COMMENT_REQUESTED]: downvoteCommentRequested,
  [Types.DOWNVOTE_COMMENT_SUCCEEDED]: downvoteCommentSucceeded,
  [Types.DOWNVOTE_COMMENT_FAILED]: downvoteCommentFailed,

  [Types.FLAG_COMMENT_REQUESTED]: flagCommentRequested,
  [Types.FLAG_COMMENT_SUCCEEDED]: flagCommentSucceeded,
  [Types.FLAG_COMMENT_FAILED]: flagCommentFailed,

  [Types.GET_MYPAGES_REQUESTED]: getMyPagesRequested,
  [Types.GET_MYPAGES_SUCCEEDED]: getMyPagesSucceeded,
  [Types.GET_MYPAGES_FAILED]: getMyPagesFailed,
}

/* Selectors */


// Export Reducer
export default createReducer(initialState, handlers)
