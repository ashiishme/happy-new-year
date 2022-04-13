import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  useCallback,
} from 'react'
import Particles from '../../particles/particles'
import Nepal from '../../map/map'

type ContextProps = {
  context: CanvasRenderingContext2D | undefined
  width: number
  height: number
}

const particlesReference = createContext<ContextProps>({
  context: undefined,
  width: 0,
  height: 0,
})
const mapReference = createContext<ContextProps>({
  context: undefined,
  width: 0,
  height: 0,
})

const useResponsiveSize = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const setSizes = useCallback(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }, [setWidth, setHeight])

  useEffect(() => {
    window.addEventListener('resize', setSizes)
    setSizes()
  }, [setSizes])

  return { width, height }
}

const Canvas = () => {
  const particleCanvasRef = useRef<HTMLCanvasElement>(null)
  const mapCanvasRef = useRef<HTMLCanvasElement>(null)
  let particleProvider: ContextProps = {
    context: undefined,
    width: 0,
    height: 0,
  }
  let mapProvider: ContextProps = {
    context: undefined,
    width: 0,
    height: 0,
  }
  const { width, height } = useResponsiveSize()
  const [particleContext, setParticleContext] =
    useState<CanvasRenderingContext2D>()
  const [mapContext, setMapContext] = useState<CanvasRenderingContext2D>()

  useEffect(() => {
    if (particleCanvasRef.current && mapCanvasRef.current) {
      const particleContext = particleCanvasRef.current?.getContext('2d')
      const mapContext = mapCanvasRef.current?.getContext('2d')

      if (particleContext && mapContext) {
        setParticleContext(particleContext)
        setMapContext(mapContext)
      }
    }
  }, [setParticleContext, setMapContext])

  particleProvider = { context: particleContext, width: width, height: height }
  mapProvider = { context: mapContext, width: width, height: height }
  return (
    <>
      <particlesReference.Provider value={particleProvider}>
        <canvas
          id="particles"
          ref={particleCanvasRef}
          width={width}
          height={height}
        ></canvas>
        <Particles />
      </particlesReference.Provider>
      <mapReference.Provider value={mapProvider}>
        <canvas
          id="map"
          ref={mapCanvasRef}
          width={width}
          height={height}
        ></canvas>
        <Nepal />
      </mapReference.Provider>
    </>
  )
}

export const useParticlesReference = () => {
  const particlesContext = useContext(particlesReference)
  return particlesContext
}

export const useMapReference = () => {
  const nepalContext = useContext(mapReference)
  return nepalContext
}

export default Canvas
