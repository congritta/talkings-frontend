import MenuFrom, {Option} from "../MenuFrom/MenuFrom";

import "./Select.sass";
import Icon from "../Icon/Icon";

export default function Select(props: {

  options: Option[],
  value: string,

  onTriggered?(value: string): void;
}) {

  function getSelectedOption(): Option {
    return props.options.find((_option) => _option.value === props.value) as Option;
  }

  // Render
  return (
    <div className="Select">
      <MenuFrom
        child={<div className="selected-option">
          {getSelectedOption().element}
          <Icon icon="arrow-65" />
        </div>} options={props.options} onTriggered={props.onTriggered}
      />
    </div>
  );
}
