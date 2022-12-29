import Icon from "../Icon/Icon";

import "./Checkbox.sass";

export default function Checkbox(props: {
  isActive: boolean,
  contents?: JSX.Element | string

  onTriggered?(): void
}) {

  // Render
  return (
    <div className="Checkbox" onClick={() => props.onTriggered?.()}>
      <div className="icon">
        <Icon icon={props.isActive ? "checkbox-9" : "shape-10"} />
      </div>

      {props.contents ? (
        <div className="contents">{props.contents}</div>
      ) : null}
    </div>
  );
}
