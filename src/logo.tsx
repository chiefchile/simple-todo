import { default as React } from "react";
interface Props {
  isCenter: boolean;
}

export const Logo = (props: Props) => {
  let className = props.isCenter ? "logo" : "logo logo-main";
  return (
    <div className={className}>
      <span id="logo-slash">// </span>TODO
    </div>
  );
};
