import axios from "axios";
import { set } from "js-cookie";
import { useState, useEffect } from "react";

const Toggle = ({ handleSort, toggle }) => {
  return (
    <div className="wrg-toggle">
      {/* <div className="wrg-toggle-container">
        <div className="wrg-toggle-check">
          <span></span>
        </div>
        <div className="wrg-toggle-uncheck">
          <span></span>
        </div>
      </div>
      <div className="wrg-toggle-circle"></div> */}
      <input
        // className="wrg-toggle-input"
        type="checkbox"
        aria-label="Toggle Button"
        onChange={handleSort}
      />
    </div>
  );
};

export default Toggle;
