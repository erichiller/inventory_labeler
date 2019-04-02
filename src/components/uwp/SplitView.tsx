import { codes } from "keycode";
import * as PropTypes from "prop-types";
import * as React from "react";

import AddBlurEvent from "react-uwp/common/AddBlurEvent";
// import SplitViewPane, { SplitViewPaneProps } from "./SplitViewPane";
import SplitViewPane from "./UwpDock";
export { SplitViewPane };

export interface DataProps {
    displayMode?: "compact" | "overlay";
    expandedWidth?: number;
    defaultExpanded?: boolean;
    panePosition?: "left" | "right";
    paneStyle?: React.CSSProperties;
    onClosePane?: () => void;
    clickExcludeElms?: HTMLDivElement[];
}

export interface SplitViewProps extends DataProps, React.HTMLAttributes<HTMLDivElement> { }
export interface SplitViewState {
    expanded?: boolean;
}

const emptyFunc = () => { };
export class SplitView extends React.Component<SplitViewProps, SplitViewState> {
    public static defaultProps: SplitViewProps = {
        expandedWidth: 320,
        displayMode: "compact",
        panePosition: "right",
        onClosePane: emptyFunc,
    };
    public state: SplitViewState = {
        expanded: this.props.defaultExpanded,
    };

    public addBlurEvent = new AddBlurEvent();
    public rootElm!: HTMLDivElement;

    public componentWillReceiveProps(nextProps: SplitViewProps) {
        const { defaultExpanded } = nextProps;
        if (defaultExpanded !== void 0 && defaultExpanded !== this.state.expanded) {
            this.setState({
                expanded: defaultExpanded,
            });
        }
    }

    public addBlurEventMethod = () => {
        const { clickExcludeElms } = this.props;
        this.addBlurEvent.setConfig({
            addListener: this.state.expanded!,
            clickExcludeElm: clickExcludeElms ? [...clickExcludeElms, this.rootElm] : this.rootElm,
            blurCallback: () => {
                this.setState({
                    expanded: false,
                }, this.props.onClosePane);
            },
            blurKeyCodes: [codes.esc],
        });
    }

    public componentDidMount() {
        this.addBlurEventMethod();
    }

    public componentDidUpdate() {
        this.addBlurEventMethod();
    }

    public componentWillUnmount() {
        this.addBlurEvent.cleanEvent();
    }

    public static contextTypes = { theme: PropTypes.object };
    public context!: { theme: ReactUWP.ThemeType };


    public isSplitViewPane(input: SplitViewPane | any): input is SplitViewPane {
        return (input as SplitViewPane).props.isVisible !== undefined;
    }


    public render() {
        const {
            displayMode,
            expandedWidth,
            defaultExpanded,
            panePosition,
            children,
            paneStyle,
            onClosePane,
            className,
            clickExcludeElms,
            ...attributes
        } = this.props;
        const { theme } = this.context;
        const splitViewPanes: any[] = [];
        const childView: any[] = [];

        const inlineStyles = getStyles(this);
        const styles = theme.prepareStyles({
            className: "split-view",
            styles: inlineStyles,
        });

        if (children) {
            React.Children.forEach(children, (child: any, index) => {
                if (this.isSplitViewPane(child)) {
                    console.log(child);
                    console.log(" ... isSplitView ");
                    splitViewPanes.push(React.cloneElement( (child as any ), {
                        style: { ...styles.pane!.style, ...child.props.style },
                        className: styles.pane!.className,
                        key: index.toString(),
                        isVisible: this.state.expanded,
                    }));
                } else {
                    childView.push(child);
                }
            });
        }

        return (
            <div
                {...attributes}
                style={styles.root!.style}
                ref={(rootElm: HTMLDivElement) => this.rootElm = rootElm}
                className={theme.classNames!(styles.root!.className!, className!)}
            >
                {childView.length > 0 && childView}
                {splitViewPanes.length > 0 && splitViewPanes}
            </div>
        );
    }
}

function getStyles(splitView: SplitView): {
    root?: React.CSSProperties;
    pane?: React.CSSProperties;
} {
    const {
        context,
        props: {
            style,
            expandedWidth,
            displayMode,
            panePosition,
            paneStyle,
        },
        state: {
            expanded,
        },
    } = splitView;
    const { theme } = context;
    const { prefixStyle } = theme;
    const isCompact = displayMode === "compact";
    const isOverlay = displayMode === "overlay";
    const panePositionIsRight = panePosition === "right";
    const transition = "all .25s ease-in-out";

    return {
        root: prefixStyle!({
            color: theme.baseHigh,
            background: theme.useFluentDesign ? theme.acrylicTexture60!.background : theme.chromeLow,
            display: "inline-block",
            position: "relative",
            margin: 0,
            padding: 0,
            transition,
            ...(isCompact ? {
                flex: "0 0 auto",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                width: "auto",
                height: "auto",
            } as React.CSSProperties : void 0),
            ...(isOverlay ? {
                width: "100%",
            } as React.CSSProperties : void 0),
            ...style,
            overflow: "hidden",
        }),
        pane: prefixStyle!({
            background: theme.useFluentDesign ? theme.acrylicTexture40!.background : theme.altHigh,
            transition,
            boxShadow: theme.useFluentDesign ? `rgba(0, 0, 0, 0.34) 0px 4px 24px` : void 0,
            ...(isCompact ? {
                height: "100%",
                width: expandedWidth,
                transform: `translate3d(${expanded ? 0 : expandedWidth}px, 0, 0)`,
            } as React.CSSProperties : void 0),
            ...(isOverlay ? {
                position: "absolute",
                top: 0,
                right: panePositionIsRight ? 0 : void 0,
                left: panePositionIsRight ? void 0 : 0,
                height: "100%",
                width: expandedWidth,
                transform: `translate3d(${expanded ? 0 : expandedWidth}px, 0, 0)`,
            } as React.CSSProperties : void 0),
            ...paneStyle,
        }),
    };
}

export default SplitView;
