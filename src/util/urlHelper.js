let baseUIURL = ''
let baseServerURL = ''

init()

function init() {
  const schema = window.location.protocol
  const host = window.location.hostname
  const { port } = window.location
  // console.log(':::::::', schema, host, port, window.location)

  baseUIURL = `${schema}//${host}:${port}`
  baseServerURL = `${schema}//${host}:8080`
  // console.log(baseUIURL)
}

export function getBaseUIURL() {
  return baseUIURL
}

export function getBaseServerURL() {
  return baseServerURL
}
