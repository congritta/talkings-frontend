import React from "react";

import iconsSvg from "./icons.svg";

export default function Icon(props: {
  icon: string
}) {
  return (
    <svg viewBox="0 0 24 24">
      <use xlinkHref={iconsSvg + `#${props.icon}`} />
    </svg>
  );
}
