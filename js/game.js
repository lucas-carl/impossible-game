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
    if (this.players.length < 2) return

    this.nextButton.innerHTML = 'Nächster'

    document.getElementById('add-player').classList.add('is-hidden')

    this.die.show()

    if (this.isRunning) {
      if (this.currentPlayer.dieRolled === 1) {
        this.nextPlayer()
      }
    } else {
      this.init()
    }

    this.updateCurrentContent()
  }

  rollDie() {
    if (this.currentPlayer.dieRolled < 1) {
      this.die.roll()

      this.currentPlayer.dieRolled += 1
      this.currentPlayer.move(this.die.value)

      this.updateCurrentContent()
    }
  }

  init() {
    this.drawBoard()
    this.isRunning = true
  }

  get currentPlayer() {
    return this.players[this.currentPlayerIndex]
  }

  get currentField() {
    return this.fields[this.currentPlayer.position]
  }

  addPlayer(name) {
    return new Promise((resolve, reject) => {
      if (this.players.find((p) => p.name === name)) {
        return reject('Spieler existiert bereits.')
      }

      if (this.players.length === 8) {
        return reject('Die maximale Anzahl an Spielern ist 8.')
      }

      const player = new Player(name, randomColor(), this.players.length)

      this.players.push(player)
      this.drawPlayerList()

      player.draw()

      return resolve()
    })
  }

  removePlayer(name) {
    let index = this.players.findIndex((player) => player.name === name)
    if (index >= 0) {
      this.players.splice(index, 1)
    }

    this.drawPlayerList()
  }

  nextPlayer() {
    this.currentPlayer.dieRolled = 0
    this.die.value = 0

    this.currentPlayerIndex = (this.currentPlayerIndex === this.players.length - 1) ? 0 : this.currentPlayerIndex + 1
  }

  drawBoard() {
    this.board.draw()
  }

  drawPlayerList() {
    let list = document.getElementById('players-list')

    // clear
    while (list.firstChild) {
      list.removeChild(list.firstChild)
    }

    this.players.forEach((player, index) => {
      let itemDelete = document.createElement('a')
      itemDelete.href = '#'
      itemDelete.title = 'entfernen'
      itemDelete.innerHTML = 'x'
      if (this.isRunning) {
        itemDelete.classList.add('is-hidden')
      }
      itemDelete.addEventListener('click', (e) => {
        e.preventDefault()
        this.removePlayer(player.name)
        return false
      })

      let item = document.createElement('div')
      item.classList.add('player-list-item')
      if (player.name === this.currentPlayer.name) {
        item.classList.add('is-active')
      }
      item.innerHTML = `${index + 1}. ${player.name}`
      item.appendChild(itemDelete)

      list.appendChild(item)
    })
  }

  updateCurrentContent() {
    this.gameText.innerHTML = this.currentField.text

    this.currentPlayerText.innerHTML = `${this.currentPlayer.name} ist am Zug.`

    this.drawPlayerList()
  }

}
