import "./Switch.sass";
import classNames from "classnames";

export default function Switch(props: {
  isActive: boolean,

  onTriggered?(): void
}) {

  // Render
  return (
    <div className={classNames("Switch", {_active: props.isActive})} onClick={() => props.onTriggered?.()}>
      <div className="thumb" />
    </div>
  );
}
