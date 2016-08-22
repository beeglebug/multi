const getServer = () => {
  return {
    name: 'test server',
    host: window.location.hostname,
    port: 3000
  }
}

export default getServer
