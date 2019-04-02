import * as PropTypes from "prop-types";
import * as React from "react";
import { CustomCSSProperties } from "react-uwp";

// import Dock from "react-dock";
import Dock from "./Dock";


import "./SplitViewPane.css";

export interface DataProps {
  isVisible: boolean;
  // children: HTMLDivElement;
}

export interface SplitViewPaneProps extends DataProps, React.HTMLAttributes<HTMLDivElement> { }

export class SplitViewPane extends React.Component<SplitViewPaneProps> {
  public static contextTypes = { theme: PropTypes.object };
  public context!: { theme: ReactUWP.ThemeType };
  public rootElm!: HTMLDivElement;
  static defaultProps: SplitViewPaneProps = {
    isVisible: true
  }
  // state: DataProps = {
  //     expanded: this.props.isVisible
  // };

  // constructor (props: SplitViewPaneProps){
  //   super(props);
  //   // this.props.isVisible = true;

  // }


  public render() {
    const { children, style, isVisible, ...attributes } = this.props;
    const { theme } = this.context;


    console.log("splitviewpane");
    console.log(style);
    console.log(attributes);
    console.log(theme);
    if (theme.prefixStyle === undefined) {
      theme.prefixStyle = (style?: CustomCSSProperties) => style!;
    }
    if (this.rootElm !== null) {
      return (

        // <Dock position='right' isVisible={true}>
        <Dock position='right' isVisible={this.props.isVisible}>
          <div
            {...attributes}
            style={theme.prefixStyle((style !== undefined ? style : {})) ? theme.prefixStyle((style !== undefined ? style : {})) : {}}
            ref={(rootElm) => this.rootElm = rootElm!}
          >
            {children}
          </div>
        </Dock>
      );
    }
    return (<div>broken</div>);
  }
}

export default SplitViewPane;
