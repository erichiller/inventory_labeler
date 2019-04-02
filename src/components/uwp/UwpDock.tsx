import debounce from 'lodash.debounce';
import PropTypes, { number, string } from 'prop-types';
import React, { Component, CSSProperties } from 'react';

import { CustomCSSProperties } from "react-uwp";



/*** START autoprefix.js ***/
// Originally from https://github.com/alexkuz/react-dock/
// Same as https://github.com/SimenB/react-vendor-prefixes/blob/master/src/index.js,
// but dumber

const vendorSpecificProperties = [
    "animation",
    "animationDelay",
    "animationDirection",
    "animationDuration",
    "animationFillMode",
    "animationIterationCount",
    "animationName",
    "animationPlayState",
    "animationTimingFunction",
    "appearance",
    "backfaceVisibility",
    "backgroundClip",
    "borderImage",
    "borderImageSlice",
    "boxSizing",
    "boxShadow",
    "contentColumns",
    "transform",
    "transformOrigin",
    "transformStyle",
    "transition",
    "transitionDelay",
    "transitionDuration",
    "transitionProperty",
    "transitionTimingFunction",
    "perspective",
    "perspectiveOrigin",
    "userSelect"
];

const prefixes = ["Moz", "Webkit", "ms", "O"];

function prefixProp(key: string, value: string | number) {
    return prefixes.reduce(
        (obj, pre) => (obj[pre + key[0].toUpperCase() + key.substr(1)] = value, obj),
        {} as IDockStyles,
    );
}

function autoprefix(style: ICSSProperties): IDockStylesPrefixed {
    return Object.keys(style).reduce((obj, key) => (
        vendorSpecificProperties.indexOf(key) !== -1 ? {
            ...obj,
            ...prefixProp(key, style[key]),
        } : obj), style) as IDockStylesPrefixed;
}
/*** END autoprefix.js ***/


interface ICSSProperties extends CSSProperties {
    [index: string]: any;
}

type DockStyleLocation = "left" | "right" | "bottom" | "top";



function autoprefixes(styles: ICSSProperties): IDockStylesPrefixed {
    return Object.keys(styles).reduce(
        (obj, key) => (obj[key] = autoprefix(styles[key]), obj),
        {} as IDockStyles,
    ) as IDockStylesPrefixed;
}

type CSSColor = string;
type CSSDimension = number | string;


interface IDockStylesPrefixed extends IDockStyles { }

interface IDockStyles {
    [index: string]: any;
    wrapper: {
        position: string;
        width: number;
        height: number;
        top: number;
        left: number;
    };
    dim: {
        position: string,
        left: number,
        right: number,
        top: number,
        bottom: number,
        zIndex: number,
        background: CSSColor,
        opacity: number,
    };
    dimAppear: {
        opacity: 0;
    };

    dimTransparent: {
        pointerEvents: "none";
    };

    dimHidden: {
        opacity: number;
    };

    dock: {
        position: string;
        zIndex: number;
        boxShadow: string;
        background: CSSColor;
        left: number;
        top: number;
        width: CSSDimension;
        height: CSSDimension;
    };

    dockHidden: {
        opacity: number;
    };

    dockResizing: {
        transition: string;
    };

    dockContent: {
        width: CSSDimension;
        height: CSSDimension;
        overflow: string
    };

    resizer: {
        position: "absolute";
        zIndex: number;
        opacity: number;
    };

    dimDisappear?: CSSProperties;
    transitions?: string;
}

const styles: IDockStylesPrefixed = autoprefixes({
    wrapper: {
        position: "fixed",
        width: 0,
        height: 0,
        top: 0,
        left: 0,
    },

    dim: {
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 0,
        background: "rgba(0, 0, 0, 0.2)",
        opacity: 1,
    },

    dimAppear: {
        opacity: 0,
    },

    dimTransparent: {
        pointerEvents: "none"
    },

    dimHidden: {
        opacity: 0,
    },

    dock: {
        position: "fixed",
        zIndex: 1,
        boxShadow: "0 0 4px rgba(0, 0, 0, 0.3)",
        background: "white",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%"
    },

    dockHidden: {
        opacity: 0,
    },

    dockResizing: {
        transition: "none"
    },

    dockContent: {
        width: "100%",
        height: "100%",
        overflow: "auto"
    },

    resizer: {
        position: "absolute",
        zIndex: 2,
        opacity: 0,
    },
});

function getTransitions(duration: number) {
    return ["left", "top", "width", "height"]
        .map((p) => `${p} ${duration / 1000}s ease-out`);
}

function getDockStyles(
    { fluid, dockStyle, dockHiddenStyle, duration, position, isVisible }: IDockProps,
    { size, isResizing, fullWidth, fullHeight }: IDockState,
) {
    let posStyle;
    const absSize = fluid ?
        (size * 100) + "%" :
        size + "px";

    function getRestSize(fullSize: number) {
        return fluid ?
            (100 - size * 100) + "%" :
            (fullSize - size) + "px";
    }

    switch (position) {
        case "left":
            posStyle = {
                width: absSize,
                left: isVisible ? 0 : "-" + absSize,
            };
            break;
        case "right":
            posStyle = {
                left: isVisible ? getRestSize(fullWidth) : fullWidth,
                width: absSize,
            };
            break;
        case "top":
            posStyle = {
                top: isVisible ? 0 : "-" + absSize,
                height: absSize,
            };
            break;
        case "bottom":
            posStyle = {
                top: isVisible ? getRestSize(fullHeight) : fullHeight,
                height: absSize,
            };
            break;
    }

    const transitions = getTransitions(duration);

    return [
        styles.dock,
        autoprefix({
            transition: [
                ...transitions,
                !isVisible && `opacity 0.01s linear ${duration / 1000}s`,
            ].filter((t) => t).join(","),
        }),
        dockStyle,
        posStyle != undefined ? autoprefix(posStyle) : {},
        isResizing && styles.dockResizing,
        !isVisible && styles.dockHidden,
        !isVisible && dockHiddenStyle,
    ];
}

function getDimStyles(
    { dimMode, dimStyle, duration, isVisible }: IDockProps,
    { isTransitionStarted }: IDockState,
) {
    return [
        styles.dim,
        autoprefix({
            transition: `opacity ${duration / 1000}s ease-out`,
        }),
        dimStyle,
        dimMode === "transparent" && styles.dimTransparent,
        !isVisible && styles.dimHidden,
        isTransitionStarted && isVisible && styles.dimAppear,
        isTransitionStarted && !isVisible && styles.dimDisappear,
    ];
}

function getResizerStyles(position: DockStyleLocation) {
    let resizerStyle;
    const size = 10;

    switch (position) {
        case "left":
            resizerStyle = {
                right: -size / 2,
                width: size,
                top: 0,
                height: "100%",
                cursor: "col-resize"
            };
            break;
        case "right":
            resizerStyle = {
                left: -size / 2,
                width: size,
                top: 0,
                height: "100%",
                cursor: "col-resize"
            };
            break;
        case "top":
            resizerStyle = {
                bottom: -size / 2,
                height: size,
                left: 0,
                width: "100%",
                cursor: "row-resize"
            };
            break;
        case "bottom":
            resizerStyle = {
                top: -size / 2,
                height: size,
                left: 0,
                width: "100%",
                cursor: "row-resize"
            };
            break;
    }

    return [
        styles.resizer,
        resizerStyle !== undefined ? autoprefix(resizerStyle) : {},
    ];
}

function getFullSize(position: DockStyleLocation, fullWidth: number, fullHeight: number) {
    return position === "left" || position === "right" ?
        fullWidth :
        fullHeight;
}

interface IDockProps extends React.HTMLAttributes<HTMLDivElement> {
    position: DockStyleLocation;
    zIndex: number;
    fluid: boolean;
    size?: number;
    defaultSize: number;
    dimMode: "none" | "transparent" | "opaque";
    isVisible: boolean;
    onVisibleChange?: (changed: boolean) => boolean;
    onSizeChange?: (changed: number) => boolean;
    dimStyle?: CSSProperties;
    dockStyle?: CSSProperties;
    dockHiddenStyle?: CSSProperties;
    duration: number;
}
interface IDockState {
    isControlled: boolean;
    size: number;
    isDimHidden: boolean;
    fullWidth: number;
    fullHeight: number;
    isTransitionStarted: boolean;
    isWindowResizing: boolean;
    isResizing: boolean;
}

export default class SplitViewPane extends Component<IDockProps, IDockState> {

    public static contextTypes = { theme: PropTypes.object };
    public context!: { theme: ReactUWP.ThemeType };
    public rootElm!: HTMLDivElement;

    constructor(props: IDockProps) {
        super(props);
        this.state = {
            isControlled: typeof props.size !== "undefined",
            size: props.size || props.defaultSize,
            isDimHidden: !props.isVisible,
            fullWidth: typeof (window) !== "undefined" && window.innerWidth ? window.innerWidth : 0,
            fullHeight: typeof (window) !== "undefined" && window.innerHeight ? window.innerHeight : 0,
            isTransitionStarted: false,
            isWindowResizing: false,
            isResizing: false,
        };
    }

    public static defaultProps = {
        position: "left",
        zIndex: 99999999,
        fluid: true,
        defaultSize: 0.3,
        dimMode: "opaque",
        duration: 200,
        isVisible: true,
    };

    public componentDidMount() {
        window.addEventListener("mouseup", this.handleMouseUp);
        window.addEventListener("mousemove", this.handleMouseMove);
        window.addEventListener("resize", this.handleResize);

        if (window.outerWidth !== this.state.fullWidth) {
            this.updateWindowSize();
        }
    }

    public componentWillUnmount() {
        window.removeEventListener("mouseup", this.handleMouseUp);
        window.removeEventListener("mousemove", this.handleMouseMove);
        window.removeEventListener("resize", this.handleResize);
    }

    public componentWillReceiveProps(nextProps: IDockProps) {

        this.setState({ isControlled: nextProps.size !== undefined });

        if (nextProps.size !== undefined && this.props.size !== nextProps.size) {
            this.setState({ size: nextProps.size });
        } else if (this.props.fluid !== nextProps.fluid) {
            this.updateSize(nextProps);
        }

        if (this.props.isVisible !== nextProps.isVisible) {
            this.setState({
                isTransitionStarted: true,
            });
        }
    }

    public updateSize(props: IDockProps) {
        const { fullWidth, fullHeight } = this.state;

        this.setState({
            size: props.fluid ?
                this.state.size / getFullSize(props.position, fullWidth, fullHeight) :
                getFullSize(props.position, fullWidth, fullHeight) * this.state.size,
        });
    }

    public componentDidUpdate(prevProps: IDockProps) {
        if (this.props.isVisible !== prevProps.isVisible) {
            if (!this.props.isVisible) {
                window.setTimeout(() => this.hideDim(), this.props.duration);
            } else {
                this.setState({ isDimHidden: false });
            }

            window.setTimeout(() => this.setState({ isTransitionStarted: false }), 0);
        }
    }

    public transitionEnd = () => {
        this.setState({ isTransitionStarted: false });
    }

    public hideDim = () => {
        if (!this.props.isVisible) {
            this.setState({ isDimHidden: true });
        }
    }

    public render() {
        const { children, zIndex, dimMode, position, isVisible, ...attributes } = this.props;
        const { isResizing, size, isDimHidden } = this.state;

        console.log(attributes);

        const dimStyles = Object.assign({}, ...getDimStyles(this.props, this.state));
        const dockStyles = Object.assign({}, ...getDockStyles(this.props, this.state));
        const resizerStyles = Object.assign({}, ...getResizerStyles(position));

        return (
            <div style={Object.assign({}, styles.wrapper, { zIndex })} 
              {...attributes}
              ref={(rootElm) => this.rootElm = rootElm!}
            >
                {dimMode !== "none" && !isDimHidden &&
                    <div style={dimStyles} onClick={this.handleDimClick} />
                }
                <div style={dockStyles}>
                    <div style={resizerStyles}
                        onMouseDown={this.handleMouseDown} />
                    <div style={styles.dockContent}>
                        {typeof children === "function" ?
                            children({
                                position,
                                isResizing,
                                size,
                                isVisible,
                            }) :
                            children
                        }
                    </div>
                </div>
            </div>
        );
    }

    public handleDimClick = () => {
        if (this.props.dimMode === "opaque") {
            this.props.onVisibleChange && this.props.onVisibleChange(false);
        }
    }

    public handleResize = () => {
        if (window.requestAnimationFrame) {
            window.requestAnimationFrame(this.updateWindowSize.bind(this, true));
        } else {
            this.updateWindowSize(true);
        }
    }

    public updateWindowSize = (windowResize?: boolean) => {
        const sizeState = {
            fullWidth: window.innerWidth,
            fullHeight: window.innerHeight,
        };

        if (windowResize !== undefined) {
            this.setState({
                ...sizeState,
                isResizing: true,
                isWindowResizing: windowResize,
            });

            this.debouncedUpdateWindowSizeEnd();
        } else {
            this.setState(sizeState);
        }
    }

    public updateWindowSizeEnd = () => {
        this.setState({
            isResizing: false,
            isWindowResizing: false,
        });
    }

    public debouncedUpdateWindowSizeEnd = debounce(this.updateWindowSizeEnd, 30);

    public handleWrapperLeave = () => {
        this.setState({ isResizing: false });
    }

    public handleMouseDown = () => {
        this.setState({ isResizing: true });
    }

    public handleMouseUp = () => {
        this.setState({ isResizing: false });
    }

    public handleMouseMove = (e: MouseEvent) => {
        if (!this.state.isResizing || this.state.isWindowResizing) { return; }
        e.preventDefault();

        const { position, fluid } = this.props;
        const { fullWidth, fullHeight, isControlled } = this.state;
        const { clientX: x, clientY: y } = e;
        let size;

        switch (position) {
            case "left":
                size = fluid && fullWidth ? x / fullWidth : x;
                break;
            case "right":
                size = fluid && fullWidth ? (fullWidth - x) / fullWidth : (fullWidth - x);
                break;
            case "top":
                size = fluid && fullHeight ? y / fullHeight : y;
                break;
            case "bottom":
                size = fluid && fullHeight ? (fullHeight - y) / fullHeight : (fullHeight - y);
                break;
        }

        this.props.onSizeChange && this.props.onSizeChange(size ? size : 0);

        if (!isControlled) {
            this.setState({ size: size ? size : 0 });
        }
    }
}
