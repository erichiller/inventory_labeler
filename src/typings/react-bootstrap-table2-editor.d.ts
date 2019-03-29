// Type definitions for react-bootstrap-table2-editor
// Definitions by: Eric Hiller <www.github.com/erichiller>

declare module "react-bootstrap-table2-editor" {
import {Component} from "react";
import {EnumType} from "typescript";

type milliseconds = number;



class CellEditOptions {
    public mode: string;
    public blurToSave?: boolean;
    public nonEditableRows?: () => RowKey[];
    public timeToCloseMessage?: () => milliseconds;
    public autoSelectText?: boolean;
    public beforeSaveCell?: (
        oldValue,
        newValue,
        row,
        column,
        ) => {
      async?: boolean;
    };
    public afterSaveCell?: (oldValue, newValue, row, column) => {};
    public onStartEdit?: (oldValue, newValue, row, column) => {};
    public errorMessage?: string;
    public onErrorMessageDisappear?: () => {};
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
