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

  get field() {
    return this.fields[this.position]
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
