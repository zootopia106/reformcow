import callApi, { ACTIVISM_API_URL } from '../utils/apiCaller'

export function fetchActivists(state, city, includingStates, includingCities, limit, lastKey) {

  var url = 'activism?co=us'
  if (includingStates === true) {
    url += '&ic=1'
  } else {
    url += `&st=${ state }`
    if (includingCities === true) {
      url += '&ic=1'
    } else {
      url += `&ct=${ city }`
    }
  }

  if (limit) url += `&limit=${limit}`
  return callApi(ACTIVISM_API_URL, url, 'POST', { LastEvaluatedKey: lastKey })
}

export function getActivismPage(pageId) {
  return callApi(ACTIVISM_API_URL, `activism/${ pageId }`)
}

export function createActivismPage(data, idToken) {
  let url = 'activism/create?'
  if (data.state) url += `st=${ data.state }&`
  if (data.city) url += `ct=${ data.city }&`

  return callApi(ACTIVISM_API_URL, url, 'POST', data, idToken)
}

export function updateActivismPage(data, idToken) {
  let url = 'activism/create?'
  if (data.state) url += `st=${ data.state }&`
  if (data.city) url += `ct=${ data.city }&`

  return callApi(ACTIVISM_API_URL, url, 'PUT', data, idToken)
}

export function addUserEmailToActivismPage(pageId, email) {
  return callApi(ACTIVISM_API_URL, `activism/${ pageId }/emails`, 'PUT', { email })
}

export function getActivismPageComments(pageId, limit, lastKey) {
  return callApi(ACTIVISM_API_URL, `activism/${ pageId }/comments?limit=${ limit }`, 'POST', { LastEvaluatedKey: lastKey })
}

export function upvoteActivismPage(pageId, idToken) {
  return callApi(ACTIVISM_API_URL, `activism/${ pageId }/upvote`, 'PUT', null, idToken)
}

export function downvoteActivismPage(pageId, idToken) {
  return callApi(ACTIVISM_API_URL, `activism/${ pageId }/downvote`, 'PUT', null, idToken)
}

export function flagActivismPage(pageId, idToken) {
  return callApi(ACTIVISM_API_URL, `activism/${ pageId }/flag`, 'PUT', null, idToken)
}

export function followActivismPage(pageId, idToken) {
  return callApi(ACTIVISM_API_URL, `activism/${ pageId }/follow`, 'PUT', null, idToken)
}

export function addCommentToActivismPage(pageId, content, idToken) {
  return callApi(ACTIVISM_API_URL, `activism/${ pageId }/comments/create`, 'POST', { content }, idToken)
}

export function upvoteComment(pageId, commentId, idToken) {
  return callApi(ACTIVISM_API_URL, `activism/${ pageId }/comments/${ commentId }/upvote`, 'PUT', null, idToken)
}

export function downvoteComment(pageId, commentId, idToken) {
  return callApi(ACTIVISM_API_URL, `activism/${ pageId }/comments/${ commentId }/downvote`, 'PUT', null, idToken)
}

export function flagComment(pageId, commentId, idToken) {
  return callApi(ACTIVISM_API_URL, `activism/${ pageId }/comments/${ commentId }/flag`, 'PUT', null, idToken)
}
