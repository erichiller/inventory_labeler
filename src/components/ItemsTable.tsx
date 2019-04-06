import * as PropTypes from "prop-types";
import * as React from "react";
import BootstrapTable, { ExpandRow, SelectRow } from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";

import "bootstrap/scss/bootstrap.scss";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import "../styles/mdbootstrap-bootstrap-fluent-design/scss/fluent.scss";

// import LightTheme from "react-uwp/styles/lightTheme";

// import "../styles/office-ui-fabric-core.css";
import "./ItemsTable3.scss";
// import "./ItemsTable2.scss";
// import "./ItemsTable.scss";
// import "../styles/office-ui-fabric-core/docs/sass/docs.scss";

// import { FluentStyles } from "@uifabric/fluent-theme";
// import { FluentTheme } from "@uifabric/fluent-theme"


// import {
//   GlobalClassNames
// } from '@uifabric/styling';

import { initializeIcons } from '@uifabric/icons';
initializeIcons();
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import { theme } from "../App";
import { JsxEmit } from "typescript";

const expandRow: ExpandRow = {
    renderer: ((row: React.Component) => {
        return (<div style={{ background: theme.acrylicTexture80!.background! }}>Eric's Expandable Row</div>);
    }),
    showExpandColumn: true,
    expandColumnPosition: "right",
    expandByColumnOnly: true,
    expandColumnRenderer: (({ expanded, expandable }) => {
        if (expanded) {
            return (<Icon className="Expanded" iconName="RemoveFilter" />);
        } else if (!expandable) {
            return (<Icon iconName="DRM" />);
        } else {
            return (<Icon iconName="ExploreContent" />);
        }
    }),
    expandHeaderColumnRenderer: (({ isAnyExpands }) => {
        if (isAnyExpands) {
            return (
                /** Unselect */
                <Icon iconName="Blocked2" />
            )
        } else {
            return (
                <Icon iconName="ViewAll" />
            )
        }
    }),
};

const selectRow: SelectRow = {
    mode: "checkbox",
    classes: "selectedRow",
    hideSelectColumn: false,
    clickToSelect: true,
    clickToEdit: true,
    // selectionRenderer: (
    //     ({ mode, checked, disabled }) => {
    //         // ({}) => {
    //         console.log({ mode: mode, checked: checked, disabled: disabled});
    //         return (
    //             <React.Fragment>
    //                 <input className="form-check-input" type="checkbox" id="checkbox" defaultChecked={checked}/>
    //                 <label htmlFor="checkbox" className="label-table form-check-label"></label>
    //             </React.Fragment>
    //         );
    //     }
    // ),
    
 onSelect: (row, isSelect, rowIndex, e) => {
     console.log("onSelect")
     return true;
    // if (SOME_CONDITION) {
    //   return false;
    // }
  }
}

const products = [
    { id: "goo", name: "boo", price: "do" },
    { id: "2", name: "chutney", price: "9.99" },

];
const columns = [
    {
        dataField: "id",
        text: "Product ID",
    },
    {
        dataField: "name",
        text: "Product Name",
    },
    {
        dataField: "price",
        text: "Product Price",
    },
];


export default class ItemsTable extends React.Component {
    static contextTypes = { theme: PropTypes.object };
    context!: { theme: ReactUWP.ThemeType };

    public render() {
        // console.log(FluentStyles.DetailsRow);
        // console.log(FluentStyles.DetailsRow.styles({theme: FluentTheme}));
        return (
            <BootstrapTable
                bootstrap4={true}
                bordered={false}
                keyField="id"
                data={products}
                columns={columns}
                expandRow={expandRow}
                condensed
                hover
                // rowStyle={FluentStyles.DetailsRow.styles({theme: FluentTheme})}
                // classes="ms-Fabric"
                selectRow={selectRow}
                // tabIndexCell={true}
                // classes="table-borderless"
                cellEdit={cellEditFactory({
                    mode: "dbclick",
                    blurToSave: true,

                })}
            />
        );
    }
}


// cell edit : WindowEdit
