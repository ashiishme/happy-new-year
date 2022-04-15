import Canvas from 'components/canvas'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>
          Happy New Year 2079 - Canvas Animation using NextJs & TypeScript
        </title>
        <meta
          name="description"
          content="Happy New Year 2079 - Canvas Animation using NextJs & TypeScript"
        />
        <link key={'icon'} rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main h-full">
        <Canvas />
        <div className="relative w-full h-full">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-[60px] font-bold text-red-500 font-playball text-center">
              Happy <br /> New Year
            </h1>
            <h2 className="text-[80px] font-bold text-red-500 font-playball text-center">
              2079
            </h2>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
