import Icon from "../Icon/Icon";

import "./Radiobox.sass";

export default function Radiobox(props: {
  isActive: boolean,
  contents?: JSX.Element | string

  onTriggered?(): void
}) {

  // Render
  return (
    <div className="Radiobox" onClick={() => props.onTriggered?.()}>
      <div className="icon">
        <Icon icon={props.isActive ? "checkbox-28" : "circle-2"} />
      </div>

      {props.contents ? (
        <div className="contents">{props.contents}</div>
      ) : null}
    </div>
  );
}
