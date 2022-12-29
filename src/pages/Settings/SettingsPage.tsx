import React, {useState} from "react";

import "./SettingsPage.sass";
import Switch from "../../components/Switch/Switch";

export default function SettingsPage() {

  const [settings, setSettings] = useState<{[key: number]: boolean;}>({
    0: false,
    1: true,
    2: false,
    3: true,
    4: false,
    5: false,
    6: true,
    7: false,
  });

  function updateSetting(i: number, state: boolean) {
    const _settings = {...settings};

    _settings[i] = state;

    setSettings(_settings);
  }

  // Render
  return (
    <div className="SettingsPage">

      <h1>Settings</h1>

      <div className="settings-group-label">Main settings</div>
      <div className="rows">

        <div className="row">
          <div>Setting 1</div>
          <div><Switch isActive={settings[0]} onTriggered={() => updateSetting(0, !settings[0])} /></div>
        </div>
        <div className="row">
          <div>Setting 2</div>
          <div><Switch isActive={settings[1]} onTriggered={() => updateSetting(1, !settings[1])} /></div>
        </div>
        <div className="row">
          <div>Setting 3</div>
          <div><Switch isActive={settings[2]} onTriggered={() => updateSetting(2, !settings[2])} /></div>
        </div>
      </div>

      <div className="settings-group-label">Some settings</div>
      <div className="rows">

        <div className="row">
          <div>Setting 4</div>
          <div><Switch isActive={settings[3]} onTriggered={() => updateSetting(3, !settings[3])} /></div>
        </div>
        <div className="row">
          <div>Setting 5</div>
          <div><Switch isActive={settings[4]} onTriggered={() => updateSetting(4, !settings[4])} /></div>
        </div>
      </div>

      <div className="settings-group-label">Powered by Congritta</div>
      <div className="rows">

        <div className="row">
          <div>Setting 6</div>
          <div><Switch isActive={settings[5]} onTriggered={() => updateSetting(5, !settings[5])} /></div>
        </div>
        <div className="row">
          <div>Setting 7</div>
          <div><Switch isActive={settings[6]} onTriggered={() => updateSetting(6, !settings[6])} /></div>
        </div>
        <div className="row">
          <div>Setting 8</div>
          <div><Switch isActive={settings[7]} onTriggered={() => updateSetting(7, !settings[7])} /></div>
        </div>
      </div>
    </div>
  );
}
