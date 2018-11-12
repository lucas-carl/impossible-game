import Field from './field'

export default class Board {

  constructor(fields) {
    this.fields = fields
    this.board = document.getElementById('board')
  }

  draw() {
    // clear board first
    while (this.board.firstChild) {
      this.board.removeChild(this.board.firstChild)
    }

    // draw the fields
    this.fields.forEach((data, index) => {
      let field = new Field(data, index)
      this.board.appendChild(field.getDom())
    })
  }

}
