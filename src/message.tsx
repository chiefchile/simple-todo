import React, { useState, useEffect } from "react";
import IResult from "./result";

interface Props {
  result: IResult | null;
  isShort: boolean;
}

export function Message(props: Props) {
  const [style, setStyle] = useState("");

  useEffect(() => {
    function changeStyle() {
      if (props.result) {
        let tempStyle = null;
        if (props.isShort) {
          tempStyle = "alert short-alert-fixed ";
        } else {
          tempStyle = "alert long-alert-fixed ";
        }

        if (props.result.wasSuccessful()) {
          tempStyle += "alert-success";
        } else {
          tempStyle += "alert-danger";
        }

        setStyle(tempStyle);
        addFadeOutStyle();
      }
    }

    function addFadeOutStyle() {
      setTimeout(() => {
        setStyle(style + " fade-out");
      }, 3000);
    }

    changeStyle();
  }, [props.result, props.isShort, style]);

  if (props.result) {
    return (
      <div className={style} role="alert">
        {props.result.msg}
      </div>
    );
  } else {
    return <div />;
  }
}
