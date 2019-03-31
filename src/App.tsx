import * as React from "react";
import * as ReactDOM from "react-dom";
import { ThemeType } from "react-uwp";
import LightTheme from "react-uwp/styles/lightTheme";
import HillerIcon from "./assets/hiller_logo_2.svg";
import GlobalSearch from "./components/GlobalSearch";
import { Tab, TabView, TabGroup, TabBar } from "./components/Tabs";

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

const theme: ThemeType = getTheme({
  accent: "#0078D7",      // set accent color
  desktopBackgroundImage: "img/jonathan-singer-724077-unsplash.jpg", // set global desktop background image
  themeName: "light",     // set custom theme
  useFluentDesign: true,  // use new fluent design.
});

class App extends React.Component {
  public render() {

    const topBarStyle: React.CSSProperties = {
      // display: "block",
      margin: "10px 0",
      height: "40px",
      verticalAlign: "bottom",
    display: "table-cell",
      // height: 400,
    };
    const tabStyle: React.CSSProperties = {
      background: LightTheme.acrylicTexture40!.background!,
    };

    return (
      <UWPThemeProvider
        theme={theme}
      >
        <TabGroup>
      <div style={topBarStyle}>
          <img id="HillerIcon" src={HillerIcon} style={{verticalAlign: "bottom", marginTop: "5px"}} alt="Logo" />
          <TabBar
            tabStyle={tabStyle}
            // style={baseStyle}
            tabTitleStyle={{ marginRight: 15 }} />
          <GlobalSearch />
        </div>


          <TabView/>
          <Tab title="Items" style={{margin: "5px"}} icon={<FontAwesomeIcon icon={faBox} />}>
              <Split />
          </Tab>
          <Tab title="Orders" icon={<FontAwesomeIcon icon={faCubes} />}>
            NUIFace
            <ItemsTable />
          </Tab>
          <Tab title="Labels" icon={<FontAwesomeIcon icon={faTags} />}>
            Game
          </Tab>

          <Tab title="Stats" icon={<FontAwesomeIcon icon={faChartPie} />}>
            Color
          </Tab>
          
        </TabGroup>
        {/* <GlobalSearch /> */}
      </UWPThemeProvider>
    );
  }
}



export default App;
export { theme };


