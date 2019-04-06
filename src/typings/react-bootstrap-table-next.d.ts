declare module "react-bootstrap-table-next" {
    import { any, string } from "prop-types";
    import React, { Component, CSSProperties, ReactChildren } from "react";

    interface Remote {
        filter: boolean;
        pagination: boolean;
        sort: boolean;
        cellEdit: boolean;
    }

    type Milliseconds = number;
    
    /**
     * Specifying the selection way for single(radio) or multiple(checkbox). If radio was assigned, there will be a radio button in the selection column; otherwise, the checkbox instead.
     */
    type SelectRowMode = "radio" | "checkbox";

    interface Row { }

    /**
     * [docs](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/row-select-props.html)
     */
    export interface SelectRow {
        mode: SelectRowMode;
        /** selectRow.selected for default selections on table. */
        selected?: RowKey[];
        style?: CSSProperties | CSSCallback;
        /**
         * `selectRow.classes` allows you to add css class on **selected** rows
         */
        classes?: CSSClassName | ((row, rowIndex) => CSSClassName);
        bgColor?: CSSColor | ((row, rowIndex) => CSSColor);
        nonSelectable?: RowKey[];
        clickToSelect?: boolean;
        clickToExpand?: boolean;
        clickToEdit?: boolean;
        /**
         * This callback function will be called when a row is select/unselect and pass following four arguments: row, isSelect, rowIndex and e.
         * If you want to reject current select action, just return false
         */
        onSelect?: ((row: {}, isSelect: boolean, rowIndex: RowKey, e: MouseEvent) => boolean);
        /**
         * This callback function will be called when select/unselect all and it only work when you configure selectRow.mode as checkbox.
         * If you want to control the final selection result, just return a row key array:
         */
        onSelectAll?: ((isSelect: boolean, rows: RowKey[], e: MouseEvent) => void | RowKey[]);
        hideSelectColumn?: boolean;
        hideSelectAll?: boolean;
        selectionRenderer?: (params: { mode: SelectRowMode; checked: boolean; disabled: boolean; }) => React.Element;
        selectionHeaderRenderer?: (({ mode, checked, indeterminate }) => void);
    }

    interface Pagination { }

    interface Filter { }

    type ColumnPosition = "left" | "right";

    export interface ExpandRow {
        renderer: ((Row) => React.ReactElement);
        expanded?: RowId[];
        nonExpandable?: RowId[];
        onExpand?: ((row: Row, isExpand: boolean, rowIndex: RowKey, e: MouseEvent) => void);
        /**
         * This prop accepts a callback function which will be called when expand/collapse all. It only works when you configure `expandRow.showExpandColumn` as true.
         */
        onExpandAll?: ((isExpandAll: boolean, results, e: MouseEvent) => void);
        /** Default is false.  */
        showExpandColumn?: boolean;
        /** Default is false.  */
        onlyOneExpanding?: boolean;
        /** Default is false.  */
        expandByColumnOnly?: boolean;
        /** Default is left */
        expandColumnPosition?: ColumnPosition;
        /**
         * Provide a callback function to customize the expand indicator. This callback only has one argument which is an object and contains these properties:
         *  - `expanded`: If current row is expanded or not
         *  - `rowKey`: Current row key
         *  - `expandable`: If current row is expandable or not
         */
        expandColumnRenderer?: (({ expanded: boolean, rowKey: RowKey, expandable: boolean }) => React.ReactElement?);
        /**
         * Provide a callback function to customize the expand indicator in the expand header column. This callback only has one argument which is an object and contains one property `isAnyExpands` to indicate if there are any expanded rows
         */
        expandHeaderColumnRenderer?: (({ isAnyExpands: boolean }) => React.ReactElement);
    }

    /**
     * Abstract type which is actually a string, used to indicate where and what
     * the strings should be placed
     */
    type ColumnName = string;

    type SortDirection = "desc" | "asc";

    interface DefaultSorted {
        /**
         * if dataField does not match any column you defined, it will be ignored.
         */
        dataField: ColumnName;
        order: SortDirection;
    }

    type RowKey = number;

    type CSSCallback = ((row, rowIndex) => CSSProperties);
    type CSSColor = string;
    type CSSClassName = string;


    interface BootstrapTableProps {
        keyField: ColumnName;
        data: any;
        columns: Array<{ [index: string]: any }>;
        overlay?: () => React.ReactNode;
        remote?: boolean | Remote;
        loading?: boolean;
        tabIndexCell?: boolean;
        rowEvents?: Event[];
        expandRow?: ExpandRow;
        cellEdit?: CellEditOptions;
        /** Hide rows, this props accept an array of row keys */
        hiddenRows?: RowKey[];
        selectRow?: SelectRow;
        id?: string;
        /** Customize class on table element. */
        classes?: string;
        noDataIndication?: () => React.ReactNode;
        bootstrap4?: boolean;
        /**
         * Same as bootstrap .table-striped class for adding zebra-stripes to a
         * table.
         */
        striped?: boolean;
        bordered?: boolean;
        hover?: boolean;
        condensed?: boolean;
        /**
         * Customize class on the outer element which wrap up the table element.
         */
        wrapperClasses?: string;
        caption?: string | React.ReactNode;
        rowStyle?: CSSProperties | CSSCallback;
        rowClasses?: CSSProperties | ((row, rowIndex) => CSSProperties);
        headerClasses?: string;
        defaultSorted?: DefaultSorted[];
        defaultSortDirection?: SortDirection;
        pagination?: Pagination;
        filter?: Filter;
        onTableChange?: (OnTableChangeType, NewState) => void;
    }

    /**
     * BootstrapTable class
     * https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/table-props.html
     */
    declare class BootstrapTable extends React.Component {
        public props: BootstrapTableProps;
        constructor(BootstrapTableProps): void;
    }

    export default BootstrapTable;

    type OnTableChangeType = "filter" | "pagination" | "sort" | "cellEdit";
    interface NewState {
        page;  // newest page
        sizePerPage: number;  // newest sizePerPage
        sortField: ColumnName;  // newest sort field
        sortOrder: SortDirection;  // newest sort order
        /** an object which have current filter status per column */
        filters;
        /** when you enable remote sort, you may need to base on data to sort if data is filtered/searched */
        data: any;
        cellEdit: {  // You can only see this prop when type is cellEdit
            rowId: number;
            dataField: ColumnName;
            newValue: any;
        };
    }

}
