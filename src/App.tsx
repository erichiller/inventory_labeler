import * as React from "react";
import * as ReactDOM from "react-dom";
import LightTheme from "react-uwp/styles/lightTheme";
import { Tab } from "react-uwp/Tabs";
import TabsIconable, { ITabTitle } from "./components/Tabs";

import "office-ui-fabric-core/dist/css/fabric.css";
import "./App.css";

import { faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { DefaultButton } from "office-ui-fabric-react/lib/Button";
// import { ItemsTable } from "./components/ItemsTable";
// import { GlobalSearch } from "./components/GlobalSearch";
import ItemsTable from "./components/ItemsTable";
import Split from "./components/Split";

import { getTheme, Theme as UWPThemeProvider } from "react-uwp/Theme";
// import {
//   Customizer,
//   Pivot,
//   PivotItem,
//   PivotLinkFormat,
//   PivotLinkSize
// } from "office-ui-fabric-react";
// import { FluentCustomizations } from "@uifabric/fluent-theme";
// import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
// import { Icon } from "office-ui-fabric-react/lib/Icon";
// import { EditPanel } from "./components/EditPanel";
// import logo from ''; // Tell Webpack this JS file uses this image

// initializeIcons();

class App extends React.Component {
  public render() {
    
const baseStyle: React.CSSProperties = {
  display: "block",
  margin: "10px 0",
  height: 400
};
const tabStyle: React.CSSProperties = {
  background: LightTheme.acrylicTexture60!.background!,
};

return (
      <UWPThemeProvider
        theme={getTheme({
          accent: "#0078D7", // set accent color
          desktopBackgroundImage: "img/jonathan-singer-724077-unsplash.jpg", // set global desktop background image
          themeName: "light", // set custom theme
          useFluentDesign: true, // sure you want use new fluent design.
        })}
      >
<FontAwesomeIcon icon={faMicrochip} />
      <TabsIconable
          tabStyle={tabStyle}
          style={baseStyle}
          tabTitleStyle={{ marginRight: 40 }}
          renderTitle={(tabTitle: ITabTitle) => (
            <span>
              { tabTitle.icon }
              <span style={{ marginLeft: 12 }}>{tabTitle.text}</span>
            </span>
          )}
        >
          <Tab title="People">
            People
          </Tab>

          <Tab title="NUIFace">
            NUIFace
          </Tab>

          <Tab title="Game">
            Game
          </Tab>

          <Tab title="Color">
            Color
          </Tab>
        </TabsIconable>
        <Split />
        <ItemsTable />
      </UWPThemeProvider>
    );
  }
}

export default App;
