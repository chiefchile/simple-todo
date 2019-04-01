import { default as React } from "react";
interface Props {
  isCenter: boolean;
}

export const Logo = (props: Props) => {
  let className = props.isCenter ? "logo-text" : "logo-text logo-main";
  return (
    <h3 className={className}>
      <span id="logo-slash">/</span>/ TODO
    </h3>
  );
};
