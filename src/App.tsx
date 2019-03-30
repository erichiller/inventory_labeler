import * as React from "react";
import * as ReactDOM from "react-dom";
import { ThemeType } from "react-uwp";
import LightTheme from "react-uwp/styles/lightTheme";
import HillerIcon from "./assets/hiller_logo_2.svg";
import GlobalSearch from "./components/GlobalSearch";
import TabsIconable, { Tab } from "./components/Tabs";

import "office-ui-fabric-core/dist/css/fabric.css";
import "./App.css";

import { faBox, faChartPie, faCubes, faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { DefaultButton } from "office-ui-fabric-react/lib/Button";
// import { ItemsTable } from "./components/ItemsTable";
// import { GlobalSearch } from "./components/GlobalSearch";
import ItemsTable from "./components/ItemsTable";
import Split from "./components/Split";

import Theme, { getTheme, Theme as UWPThemeProvider } from "react-uwp/Theme";
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

const theme: ThemeType = getTheme({
  accent: "#0078D7",      // set accent color
  desktopBackgroundImage: "img/jonathan-singer-724077-unsplash.jpg", // set global desktop background image
  themeName: "light",     // set custom theme
  useFluentDesign: true,  // use new fluent design.
});

class App extends React.Component {
  public render() {

const baseStyle: React.CSSProperties = {
  display: "block",
  margin: "10px 0",
  height: 400,
};
const tabStyle: React.CSSProperties = {
  background: LightTheme.acrylicTexture40!.background!,
};

return (
      <UWPThemeProvider
        theme={theme}
      >

      <TabsIconable
          tabStyle={tabStyle}
          style={baseStyle}
          tabTitleStyle={{ marginRight: 15 }}
          logo={<img id="HillerIcon" src={HillerIcon} alt="Logo" />}
          search={GlobalSearch}
          renderTitle={(title: string, icon?: React.ReactElement) => (
            <span>
              { icon }
              <span style={{ marginLeft: 12 }}>{title}</span>
            </span>
          )}
        >
          <Tab title="Items" icon={ <FontAwesomeIcon icon={faBox} /> }>
            <Split />
          </Tab>

          <Tab title="Orders" icon={ <FontAwesomeIcon icon={faCubes} /> }>
            NUIFace
          </Tab>

          <Tab title="Labels" icon={ <FontAwesomeIcon icon={faTags} /> }>
            Game
          </Tab>

          <Tab title="Stats" icon={ <FontAwesomeIcon icon={faChartPie} /> }>
            Color
          </Tab>
        </TabsIconable>
        <ItemsTable />
        {/* <GlobalSearch /> */}
      </UWPThemeProvider>
    );
  }
}

export default App;
export { theme };
