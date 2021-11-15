import axios from "axios"

import { Dispatch } from "react"
import { env } from "../env"

// Constants
enum ACTIONS {
  SAVE = "API/TOKEN/SAVE"
}

interface IResponse {
  id_token: string
}

interface IAction {
  type: ACTIONS,
  payload: IResponse
}  

const userState:IResponse = {
  id_token: ""
}

export default function authReducer(state = userState, action: IAction): IResponse {
  switch(action.type) {
    case ACTIONS.SAVE:
      localStorage.setItem("raysecurToken", JSON.stringify(action.payload.id_token))
      return action.payload
    default:
      return state
  } 
}

const cleanSearchParams = () => {
  const newURL = window.location.href.split("?")[0]
  window.history.pushState('object', document.title, newURL)
}

export function setupToken() {
  return async (dispatch:Dispatch<IAction>) => {
    try{
      const params = new URLSearchParams(window.location.search)
      if(!params.get("code")) {throw "code not found"}

      cleanSearchParams()
      params.append("client_id", env.CLIENT_ID)
      params.append("redirect_uri", env.REDIRECT_URI)
      params.append("grant_type", "authorization_code")

      const res = await axios.post(`${env.AUTH_ADDRESS}/oauth2/token`, params)

      dispatch({
        type: ACTIONS.SAVE,
        payload: res.data
      })
    } catch(e) {
      console.log(e)
    }
  }
}

export function getHeaders() {
  let tokenLocalStorage = localStorage.getItem("raysecurToken")
  if (!tokenLocalStorage){ return {} }
  const token = JSON.parse(tokenLocalStorage)
  return {headers:{"Authorization": token}}
}

export function getLogInAddress() {
  return `${env.AUTH_ADDRESS}/login?client_id=${env.CLIENT_ID}&response_type=code&scope=email+openid&redirect_uri=${env.REDIRECT_URI}`
}

export function getLogOutAddress() {
  return `${env.AUTH_ADDRESS}/logout?client_id=${env.CLIENT_ID}&logout_uri=${getLogInAddress()}`
}