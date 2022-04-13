import { useCallback } from 'react'
import { useMapReference } from '../utils/canvas/canvas'
import NepalMap from '../../assets/images/nepal.png'

const generateImageParticles = (data: any, width: number, height: number) => {
  let particles = []
  for (let i = 0; i < data.height; i++) {
    for (let j = 0; j < data.width; j++) {
      if (data.data[i * 4 * data.width + j * 4 + 3] > 128) {
        let x = j * 4 + width / 2 - data.width * 2
        let y = i * 4 + height / 2 - data.height * 2
        particles.push({ x, y })
      }
    }
  }
  return particles
}

const draw = (
  x: number,
  y: number,
  context: CanvasRenderingContext2D | undefined
) => {
  context?.beginPath()
  context?.fillRect(x, y, 3, 3)
  context?.closePath()
  context?.fill()
  context!.fillStyle = '#455A64'
}

const Nepal = () => {
  const { context, width, height } = useMapReference()
  let particles: any[] = []

  if (context) {
    const image = new Image()
    image.src = NepalMap
    image.onload = () => {
      context.drawImage(image, 0, 0)
      const imageData = context.getImageData(0, 0, image.width, image.height)
      particles = generateImageParticles(imageData, width, height)
      context.clearRect(0, 0, width, height)
    }
  }

  const render = useCallback(() => {
    requestAnimationFrame(render)
    if (particles.length !== 0) {
      let index = Math.floor(Math.random() * particles.length)
      draw(particles[index].x, particles[index].y, context)
      particles.splice(index, 1)
    }
  }, [context])

  if (context) render()
  return null
}

export default Nepal
