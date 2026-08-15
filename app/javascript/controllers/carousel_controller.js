import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="carousel"
export default class extends Controller {
  static targets = ["container"]

  connect() {
    this.start()
  }

  disconnect() {
    this.stop()
  }

  start() {
    this.stop() // Clear any existing timer to prevent duplicates
    this.timer = setInterval(() => {
      this.next()
    }, 5000)
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  next() {
    const container = this.containerTarget
    const items = container.querySelectorAll(".carousel-item")
    if (items.length <= 1) return

    // Find the item currently closest to the visible viewport scroll position
    let currentActiveIndex = 0
    let minDiff = Infinity
    const containerScrollLeft = container.scrollLeft

    items.forEach((item, index) => {
      const diff = Math.abs(item.offsetLeft - containerScrollLeft)
      if (diff < minDiff) {
        minDiff = diff
        currentActiveIndex = index
      }
    })

    // Calculate the index of the next slide (wrapping around to the first)
    const nextIndex = (currentActiveIndex + 1) % items.length
    const nextItem = items[nextIndex]

    container.scrollTo({
      left: nextItem.offsetLeft,
      behavior: "smooth"
    })
  }

  pause() {
    this.stop()
  }

  resume() {
    this.start()
  }
}
