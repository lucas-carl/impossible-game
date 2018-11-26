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
    this.die.hide()

    this.gameText = document.getElementById('game-text')
    this.currentPlayerText = document.getElementById('current-player-text')
    this.nextButton = document.getElementById('next')
  }

  next() {
    this.nextButton.innerHTML = 'Nächster'
    this.die.show()

    if (this.isRunning) {
      if (this.currentPlayer.dieRolled === 1) {
        this.nextPlayer()
      }
    } else {
      this.init()
    }

    this.drawCurrentGameText()
    this.drawCurrentPlayerText()
  }

  rollDie() {
    if (this.currentPlayer.dieRolled < 1) {
      this.die.roll()

      this.currentPlayer.dieRolled += 1
      this.currentPlayer.move(this.die.value)

      this.drawCurrentGameText()
    }
  }

  init() {
    this.drawBoard()

    this.addPlayer('Lucas')
    this.addPlayer('Liam')
    this.addPlayer('Sai')
    this.isRunning = true
  }

  get currentPlayer() {
    return this.players[this.currentPlayerIndex]
  }

  get currentField() {
    return this.fields[this.currentPlayer.position]
  }

  addPlayer(name) {
    const player = new Player(name, randomColor(), this.players.length)

    this.players.push(player)

    player.draw()
  }

  nextPlayer() {
    this.currentPlayer.dieRolled = 0
    this.die.value = 0

    this.currentPlayerIndex = (this.currentPlayerIndex === this.players.length - 1) ? 0 : this.currentPlayerIndex + 1
  }

  drawBoard() {
    this.board.draw()
  }

  drawCurrentGameText() {
    this.gameText.innerHTML = this.currentField.text
  }

  drawCurrentPlayerText() {
    this.currentPlayerText.innerHTML = `${this.currentPlayer.name} ist am Zug.`
  }

}
