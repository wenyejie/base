export default class Dep {
  constructor() {
    console.log('Dep constructor')
    this.subscribes = []
  }

  add(subscriber) {
    console.log('Dep.add =>', subscriber)
    this.subscribes.push(subscriber)
  }

  notify() {
    console.log('Dep.notify =>', this.subscribes)
    this.subscribes.forEach((subscriber) => {
      subscriber.update()
    })
  }
}
