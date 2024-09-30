const photoDefault = req => {
  return req.protocol + '://' + req.headers.host + '/icon-user.png'
}
export default photoDefault
