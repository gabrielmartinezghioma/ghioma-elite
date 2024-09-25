const photoDefault = req => {
  const url = req.protocol + '://' + req.headers.host + '/icon-user.png'
  return url
}
export default photoDefault
