import React from "react";
import DietImg from "../../assets/diet.jpg";
import VitaminImg from "../../assets/vitamins.jpg";
import "./styles.scss";

const Directory = (props) => {
  return (
    <div className="directory">
      <div className="wrap">
        <div
          className="item"
          style={{
            backgroundImage: `url(${DietImg})`,
          }}
        >
          <a>Shop Diet Supplements</a>
        </div>
        <div
          className="item"
          style={{
            backgroundImage: `url(${VitaminImg})`,
          }}
        >
          <a>Shop Vitamin Supplments</a>
        </div>
      </div>
    </div>
  );
};
export default Directory;
