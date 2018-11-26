export default class Die {

  constructor() {
    this._value = 0
    this.die = document.getElementById('die')
    this.draw()
  }

  get value() {
    return this._value
  }

  set value(value) {
    this._value = value
    this.draw()
  }

  roll() {
    this.value = Math.round((Math.random() * 5) + 1)
  }

  draw() {
    this.die.innerHTML = this.value === 0 ? 'X' : this.value
  }

  hide() {
    this.die.classList.add('is-hidden')
  }

  show() {
    this.die.classList.remove('is-hidden')
  }

}
