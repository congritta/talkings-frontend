import React from "react";

import "./Loader.sass";

export default function Loader(props: {
  color: string,
  size: number,
  width: number,
  spinsPerSecond: number
}) {
  return (
    <div
      className="Loader"
      style={{
        width: props.size,
        height: props.size,
        borderColor: props.color,
        borderWidth: props.width,
        animationDuration: `${1 / props.spinsPerSecond}s`
      }}
    />
  );
}
