import Game from './game'

let game = new Game()
game.drawBoard()

// start game / next button
document.getElementById('next').addEventListener('click', () => {
  game.next()
})

// roll the die
document.getElementById('die').addEventListener('click', () => {
  game.rollDie()
})

const processForm = (e) => {
  if (e.preventDefault) e.preventDefault()

  let input = e.srcElement[0]
  let name = input.value
  if (name) {
    game.addPlayer(name).then(() => {
      input.value = ''
    })
  }

  return false
}

let form = document.getElementById('add-player')
if (form.attachEvent) {
  form.attachEvent('submit', processForm)
} else {
  form.addEventListener('submit', processForm)
}
