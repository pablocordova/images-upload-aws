import "./dashboard.scss"

import TopBar from "./components/topBar"
import ImageForm from "./components/imageForm"
import ImagesList from "./components/imagesList"
import Loader from "react-loader-spinner"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setupToken } from "./redux/auth"

function Dashboard() {
  const dispatch = useDispatch()

  const [showLoadingSpind, setShowLoadingSpind] = useState(true)

  const setup = async () => {
    setShowLoadingSpind(true)
    await dispatch(setupToken())
    setShowLoadingSpind(false)
  }

  useEffect(() => {
    setup()
  }, [dispatch])

  return (
    <div className="dashboard">
      {
        showLoadingSpind ?
        <div className="dashboard__loading">
          <Loader
            type="Oval"
            color="#666666"
            height={100}
            width={100}
          />
        </div> :
        <div>
          <TopBar />
          <div className="dashboard__body">
            <ImageForm />
            <ImagesList />
          </div>
        </div>
      }
    </div>
  )
}

export default Dashboard;
