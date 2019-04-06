// Type definitions for react-bootstrap-table2-editor
// Definitions by: Eric Hiller <www.github.com/erichiller>
declare module "react-bootstrap-table2-editor" {
import {Component} from "react";
import {EnumType} from "typescript";

type Milliseconds = number;



/**
 * * from package [react-bootstrap-table2-editor](https://www.npmjs.com/package/react-bootstrap-table2-editor)
 * * [online docs](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/cell-edit-props.html)
 */
export class CellEditOptions {
    public mode: "click" | "dbclick";
    public blurToSave?: boolean;
    /**
     * cellEdit.nonEditableRows accept a callback function and expect return an array which used to restrict all the columns of some rows as non-editable. So the each item in return array should be rowkey(keyField)
     */
    public nonEditableRows?: () => RowKey[];
    /**
     * If a column.validator defined and the new value is invalid, react-bootstrap-table2 will popup a alert at the bottom of editor. cellEdit.timeToCloseMessage is a chance to let you decide how long the alert should be stay. Default is 3000 millisecond.
     */
    public timeToCloseMessage?: () => Milliseconds;
    public autoSelectText?: boolean;
    public beforeSaveCell?: (
        oldValue,
        newValue,
        row,
        column,
        ) => {
      async?: boolean;
    };
    public beforeSaveCell?: (oldValue: {}, newValue: {}, row: RowKey, column: number) => { };
    public afterSaveCell?: (oldValue: {}, newValue: {}, row: RowKey, column: number) => { };
    public onStartEdit?: (row: {}, column: {}, rowIndex: RowKey, columnIndex: number) => { };
    /**
     * This prop is not often used. Only used when you want to keep the error message in your application state and also handle the cell editing on remote mode.
     */
    public errorMessage?: string;
    public onErrorMessageDisappear?: () => void;
}

export default (options: CellEditOptions) => ({});

  /*** packages/react-bootstrap-table2-editor/src/const.js ****/
const TIME_TO_CLOSE_MESSAGE = 3000;
const DELAY_FOR_DBCLICK = 200;
const CLICK_TO_CELL_EDIT = "click";
const DBCLICK_TO_CELL_EDIT = "dbclick";

const EDITTYPE: {
    TEXT:     "text",
    SELECT:   "select",
    TEXTAREA: "textarea",
    CHECKBOX: "checkbox",
    DATE:     "date",
  }

  /*** packages/react-bootstrap-table2-editor/src/const.js ****/

  class CheckBoxEditor extends Component {}

  // packages/react-bootstrap-table2-editor/src/editing-cell.js
  class EditingCell extends Component {}
}
