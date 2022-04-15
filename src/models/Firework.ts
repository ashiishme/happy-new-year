export default class Firework {
  public x: number
  public y: number
  public color: string
  private vy: number = 3
  public state: 'fly' | 'explode'
  public lifeSpan: number
  public sound: HTMLAudioElement
  public crackSound: HTMLAudioElement

  constructor(x: number, y: number, color: string) {
    this.x = x
    this.y = y
    this.color = color
    this.state = 'fly'
    this.lifeSpan = 220
    this.sound = new Audio('/happy-new-year/mp3/firework-whistle.mp3')
    this.crackSound = new Audio('/happy-new-year/mp3/firework-crack.mp3')
  }

  public draw(context: CanvasRenderingContext2D) {
    context.beginPath()
    context.arc(this.x, this.y, 2, 0, Math.PI * 2)
    context.fillStyle = this.color
    context.fill()
    context.closePath()
  }

  public update(context: CanvasRenderingContext2D) {
    this.sound.play()
    this.crackSound.pause()
    if (this.lifeSpan === 90) {
      this.sound.pause()
      this.crackSound.play()
      this.state = 'explode'
    }
    this.y -= this.vy
    this.lifeSpan -= 1
    this.draw(context)
  }
}
