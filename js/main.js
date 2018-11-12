import Game from './game'

let game = new Game()
game.drawBoard()

// start game / next button
document.getElementById('next').addEventListener('click', () => {
  game.next()
})