export default (bodies) => {
  return bodies
    .map(body => Math.max(body.width, body.height))
    .reduce((max, current) => Math.max(max, current), 0)
}
