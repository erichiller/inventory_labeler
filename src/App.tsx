import * as React from "react";
import * as ReactDOM from "react-dom";

import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { ItemsTable } from "./components/ItemsTable";
import { GlobalSearch } from "./components/GlobalSearch";

import {
  Customizer,
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize
} from "office-ui-fabric-react";
import { FluentCustomizations } from "@uifabric/fluent-theme";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { EditPanel } from "./components/EditPanel";
import "office-ui-fabric-core/dist/css/fabric.css";
import "./App.css";
// import logo from ''; // Tell Webpack this JS file uses this image

initializeIcons();

class App extends React.Component {

    
  public state = {
      selectedKey: 'item_table' ,
      selectedItem: PivotItem
  };

  private _handleLinkClick = (item?: PivotItem): void => {

    this.setState({
      selectedKey: item!.props.itemKey,
      selectedItem: item!
    });
  };

  private _getTabId = (itemKey: string): string => {
    return `ShapeColorPivot_${itemKey}`;
  };
  public render() {
    return (
      <Customizer {...FluentCustomizations}>
        <div className="App">
          <div className="ms-Grid HeaderRow" dir="ltr">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm1"> </div>
              <div className="ms-Grid-col ms-sm1">
                <img src="/img/hiller-pro-icon-set/ms-icon-70x70.png" alt="Logo" />
              </div>
              <div className="ms-Grid-col ms-sm6">
                {/* <Pivot
                  linkSize={PivotLinkSize.large}

                  // linkFormat={PivotLinkFormat.tabs}
                > */}
                <Pivot selectedKey={this.state.selectedKey} linkSize={PivotLinkSize.large} onLinkClick={this._handleLinkClick} headersOnly={true} getTabId={this._getTabId}>

                  <PivotItem
                    headerText="Items Table"
                    itemIcon="Table"
                    itemKey="item_table"
                    // itemCount=""
                  >
                    <ItemsTable />
                  </PivotItem>
                    
                  <PivotItem headerText="Orders Table" itemIcon="Table" itemKey="order_table">
                    <DefaultButton>I am a button.</DefaultButton>
                  </PivotItem>
                </Pivot>
              </div>
              <div className="ms-Grid-col ms-sm4">
                <GlobalSearch />
              </div>
            </div>
            
  <div className="ms-Grid-row">
    <div className="ms-Grid-col ms-sm12">{this.state.selectedItem}</div>
  </div>
          </div>
        </div>
          <EditPanel />
      </Customizer>
    );
  }
}

export default App;
