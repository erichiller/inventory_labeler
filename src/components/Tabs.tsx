import * as PropTypes from "prop-types";
import * as React from "react";
import {CSSProperties} from "react";


import CustomAnimate, { slideRightInProps } from "react-uwp/Animate/CustomAnimate";
import { TabsProps, TabsState, DataProps} from "react-uwp/Tabs";
import { lightTheme, getTheme, CustomCSSProperties } from "react-uwp";

// thanks! https://github.com/Microsoft/TypeScript/issues/3402
type Weaken<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? any : T[P];
};
interface ITabsProps extends Weaken<TabsProps, 'renderTitle'> {
  renderTitle:  (title: string, icon?: React.ReactElement) => React.ReactNode;
  logo?: React.ReactNode;
  search?: React.Component;
}

export default class Tabs extends React.Component<ITabsProps, TabsState> {
  static defaultProps: ITabsProps = {
    animateEnterStyle: {
      opacity: 1,
      transform: "translateX(0)",
    },
    animateLeaveStyle: {
      opacity: 0,
      transform: "translateX(100%)",
    },
    animateMode: "in",
    animateSpeed: 500,
    renderTitle: (title?: string) => title,
    useAnimate: true,
  };

  state: TabsState = {
    tabFocusIndex: this.props.defaultFocusTabIndex || 0,
  };

  componentWillReceiveProps(nextProps: ITabsProps) {
    const { defaultFocusTabIndex } = nextProps;
    const { tabFocusIndex } = this.state;
    if (defaultFocusTabIndex !== void 0 && defaultFocusTabIndex !== tabFocusIndex) {
      this.setState({
        tabFocusIndex: defaultFocusTabIndex
      });
    }
  }

  static contextTypes = { theme: PropTypes.object };
  context!: { theme: ReactUWP.ThemeType };

  render() {
    const {
      defaultFocusTabIndex,
      tabTitleStyle,
      tabTitleFocusStyle,
      children,
      tabStyle,
      renderTitle,
      useAnimate,
      animateMode,
      animateSpeed,
      animateEnterStyle,
      animateLeaveStyle,
      className,
      style,
      logo,
      search,
      ...attributes
    } = this.props;
    const { theme } = this.context;
    const { tabFocusIndex } = this.state;

    const childrenArray = React.Children.toArray(children);
    const isAvailableArray = childrenArray && childrenArray.length > 0;
    const tabs: Tab[] | false  = isAvailableArray && childrenArray.filter((child: any) => child.type && (child.type === Tab || child.type.displayName === "Tab")) as any;
    const currTab: Tab | false = tabs && tabs[tabFocusIndex!];

    const inlineStyles = getStyles(this);
    const styles = theme.prepareStyles({
      className: "tabs",
      styles: inlineStyles
    });

    const normalRender = (
      <div key={`${tabFocusIndex}`} {...styles.tabStyle}>
        {currTab}
      </div>
    );
    const NewComponent = search !== undefined ? search({}) : <div>nothing</div>
    return (
      <div
        {...attributes}
        style={styles!.root!.style}
        className={styles!.root!.className}
      >
        <div {...styles.titles}>
          {logo ? logo : ""}
          {tabs && tabs.map((tab, index) => {
            const tabTitle = tab.props.title || `Tabs Items ${index + 1}`;
            return (
              <span
                {...(index === tabFocusIndex ? styles.titleFocus : styles.title)}
                key={`${index}`}
                onClick={() => this.setState({ tabFocusIndex: index })}
              >
                {renderTitle(tabTitle, tab.props.icon)}
              </span>
            );
          })}
          {console.log(search)}
          <div>{search}</div>
        </div>
        {useAnimate ? (
          <CustomAnimate
            mode={animateMode}
            speed={animateSpeed}
            enterStyle={animateEnterStyle}
            leaveStyle={animateLeaveStyle}
            wrapperStyle={{ width: "100%", height: "100%", ...tabStyle }}
            appearAnimate={false}
          >
            {normalRender}
          </CustomAnimate>
        ) : normalRender}
      </div>
    );
  }
}

function getStyles(Tabs: Tabs): {
  root?: React.CSSProperties;
  titles?: React.CSSProperties;
  title?: React.CSSProperties;
  titleFocus?: React.CSSProperties;
  tabStyle?: React.CSSProperties;
} {
  const {
    context: { theme },
    props: {
      tabTitleStyle,
      tabTitleFocusStyle,
      tabStyle,
      style
    }
  } = Tabs;
  const prefixStyle = ( theme.prefixStyle !== undefined ? theme.prefixStyle : ( style: CustomCSSProperties ) => ( {} ) );

  return {
    root: prefixStyle({
      color: theme.baseMediumHigh,
      display: "inline-block",
      verticalAlign: "middle",
      overflow: "hidden",
      ...style
    }),
    titles: prefixStyle({
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      width: "100%",
      overflow: "auto"
    }),
    title: prefixStyle({
      color: theme.baseHigh,
      borderBottom: `1px solid transparent`,
      fontWeight: "lighter",
      cursor: "pointer",
      fontSize: 18,
      padding: "4px 12px",
      transition: "all .25s",
      ...tabTitleStyle
    }),
    titleFocus: prefixStyle({
      color: theme.baseHigh,
      fontWeight: "lighter",
      cursor: "pointer",
      fontSize: 18,
      padding: "4px 12px",
      transition: "all .25s",
      ...tabTitleStyle,
      borderBottom: `2px solid ${theme.accent}`,
      ...tabTitleFocusStyle
    }),
    tabStyle: prefixStyle({
      width: "100%",
      height: "100%",
      ...tabStyle
    })
  };
}



export interface TabDataProps {
  icon?: React.ReactElement;
}

export interface TabProps extends TabDataProps, React.HTMLAttributes<HTMLDivElement> {}

export class Tab extends React.Component<TabProps> {
  static contextTypes = { theme: PropTypes.object };
  context!: { theme: ReactUWP.ThemeType };

  render() {
    const { children, style, ...attributes } = this.props;
    const { theme } = this.context;

    const prefixStyle = ( theme.prefixStyle !== undefined ? theme.prefixStyle : ( style: CustomCSSProperties ) => ( {} ) );
    const styleSafe = ( style !== undefined ? style : {} );
    return (
      <div
        {...attributes}
        style={{
          display: "inline-block",
          verticalAlign: "middle",
          width: "100%",
          ...prefixStyle(styleSafe)
        }}
      >
        {children}
      </div>
    );
  }
}