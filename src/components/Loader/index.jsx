import React from "react";
import "./index.css";

const Loader = () => {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
