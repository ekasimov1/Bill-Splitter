import { useEffect, useState } from "react";

export default function TipButton(props) {
  const handleButtonClick = () => {
    props.setCustomTip("");
    const myIndex = props.id - 1;
    props.setButtonStates((states) =>
      states.map((state, index) => {
        if (index === myIndex) {
          return !state;
        } else {
          return false;
        }
      })
    );
    props.setTip(!(props.number / 100 == props.tip) ? props.number / 100 : 0);
  };

  return (
    <div
      className={
        !props.buttonStates[props.id - 1] ? "tip-button" : "tip-button-active"
      }
      onClick={handleButtonClick}
    >
      {props.button}%
    </div>
  );
}
