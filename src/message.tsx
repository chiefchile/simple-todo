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
        return addFadeOutStyle();
      }
    }

    function addFadeOutStyle() {
      const timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
        setStyle((prev) => prev + " fade-out");
      }, 3000);
      return timeout;
    }

    const timeout = changeStyle();
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [props.result]);

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
