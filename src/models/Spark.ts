export default class Spark {
  private x: number
  private y: number
  private color: string
  private velocity: { x: number; y: number }
  public lifeSpan = 200
  private opacity = 1

  constructor(
    x: number,
    y: number,
    color: string,
    velocity: { x: number; y: number }
  ) {
    this.x = x
    this.y = y
    this.color = color
    this.velocity = velocity
  }

  public draw(context: CanvasRenderingContext2D) {
    context.save()
    context.globalAlpha = this.opacity
    context.beginPath()
    context.arc(this.x, this.y, 2, 0, Math.PI * 2, false)
    context.fillStyle = this.color
    context.fill()
    context.closePath()
    context.restore()
  }

  public update(context: CanvasRenderingContext2D) {
    this.x += this.velocity.x
    this.y += this.velocity.y
    this.velocity.y += 0.005
    if (this.lifeSpan <= 100) this.opacity -= 0.01

    this.lifeSpan -= 1
    this.draw(context)
  }
}
