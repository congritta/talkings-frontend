import {Range as MasterRange} from "react-range";

import "./Range.sass";

export default function Range(props: {
  values: number[],

  onChange(values: number[]): void,

  min: number,
  max: number,
  step: number
}) {

  return (
    <div className="Range">
      <MasterRange
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={props.onChange} values={props.values}
        renderTrack={
          ({props, children}) => (
            <div {...props}
              className="track"
              style={{
                ...props.style,
              }}
            >
              {children}
            </div>
          )
        }
        renderThumb={
          ({props}) => (
            <div {...props}
              style={{
                ...props.style,
              }}
              className="thumb"
            />
          )
        }
      />
    </div>
  );
}
