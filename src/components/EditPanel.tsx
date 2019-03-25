import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import * as React from "react";

export interface EditPanelState {
  showPanel: boolean;
}

export class EditPanel extends React.Component<{}, EditPanelState> {
  public state = {
    showPanel: false
  };

  public render() {
    return (
      <div>
        <DefaultButton text="Open panel" onClick={this._showPanel} />
        <Panel
          isOpen={this.state.showPanel}
          isHiddenOnDismiss={true}
          isBlocking={false}
        //   isLightDismiss={true}
          headerText="Edit Item #"
          onDismiss={this._hidePanel}
          type={PanelType.custom}
          customWidth="400px"
          hasCloseButton={false}
        >
          <span>
            When dismissed, this panel will be hidden instead of destroyed.
          </span>
        </Panel>
      </div>
    );
  }

  private _showPanel = (): void => {
    this.setState({ showPanel: true });
  };

  private _hidePanel = (): void => {
    this.setState({ showPanel: false });
  };
}
