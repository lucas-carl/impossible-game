export default class Die {

  constructor() {
    this.value = 0
    this.die = document.getElementById('die')
    this.roll()
  }

  get getValue() {
    return this.value
  }

  roll() {
    this.value = Math.round((Math.random() * 5) + 1)
    this.draw()
  }

  draw() {
    this.die.innerHTML = this.value
  }

  hide() {
    this.die.classList.add('is-hidden')
  }

  show() {
    this.die.classList.remove('is-hidden')
  }

}
