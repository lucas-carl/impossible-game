export default class Player {

  constructor(name, color, index) {
    this.name = name
    this.position = 0
    this.color = color
    this.index = index
    this._dieRolled = 0

    this.board = document.getElementById('board')
    this.fields = this.board.childNodes
  }

  get currentPlayerPosition() {
    return this.position
  }

  get field() {
    return this.fields[this.position]
  }

  get dieRolled() {
    return this._dieRolled
  }

  set dieRolled(value) {
    this._dieRolled = value
  }

  move(steps) {
    this.position += steps
    this.draw()
  }

  clear() {
    this.fields.forEach((f) => {
      while (f.querySelector(`.player-${this.index}`)) {
        f.removeChild(f.querySelector(`.player-${this.index}`))
      }
    })
  }

  draw() {
    this.clear()

    let player = document.createElement('div')
    player.className = `player player-${this.index}`
    player.style.backgroundColor = this.color
    this.field.appendChild(player)
  }

}
