import * as PropTypes from "prop-types";
import * as React from "react";
import { CSSProperties } from "react";


import CustomAnimate, { slideRightInProps } from "react-uwp/Animate/CustomAnimate";
import { TabsProps, TabsState, DataProps } from "react-uwp/Tabs";
import { lightTheme, getTheme, CustomCSSProperties } from "react-uwp";
import ReactDOM from "react-dom";
import reactBootstrapTable2Editor from "react-bootstrap-table2-editor";
import { isArray } from "util";

// thanks! https://github.com/Microsoft/TypeScript/issues/3402
type Weaken<T, K extends keyof T> = {
    [P in keyof T]: P extends K ? any : T[P];
};
// interface WeakTabProps extends Weaken<TabsProps, 'id'> { }
interface ITabsProps extends Weaken<TabsProps, 'renderTitle'> {
    renderTitle: (title: string, icon?: React.ReactElement) => React.ReactNode;
    logo?: React.ReactNode;
}

// interface ITabGroupContext {
//     activeTab: Tab;
//     actions: {};
//     tabs: [],
// }



export const TabsContext = React.createContext({
    activeTab: 0,
    actions: {
        switchTab: (tab: number) => { },
    },
    tabs: {},
});

export class TabGroup extends React.Component {
    state = {
        activeTab: 0,
        tabs: {},
        nonTabs: {}
    };

    render() {
        if (isArray(this.props.children)) {
            // console.log("# of children"); // console.log(this.props.children.length);
            this.props.children.map((child) => {
                this.state.tabs = React.Children.toArray(this.props.children).filter(child => 'title' in (child as React.Component).props);
                this.state.nonTabs = React.Children.toArray(this.props.children).filter(child => !( 'title' in (child as React.Component).props) );
            })
        } //else { /** console.log("no child found") **/ }
        return (
            <React.Fragment>
                <TabsContext.Provider
                    value={{
                        activeTab: this.state.activeTab,
                        actions: {
                            switchTab: (tab: number) => {
                                this.setState({
                                    activeTab: tab,
                                });
                            }
                        },
                        tabs: this.state.tabs,
                    }}
                >
                    {this.state.nonTabs}
                </TabsContext.Provider>
            </React.Fragment>
        );
    }
}

interface ITabStyleProvider {
    context: { theme: ReactUWP.ThemeType }
    props: {
        tabTitleStyle?: React.CSSProperties,
        tabTitleFocusStyle?: React.CSSProperties,
        tabStyle?: React.CSSProperties,
        style?: React.CSSProperties
    }
};


function getStyles(Tabs: ITabStyleProvider): {
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
            style,
        }
    } = Tabs;
    const prefixStyle = (theme.prefixStyle !== undefined ? theme.prefixStyle : (style: CustomCSSProperties) => ({}));

    return {
        root: prefixStyle({
            color: theme.baseMediumHigh,
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "middle",
            ...style,
        }),
        title: prefixStyle({
            borderBottom: `1px solid transparent`,
            color: theme.baseHigh,
            cursor: "pointer",
            fontSize: 18,
            fontWeight: "lighter",
            padding: "4px 12px",
            transition: "all .25s",
            ...tabTitleStyle,
        }),
        titles: prefixStyle({
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            overflow: "auto",
            width: "100%",
        }),
        titleFocus: prefixStyle({
            color: theme.baseHigh,
            cursor: "pointer",
            fontSize: 18,
            fontWeight: "lighter",
            padding: "4px 12px",
            transition: "all .25s",
            ...tabTitleFocusStyle,
            ...tabTitleStyle,
            borderBottom: `2px solid ${theme.accent}`,
        }),
        tabStyle: prefixStyle({
            height: "100%",
            width: "100%",
            ...tabStyle,
        }),
    };
}

export class TabBar extends React.Component<ITabsProps, {}> {

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
        id: "TabsDefaultId",
        renderTitle: (title?: string) => title,
        useAnimate: true,
    };
    state = {
        tabFocusIndex: 0,
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
            ...attributes
        } = this.props;


        const { theme } = this.context;
        const inlineStyles = getStyles(this);
        const styles = theme.prepareStyles({
            className: "tabContent",
            styles: inlineStyles
        });
        // // console.log("styles:")
        // // console.log(styles!.root!.style)
        // // console.log("inlineStyles:")
        // // console.log(inlineStyles)
        return (

            <div
                {...attributes}
                style={styles!.root!.style}
                className={styles!.root!.className}
            >
            <div {...styles.titles}>
                <TabsContext.Consumer>
                    {
                        ({ activeTab, actions, tabs }) => {
                            // console.log("tabs =>")
                            // console.log(tabs);
                            // console.log("close tabs")
                            // if (! tabs.isArray()){
                            //     return ""
                            // }
                            return (
                                (tabs && (tabs as Array<Tab>).map((tab, index) => {
                                    //{ console.log(tab) }
                                    //{ console.log("this " + tab.props.title + "is Active?" + (index === activeTab)) }
                                    return (<span
                                        {...(index === activeTab ? styles.titleFocus : styles.title)}
                                        key={`${index}`}
                                        onClick={() => {
                                            actions.switchTab(index);
                                        }
                                        }
                                    >
                                        {tab.props.icon}
                                        <span style={{ marginLeft: 12 }}>{tab.props.title}</span>

                                    </span>)
                                })
                                )
                            )
                        }}
                </TabsContext.Consumer>
                </div></div>
        );
    }

}

export class TabView extends React.Component<ITabsProps, {}> {

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
          ...attributes
        } = this.props;
        const { theme } = this.context;
        const inlineStyles = getStyles(this);
        const styles = theme.prepareStyles({
            className: "tabContent",
            styles: inlineStyles
        });
        const normalRender = (activeTab: number, tab: Tab) => (
            <div key={`${activeTab}`} {...styles.tabStyle}>
              {tab}
            </div>
          );
        // console.log("--->Theme in TabView--->");
        // console.log(theme);
        // console.log("<---Theme in TabView<---");

        const prefixStyle = (theme.prefixStyle !== undefined ? theme.prefixStyle : (style: CustomCSSProperties) => ({}));
        const styleSafe = (style !== undefined ? style : {});
        return (

            <TabsContext.Consumer>
                {( {activeTab, tabs }) => (
                    useAnimate ? (
                        <CustomAnimate
                          mode={animateMode}
                          speed={animateSpeed}
                          enterStyle={animateEnterStyle}
                          leaveStyle={animateLeaveStyle}
                          wrapperStyle={{ width: "100%", height: "100%", ...tabStyle }}
                          appearAnimate={false}
                        >
                          {normalRender(activeTab, ( tabs as Array<Tab>)[activeTab])}
                        </CustomAnimate>
                      ) : normalRender
                    // <div
                    //     {...attributes}
                    //     style={{
                    //         display: "inline-block",
                    //         verticalAlign: "middle",
                    //         width: "100%",
                    //         ...prefixStyle(styleSafe)
                    //     }}
                    // >
                    //     {// console.log("--->tabs--->")}
                    //     {// console.log(activeTab)}
                    //     {// console.log("<---tabs<---")}
                    //     {/* {// console.log(children)} */}
                    //     xxx
                    //     {( tabs as Array<Tab>)[activeTab]}
                    //     xxx
                    // </div>

                )}
            </TabsContext.Consumer>
        );
    }

}



export interface TabDataProps {
    icon?: React.ReactElement;
}

export interface TabProps extends TabDataProps, React.HTMLAttributes<HTMLDivElement> { }


/**
 * Tab contains content to be displayed.
 * Triggered from Tab selector in TabBar
 * Displayed in TabView
 */
export class Tab extends React.Component<TabProps> {
    static contextTypes = { theme: PropTypes.object };
    context!: { theme: ReactUWP.ThemeType };

    constructor(props: TabProps) {
        super(props);
    }

    render() {
        const { children, style, ...attributes } = this.props;
        const { theme } = this.context;

        const prefixStyle = (theme.prefixStyle !== undefined ? theme.prefixStyle : (style: CustomCSSProperties) => ({}));
        const styleSafe = (style !== undefined ? style : {});
        return (

            <TabsContext.Consumer>
                {(value) => (

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

                )}
            </TabsContext.Consumer>
        );
    }
}

