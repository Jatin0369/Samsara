import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import Bg from "../Bg/Bg";
import { Link } from "react-router-dom";
import Logout from "./Logout";

function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('isAdmin');
    if (!token) {
      // Redirect if no token found
      navigate('/loginforadminacess');
    }
  }, [navigate]);

  return (
    <>
      <Bg heading="Admin Panel" />
      <div className="admin-panel">
        <Link to='/newtour' className="no-underline">
          <div className="button-container">Add New Tour</div>
        </Link>
        <Link to='/modifytour' className="no-underline">
          <div className="button-container">Modify Current Tour</div>
        </Link>
        <Link to="/newblog" className="no-underline">
          <div className="button-container">Add new blog</div>
        </Link>
        <Link to="/modifyblog" className="no-underline">
          <div className="button-container">Modify Current blog</div>
        </Link>
        
      </div>
        <div className="logout-div">
        <Logout /> 
        </div>
    </>
  );
}

export default Admin;
