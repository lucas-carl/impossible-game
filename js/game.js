import Player from './player'
import Board from './board'
import Die from './die'

import randomColor from 'randomcolor'

import FIELDS from '../fields.json'

export default class Game {

  constructor() {
    this.players = []
    this.currentPlayerIndex = 0
    this.fields = FIELDS
    this.isRunning = false

    this.board = new Board(this.fields)
    this.die = new Die()

    this.gameText = document.getElementById('game-text')
    this.currentPlayerText = document.getElementById('current-player-text')
    this.nextButton = document.getElementById('next')
  }

  next() {
    this.nextButton.innerHTML = 'Nächster'

    this.die.roll()

    if (this.isRunning) {
      let player = this.getCurrentPlayer()
      player.move(this.die.getValue)

      this.nextPlayer()
    } else {
      this.init()
    }

    this.drawCurrentGameText()
    this.drawCurrentPlayerText()
  }

  init() {
    this.addPlayer('Lucas')
    this.addPlayer('Liam')
    this.addPlayer('Sai')
    this.isRunning = true
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex]
  }

  getCurrentField() {
    let player = this.getCurrentPlayer()
    return this.fields[player.position]
  }

  addPlayer(name) {
    let color = randomColor()
    let index = this.players.length
    const player = new Player(name, color, index)
    this.players.push(player)

    this.drawBoard()
    player.draw()
  }

  nextPlayer() {
    let index = this.currentPlayerIndex + 1

    if (index >= this.players.length) {
      index = 0
    }

    this.currentPlayerIndex = index
    this.drawCurrentPlayerText()
  }

  drawBoard() {
    this.board.draw()
  }

  drawCurrentGameText() {
    let field = this.getCurrentField()
    this.gameText.innerHTML = field.text
  }

  drawCurrentPlayerText() {
    let player = this.getCurrentPlayer()
    this.currentPlayerText.innerHTML = `${player.name} ist am Zug.`
  }

}
