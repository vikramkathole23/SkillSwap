import React from "react";
import { RotatingLines } from "react-loader-spinner";
import "./LoadingStyle.module.css"

function Loader() {
  return (
    <div className="wrapper">
      <RotatingLines
        visible={true}
        height="80"
        width="80"
        color="#38bdf8"
        strokeWidth="4"
        animationDuration="0.8"
        ariaLabel="rotating-lines-loading"
      />
      <p className="text">Loading… </p>
    </div>
  );
}

export default Loader;
