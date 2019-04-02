
import * as React from "react";

// interface IChildPortal extends React.HTMLAttributes<HTMLDivElement> {
//     id: string;
//   }
  
//   export class Modal extends React.Component<IChildPortal , {}> {
//     el: HTMLElement;
//     displayElementRoot?: HTMLElement;
  
//     constructor(props: IChildPortal){
//       super(props);
//       this.el = document.createElement('div');
//       // if (this.props.id === undefined){
//       //   this.props.id = this.defaultProps.id;
//       // }
//       const el = document.getElementById(this.props.id);
//       console.log(this.props.id)
//       if ( el !== null ){
//         this.displayElementRoot = el;
//       } else {
//         console.log("error: displayelementroot not found with id of " + this.props.id);
//       }
//     }
  
//     componentDidMount() {
//       if (this.displayElementRoot !== undefined ) {
//         this.displayElementRoot.appendChild(this.el);
//       }
//     }
  
//     componentWillUnmount() {
//       if (this.displayElementRoot !== undefined ) {
//         this.displayElementRoot.removeChild(this.el);
//       }
//     }
    
//     render() {
//       return ReactDOM.createPortal(
//         this.props.children,
//         this.el,
//       );
//     }
  
//   }

  
// interface IPortal {
//     destinationId: string,
//     children?: React.Component<any, any> | React.Component<any, any>[],
//     portalTo?: string,
//     properties?: any
// }

// class Portal<S> extends React.Component<IPortal, S> {
//     _name = 'findify-mjs-portal';
//     _destination?: Element;
//     _portalTo?: Element;

//     constructor(props: IPortal) {
//         super(props);
//     }

//     render() {
//         return null as JSX.Element;
//     }

//     componentDidMount() {
//         if (this.props.portalTo) {
//             this._portalTo = document.querySelector(this.props.portalTo);
//         } else {
//             this._portalTo = document.body;
//         }

//         this._destination = this.props.destinationId && document.getElementById(this.props.destinationId);

//         if (!this._destination) {
//             this._destination = document.createElement('div');
//             this._destination.id = this.props.destinationId;
//             this._destination.setAttribute('class', 'findify-mjs');
//         }

//         this._portalTo && this._portalTo.appendChild(this._destination);
//     }

//     componentWillUnmount() {
//         this._portalTo && this._portalTo.removeChild(this._destination);
//     }

//     componentDidUpdate() {
//         ReactDOM.render(<div className={this._name} {...this.props}>{this.props.children}</div>, this._destination);
//     }
// }
