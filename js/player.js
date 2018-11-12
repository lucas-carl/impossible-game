export default class Player {

  constructor(name, color, index) {
    this.name = name
    this.position = 0
    this.color = color
    this.index = index

    this.board = document.getElementById('board')
    this.fields = this.board.childNodes
  }

  set setPlayerPosition(position) {
    this.position = position
  }

  get currentPlayerPosition() {
    return this.position
  }

  move(steps) {
    this.position += steps
    this.draw()
  }

  draw() {
    let field = this.fields[this.position]

    this.fields.forEach((f) => {
      while (f.querySelector(`.player-${this.index}`)) {
        f.removeChild(f.querySelector(`.player-${this.index}`))
      }
    })

    let player = document.createElement('div')
    player.className = `player player-${this.index}`
    player.style.backgroundColor = this.color
    field.appendChild(player)
  }

}
