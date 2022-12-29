import "./Avatar.sass";

const colors = ["#2A2D34", "#009DDC", "#F26430", "#6761A8", "#009B72"];

export default function Avatar(props: {
  size: number,
  color: 0 | 1 | 2 | 3 | 4,
  firstName: string;
}) {

  return (
    <div
      className="Avatar"
      style={{
        width: props.size,
        height: props.size,
        background: colors[props.color],
        fontSize: props.size * .5
      }}
    >
      {props.firstName.slice(0, 1)}
    </div>
  );
}
