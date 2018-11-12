export default class Field {

  constructor(data, index) {
    this.text = data.text
    this.index = index

    this.isEmpty = data.text === ''
    this.isStart = data.hasOwnProperty('start')
    this.isFinish = data.hasOwnProperty('finish')
  }

  getDom() {
    let dom = document.createElement('div')
    dom.className = 'field'

    let number = document.createElement('span')
    number.className = 'number'
    number.innerHTML = this.index
    dom.appendChild(number)

    let text = document.createElement('span')
    text.className = 'text'
    text.innerHTML = this.isEmpty ? 'Glück gehabt!' : this.text
    dom.appendChild(text)

    if (this.isStart) {
      dom.classList.add('is-start')
    }

    if (this.isFinish) {
      dom.classList.add('is-finish')
    }

    if (this.isEmpty) {
      dom.classList.add('is-empty')
    }

    return dom
  }

}
