import axios from "axios"

import { Dispatch } from "react"
import { env } from "../env"
import { getHeaders, getLogInAddress } from "./auth"

// Constants
enum ACTIONS {
  GET = "API/IMAGES/GET"
}

interface IResponse {
  title: string,
  description: string,
  image: string
}

interface IAction {
  type: ACTIONS,
  payload: IResponse[]
}  

const initialState:IResponse[] = []

export default function ImagesReducer(state = initialState, action: IAction): IResponse[] {
  switch(action.type) {
    case ACTIONS.GET:
      return action.payload
    default:
      return state
  } 
}

export function getImagesList() {
  return async (dispatch:Dispatch<IAction>) => {
    try{
      const res = await axios.get(`${env.API_ADDRESS}/images`, getHeaders())
      dispatch({
        type: ACTIONS.GET,
        payload: res.data
      })
    } catch(e) {
      console.log(e)
      window.open(getLogInAddress(),"_self") 
    }
  }
}