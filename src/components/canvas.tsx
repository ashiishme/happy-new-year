import { useRef, FC, useEffect, useState } from 'react'

import { CanvasContext } from 'hooks/useCanvas'
import useResponsiveSize from 'hooks/useResponsiveSize'
import Firework from 'components/firework'

const Canvas: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { width, height } = useResponsiveSize()

  const [context, setContext] = useState<CanvasRenderingContext2D | undefined>()

  useEffect(() => {
    const ctx = canvasRef?.current?.getContext('2d')

    if (ctx) setContext(ctx)
  }, [])

  return (
    <>
      <CanvasContext.Provider value={{ context: context }}>
        <canvas
          id="canvas"
          ref={canvasRef}
          width={width}
          height={height}
        ></canvas>
        <Firework />
      </CanvasContext.Provider>
    </>
  )
}

export default Canvas
