import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { getInfo, getProposals, isWallectConnected } from "./Blockchain.services"
import Header from "./components/Header"
import { useGlobalState } from "./store"
import Home from "./views/Home"
import Proposal from "./views/Proposal"
import Alert from "./components/Alert"
import Loading from "./components/Loading"

const App = () => {
  const [loaded, setLoaded] = useState(false)

  const [connectedAccount] = useGlobalState('connectedAccount')
  useEffect(async () => {
    await isWallectConnected()
    await getInfo()
    await getProposals()
    setLoaded(true)
  }, [])

  useEffect(async () => {
    try {
      await getInfo()
    } catch (error) {
      console.log("🚀 ~ file: App.jsx:21 ~ useEffect ~ error:", error)
    }
  }, [connectedAccount])
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#212936] dark:text-gray-300">
      <Header />
      {loaded ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proposal/:id" element={<Proposal />} />
        </Routes>

      )
        :
        null}
      <Loading />
      <Alert />
    </div>
  )
}

export default App
