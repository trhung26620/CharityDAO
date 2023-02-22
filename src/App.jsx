import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { getInfo, getProposals, isWallectConnected } from "./Blockchain.services"
import CreateProposal from "./components/CreateProposal"
import Header from "./components/Header"
import { useGlobalState } from "./store"
import Home from "./views/Home"
import Proposal from "./views/Proposal"
import { ToastContainer } from 'react-toastify'

const App = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  useEffect(async () => {
    await isWallectConnected()
    await getInfo()
    await getProposals()
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proposal/:id" element={<Proposal />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App
