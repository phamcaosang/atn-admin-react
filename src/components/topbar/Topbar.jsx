import React from "react";
import "./topbar.css";
import { useDispatch } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "../../redux/authRedux";

export default function Topbar() {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logout())
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">ATN dashboard</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer" >
            <LogoutIcon onClick={handleClick}/>
          </div>
          <img src="http://facebookfplus.com/upload/images/600_97d118b7a6f8f87d18f7b1385ea7665e.png" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}