// import * as React from "react";
// import Button from "react-uwp/Button";

// export default class Split extends React.Component {
//   public render() {
//     return (
//       <Button tooltip="Mini Tooltip" />
//     )
//   }
// }

import * as React from "react";
import * as PropTypes from "prop-types";

// import SplitView, {SplitViewPane} from "react-uwp/SplitView";
import SplitView from "./uwp/SplitView";
import SplitViewPane from "./uwp/UwpDock";
// import SplitViewPane from "./uwp/SplitViewPane";
import Toggle from "react-uwp/Toggle";
import DropDownMenu from "react-uwp/DropDownMenu";
import { theme } from "../App";



import { Resizable, ResizableBox } from 'react-resizable';

export interface SimpleExampleState {
  expanded?: boolean;
  displayMode?: "compact" | "overlay";
}

export default class Split extends React.Component<{}, SimpleExampleState> {
  static contextTypes = { theme: PropTypes.object };
  context!: { theme: ReactUWP.ThemeType };

  state: SimpleExampleState = {
    expanded: true,
    displayMode: "compact"
  };

  render() {
    const { expanded, displayMode } = this.state;

    return (
      <SplitView
        defaultExpanded={expanded}
        displayMode={displayMode}
        onClosePane={() => {
          this.setState({ expanded: false });
        }}
        style={{
          width: "100%",
          margin: "20px auto",
          background: theme.acrylicTexture40!.background!,
          // height: 640
        }}
        paneStyle={{
          padding: "20px",
          margin: 0,
        }}
      >
        <div>
          <Toggle
            label="Toggle SplitView"
            defaultToggled={expanded}
            background="none"
            style={{ margin: 20 }}
            onToggle={nextExpanded => {
              this.setState({ expanded: nextExpanded });
              // this.set
            }}
          />
        </div>
        {/* <ResizableBox 
          width={200}
          height={200}
          // draggableOpts={{...}}
          minConstraints={[100, 100]}
          maxConstraints={[300, 300]}> */}

        <SplitViewPane>
          SplitViewPane
        </SplitViewPane>
        {/* <span>Contents</span> */}
        {/* </ResizableBox> */}
      </SplitView>
    );
  }
}