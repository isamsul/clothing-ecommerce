import React from "react";
import './homepage.styles.scss';

import Directory from "../../components/directory/directory.component";
import { useLocation, useNavigate, useParams, useResolvedPath } from "react-router-dom";

const HomePage = (props) => {
  // useNavigate('home')
  return (
    <div className="homepage">
      <Directory />
    </div>
    
  )
}

export default HomePage;