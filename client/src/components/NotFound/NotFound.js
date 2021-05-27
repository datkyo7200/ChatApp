import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => (
  <div className="not-found">
    <p>4 0 4</p>
    <Link to="/" className="link-home">
      <button type="button" className="btn-gohome">
        GO HOME
      </button>
    </Link>
  </div>
);

export default NotFound;
