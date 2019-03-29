import * as PropTypes from "prop-types";
import * as React from "react";
import BootstrapTable, { row } from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";

const expandRow = {
  renderer: (row: React.Component) => <div>Eric's Expandable Row</div>,
};

const products = [{ id: "goo", name: "boo", price: "do" }];
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
// omit...

const rowStyle = { backgroundColor: "#c8e6c9" };

export default class ItemsTable extends React.Component {
  public render() {
    return (
      <BootstrapTable
        keyField="id"
        data={products}
        columns={columns}
        expandRow={expandRow}
        rowStyle={rowStyle}
        cellEdit={cellEditFactory({ mode: "dbclick" })}
      />
    );
  }
}
