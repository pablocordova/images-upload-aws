import "./index.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import { getLogOutAddress } from "../../redux/auth"

function TopBar() {

  const handleLogOut = () => {
    localStorage.removeItem("raysecurToken")
    window.open(getLogOutAddress(),"_self")
  }

  return (
    <div className="top-bar">
      <div className="top-bar__info">
        RAYSECUR
      </div>
      
      <div className="top-bar__buttons">
        <FontAwesomeIcon icon={faSignOutAlt} className="top-bar__buttons__logout" onClick={handleLogOut}/>
      </div>
    </div>
  )
}

export default TopBar;
