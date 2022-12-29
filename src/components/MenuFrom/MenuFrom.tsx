import "./MenuFrom.sass";
import {useCallback, useEffect, useRef, useState} from "react";
import classNames from "classnames";

const itemHeight = 40;

export interface Option {
  value: string,
  element: JSX.Element | string;
}

export default function MenuFrom(props: {
  child: JSX.Element,

  options: Option[],

  onTriggered?(value: string): void;
}) {

  const [isActive, setIsActive] = useState(false);
  const childRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<[number, number]>([0, 0]);

  // Determine where to reveal menu items

  function makeItemsListDirection() {

    if(!childRef.current) {throw new Error("Element not found");}

    const rect = childRef.current.getBoundingClientRect();

    positionRef.current[0] = !((rect.bottom + Math.min(itemHeight * props.options.length, 200) + 5 + 20) > window.innerHeight) ? (rect.bottom + 5) : (rect.top - Math.min(itemHeight * props.options.length, 200) - 5);
    positionRef.current[1] = !((rect.left + 180 + 5 + 20) > window.innerWidth) ? rect.left : rect.right - 180;
  }

  const makeItemsListDirectionMemo = useCallback(makeItemsListDirection, [props.options.length]);

  // Closer handler
  function closerHandler() {

    const handler = (event: any) => {

      if(childRef.current?.contains(event.target)) {return;}

      setIsActive(false);
      window.removeEventListener("click", handler);
    };

    setTimeout(() => window.addEventListener("click", handler), 0);
  }

  useEffect(() => {
    makeItemsListDirectionMemo();
    if(isActive) {closerHandler();}
  }, [isActive, makeItemsListDirectionMemo]);
  // Render
  return (
    <div
      className="MenuFrom" style={{
        "--itemHeight": `${itemHeight}px`,
        "--menuTopProperty": `${0 - Math.min(props.options.length * itemHeight, 200) - 5}px`,
      } as any} onClick={() => {setIsActive(!isActive); makeItemsListDirection();}}
    >
      <div ref={childRef} className="child">{props.child}</div>

      <div
        className={classNames("menu", {
          _active: isActive,
        })}
        style={{
          top: positionRef.current[0],
          left: positionRef.current[1],
        }}
      >
        {props.options.map((option) => (
          <div
            key={option.value}
            className="menu-item"
            onClick={() => props.onTriggered ? props.onTriggered(option.value) : null}
          >
            {option.element}
          </div>
        ))}
      </div>
    </div>
  );
}
