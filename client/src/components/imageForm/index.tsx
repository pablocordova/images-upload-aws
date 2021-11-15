import "./index.scss"

import Loader from "react-loader-spinner"
import axios from "axios"

import { useState, ChangeEvent } from "react"
import { useDispatch } from "react-redux"
import { env } from "../../env"
import { getHeaders } from "../../redux/auth"
import { getImagesList } from "../../redux/images"


const initialForm = {
  title: "",
  description: "",
  image: null
}

const initialErrors = {
  title: false,
  description: false,
  image: false
}

function ImageForm() {

  const dispatch = useDispatch()
  const [formState, setFormState] = useState(initialForm);
  const [showLoadingSpin, setShowLoadingSpin] = useState(false)
  const [errors, setErrors] = useState(initialErrors)

  const handleForm = (event:ChangeEvent) => {
    const target = event.target as HTMLInputElement
    const data = target.files ? target.files[0] : target.value
    const hasError = data === null || data === '' || data === undefined

    setErrors({...errors, [target.name]: hasError})
    setFormState({...formState, [target.name]: data})
  }

  const genereteS3SignedURL = async () => {
    return await axios.get(`${env.API_ADDRESS}/upload`, getHeaders())
  }
  const sendImage = async (signedURL:string) => {
    return await axios.put(signedURL, formState.image)
  }
  const sendForm = async (imageName:string) => {
    const payload = {
      ...formState,
      image: imageName
    }
    return await axios.post(`${env.API_ADDRESS}/images`, payload, getHeaders())
  }

  const isValidForm = (): boolean => {
    for(let item of Object.entries(formState)) {
      if(item[1] === null || item[1] === '' || item[1] === undefined){
        setErrors({...errors, [item[0]]: true})
        return false
      }
    }
    return true
  }

  const handleUploadForm = async () => {
    if (!isValidForm()) { return }
    setShowLoadingSpin(true)
    const signedURL = await genereteS3SignedURL()
    const imageName = signedURL.data.Key.split("/")[1]
    const imageUploadURL = signedURL.data.uploadURL
    await sendImage(imageUploadURL)
    await sendForm(imageName)
    await dispatch(getImagesList())   
    setShowLoadingSpin(false)
  }

  return (
    <div className="image-form">
      <div className={`form-group ${errors.title ? "showError" : "hideError"}`}>
        <label>Title</label>
        <input type="text" className="form-control" name="title" onChange={handleForm} required/>
        <div className="message-error-feedback">
          Please provide a Title
        </div>
      </div>
      <div className={`form-group ${errors.description ? "showError" : "hideError"}`}>
        <label>Description</label>
        <textarea className="form-control" rows={3} name="description" onChange={handleForm}/>
        <div className="message-error-feedback">
          Please provide a Description
        </div>
      </div>
      <div className={`form-group ${errors.image ? "showError" : "hideError"}`}>
        <label>Image</label>
        <div>
          <input type="file" onChange={handleForm} name="image"/>
          <div className="message-error-feedback">
            Please provide a Image
          </div>
        </div>
      </div>
      <div className="form-group image-form__upload-button">
        {
          showLoadingSpin ?
          <div>
            <Loader
              type="Oval"
              color="#666666"
              height={25}
              width={25}
            />
          </div> :
          <button type="button" className="btn btn-primary" onClick={handleUploadForm}>Upload</button>
        }
      </div>
    </div>
  )
}

export default ImageForm;
