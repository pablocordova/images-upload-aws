import "./index.scss"

import Loader from "react-loader-spinner"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../redux/store"
import { useEffect, useState } from "react"
import { getImagesList } from "../../redux/images"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons"


const initialArray:Array<boolean>  = []

function ImagesList() {

  const images = useSelector((store:RootState) => store.images)
  const [showResults, setShowResults] = useState(initialArray)
  const [showLoadingSpin, setShowLoadingSpin] = useState(false)

  const getImages = async () => {
    setShowLoadingSpin(true)
    await dispatch(getImagesList())
    setShowLoadingSpin(false)
  }

  const dispatch = useDispatch()
  useEffect( () => {
    getImages()
  }, [dispatch])

  const handleTitleButtons = (index:number) => {
    console.log(index)
    let newShowResults:Array<boolean> = [...showResults]
    newShowResults[index] =! newShowResults[index]
    setShowResults(newShowResults)
  }

  const imagesRenderer = images.map((item, index) => {
    return(
      <div key={index} className="images__item">
        <div className="images__item__title" onClick={()=> handleTitleButtons(index)}>
          <div>{item.title}</div>
          <div className="images__item__title__buttons">
            {
              showResults[index] ? 
                <FontAwesomeIcon icon={faAngleUp} size="2x" /> :
                <FontAwesomeIcon icon={faAngleDown} size="2x" />
            }
          </div>
        </div>
        {
          showResults[index] ? 
          <div>
            <div className="images__item__description">{item.description}</div>
            <div className="images__item__image">
              <img src={item.image} alt=""/>
            </div>
          </div> :
          null 
        }
      </div>
    )
  })
  imagesRenderer.reverse()
  return (
    <div className="images">
      {
        imagesRenderer
      }
      {
        showLoadingSpin ?
        <div className="images__loading">
          <Loader
            type="Oval"
            color="#666666"
            height={100}
            width={100}
          />
        </div> :
        null
      }
      
    </div>
  )
}

export default ImagesList;
