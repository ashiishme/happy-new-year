import { FC } from 'react'
import { useCanvasContext } from 'hooks/useCanvas'
import useResponsiveSize from 'hooks/useResponsiveSize'

import FireworkModel from 'models/Firework'
import SparkModel from 'models/Spark'

const Firework: FC = () => {
  const { context } = useCanvasContext()
  const { width, height } = useResponsiveSize()

  const colors = [
    '#F44336',
    '#8E24AA',
    '#9C27B0',
    '#673AB7',
    '#2196F3',
    '#4CAF50',
    '#FFEB3B',
    '#FF5722',
  ]

  const angle = (Math.PI * 2) / 100
  let fireworks: FireworkModel[] = []
  let sparks: SparkModel[] = []

  const render = () => {
    context!.fillStyle = 'rgba(0, 0, 0, 0.05)'
    context?.fillRect(0, 0, width, height)
    if (!fireworks.length) {
      fireworks.push(
        new FireworkModel(
          width / 2,
          height,
          colors[Math.floor(Math.random() * 7)]
        )
      )
    }

    fireworks.forEach((firework, index) => {
      firework.update(context!)

      if (firework.state === 'explode') {
        for (let i = 0; i < 100; i++) {
          sparks.push(
            new SparkModel(firework.x, firework.y, firework.color, {
              x: Math.cos(angle + i) * 1.5,
              y: Math.sin(angle + i) * 1.5,
            })
          )
        }

        fireworks.splice(index, 1)
      }
    })

    sparks.forEach((spark, index) => {
      spark.update(context!)

      if (spark.lifeSpan === 2) {
        sparks.splice(index, 1)
      }
    })

    requestAnimationFrame(render)
  }

  if (context) render()
  return null
}

export default Firework
