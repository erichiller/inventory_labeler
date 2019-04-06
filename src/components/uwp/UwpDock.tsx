import debounce from 'lodash.debounce';
import PropTypes, { number, string } from 'prop-types';
import React, { Component, CSSProperties, ReactChildren } from 'react';

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




function autoprefixes(styles: ICSSProperties): IDockStylesPrefixed {
    return Object.keys(styles).reduce(
        (obj, key) => (obj[key] = autoprefix(styles[key]), obj),
        {} as IDockStyles,
    ) as IDockStylesPrefixed;
}

type CSSColor = string;
type CSSDimension = number | string;


type DockStyleLocation = "left" | "right" | "bottom" | "top";

interface IDockStylesPrefixed extends IDockStyles { }

type CSSPropertyPosition = "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "fixed" | "-webkit-sticky" | "absolute" | "relative" | "static" | "sticky" | undefined;

interface IDockStyles {
    [index: string]: any;
    wrapper: {
        position: CSSPropertyPosition;
        width: number;
        height: number;
        top: number;
        left: number;
    };
    dim: {
        position: CSSPropertyPosition,
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
        position: CSSPropertyPosition;
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
        position: CSSPropertyPosition;
        zIndex: number;
        opacity: number;
        background: string;
        backgroundPositionY: string;
        backgroundRepeat: string;
        backgroundPositionX: string;
        left: number;
        width: number | string;
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
        // boxShadow: "0 0 4px rgba(0, 0, 0, 0.3)",
        // background: "white",
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
        // opacity: 0,
        background: "repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.26), rgba(0, 0, 0, 0.26) .5px, rgba(0, 0, 0, 0.12) 2px, rgba(0, 0, 0, 0.12) 2px)",
        // backgroundPosition: "0 100%",
        // // content: '';
        // // display: block;
        // /* width: 5px; */
        // height: "40px;",
        // left: "-2px;",
        // width: "4px;",
    backgroundPositionX: "center",
    backgroundPositionY: "center",
    backgroundSize: "4px 40px",
    backgroundRepeat: "no-repeat",
            },
    // left: "-3px",
    // width: "6px",
});

function getTransitions(duration: number) {
    // return ["left", "top", "width", "height"]
    //     .map((p) => `${p} ${duration / 1000}s ease-out`);
    // disabled in order to use react-uwp instead
    return [];
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
        // commented out so it uses uwp transition
        // autoprefix({
        //     transition: `opacity ${duration / 1000}s ease-out`,
        // }),
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
            // isControlled: true,
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
        position: "right",
        zIndex: 99999999,
        fluid: true,
        defaultSize: 0.3,
        // commented out for uwp
        // dimMode: "opaque",
        dimMode: "none",
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

    public render() {
        const { children, zIndex, dimMode, position, isVisible, fluid, defaultSize, dockStyle, className, duration, ...attributes } = this.props;
        const { isResizing, size, isDimHidden } = this.state;

        const dimStyles = Object.assign({}, ...getDimStyles(this.props, this.state));
        const dockStylesAgg = Object.assign({}, ...getDockStyles(this.props, this.state));
        const resizerStyles = Object.assign({}, ...getResizerStyles(position));
        const dockContentStyles = styles.dockContent;

        const { theme } = this.context;
        if (theme.prefixStyle === undefined) {
            theme.prefixStyle = (style?: CustomCSSProperties) => style!;
          }

        return (
            // <div style={Object.assign({}, styles.wrapper, { zIndex })} 
            <div 
            id="dock_root"
              style={theme.prefixStyle( Object.assign({}, styles.wrapper, { zIndex }) )}
              {...attributes}
              ref={(rootElm) => this.rootElm = rootElm!}
            >
                {dimMode !== "none" && !isDimHidden &&
                    <div id="dimStyles" style={dimStyles} onClick={this.handleDimClick} />
                }
                <SplitViewDock
                    className={className}
                    style={dockStylesAgg}
                    handleMouseDown={this.handleMouseDown}
                    dockContentStyles={dockContentStyles}
                    resizerStyles={resizerStyles}
                >
                {children}
                </SplitViewDock>
            </div>
        );
    }
}


interface DockProps {
    style: CSSProperties;
    id?: string;
    handleMouseDown: () => void;
    resizerStyles: CSSProperties;
    dockContentStyles: CSSProperties;
    children?: React.ReactNode
    position?: DockStyleLocation;
    size?: number;
    isVisible?: boolean;
    isResizing?: boolean;
    className?: string;
}

export class SplitViewDock extends React.Component<DockProps, {}> {
    // props: DockProps;

    public static defaultProps: DockProps = {
        style: {},
        id: "dock",
        resizerStyles: {},
        handleMouseDown: () => {},
        dockContentStyles: {},
        isResizing: false,
        isVisible: false,
    }
    
    constructor (props: DockProps) {
        super(props)

        // props.isResizing = false;
        // props.isVisible = false;
}

    render(){
        const { children, position, isResizing, size, isVisible, style, className, ...attributes } = this.props;
        return (
        <div id="dock"
        style={style}
        className={className}>
            <div id="resizer"
            style={this.props.resizerStyles}
                onMouseDown={this.props.handleMouseDown} />
            <div id="dock_content" style={this.props.dockContentStyles}>
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
        )
    }
}





// class Dock extends React.Component {
//     props: {
//         dockContentStyle: CSSProperties;
//         style: CSSProperties;
//         id?: string;
//         handleMouseDown: () => {};
//     }
//     constructor(props: IDockProps) {
//         super(props)
//         this.props = {
//             style: props.style ? props.style : {
//                 dim: {},
//                 dimAppear: {},
//                 dimDisappear: {},
//                 dimHidden: {},
//                 dimTransparent: {}
//             },

//         }
//         id: "dock",
//         resizerStyles: {},
//         handleMouseDown: () => ({}),
//         dockContentStyles: {}
//     }

//     render(){
//         return (
//         <div id="dock" style={this.props.style} >
//             <div id="resizer" 
//             style={this.props.resizerStyles}
//                 onMouseDown={this.props.handleMouseDown} />
//             <div id="dock_content" style={this.props.dockContentStyle}>
//                 {typeof children === "function" ?
//                     children({
//                         position,
//                         isResizing,
//                         size,
//                         isVisible,
//                     }) :
//                     children
//                 }
//             </div>
//     </div>
//         )
//     }
// }