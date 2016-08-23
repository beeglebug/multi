let down = {}

const keydown = (ev) => {
  let code = ev.keyCode
  down[code] = true
}

const keyup = (ev) => {
  let code = ev.keyCode
  delete down[code]
}

export const bindKeyboard = (target) => {
  target.addEventListener('keydown', keydown)
  target.addEventListener('keyup', keyup)
}

export const isDown = (code) => (
  down[code] === true
)
