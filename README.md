# Hiller Inventory LabeLER (Hiller)

## Summary of components desires

→ framework: React-UWP (if fail =ms-fabric)
→ table: react-Bootstrap-table
→ css: ms-fabric-core (if fail =Fluent-bootstrap)
→ resizable side edit frames/panes react-resizable

[   ] Data Grid (editable cells, sort, filter)
[   ] Tree View
[   ] autocomplete / autosuggest search box
[   ] Fluent Design
[   ] Resizable side pane
[   ] editable cells
[   ] animated tabs

### Quick References

* [react-resizable](https://github.com/STRML/react-resizable?files=1) for resizable panes
* [tslint rules docs](https://palantir.github.io/tslint/rules/) ; [rules docs source](https://github.com/palantir/tslint/tree/master/src/rules)

## Components

### React Bootstrap Table2

[react-bootstrap-table2/README.md at master · react-bootstrap-table/react-bootstrap-table2](https://github.com/react-bootstrap-table/react-bootstrap-table2/blob/master/README.md)

[expandable row example](https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Row%20Expand&selectedStory=Basic%20Row%20Expand&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)

#### Supports

→ [x] expandable rows tables
→ [ ] filtering
→ [ ] searching
ETC ??
STYLING??

[github README](https://github.com/react-bootstrap-table/react-bootstrap-table2/blob/master/README.md)

[expandable row docs example](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/basic-row-expand.html)

[expandable row example](https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Row%20Expand&selectedStory=Basic%20Row%20Expand&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)


### CSS, Styling


#### FLUENT-BOOTSTRAP

https://disjfa.github.io/fluent-bootstrap/tables.html

https://www.npmjs.com/package/fluent-bootstrap


this ?
https://github.com/mdbootstrap/bootstrap-fluent-design/blob/master/scss/_tables.scss

#### Microsoft's Fabric UI Core (React)

See the package `react-fabric-ui-core`

[GitHub](https://github.com/OfficeDev/office-ui-fabric-core)

[table SCSS](https://github.com/OfficeDev/office-ui-fabric-core/blob/646552ef9d14dcd5c83801b923992a7507cc1a2f/src/documentation/sass/components/_Table.scss)


## Overall Design

```text
           ↓    tabs    ↓    tabs    ↓
| Logo 
| Logo | Items | Orders | Stats | Search ... Search
-
................................|.................. | ← open
................................|.................. | ← edit
................................|.................. | ← panel
................................|.................. | ← when
................................|.................. | ← row
.......................TABLE....|.................. | ← dbl
................................|.................. | ← clicked
................................|.................. | ← ( allow 
................................|.................. | ← drag
................................|.................. | ← border for
................................|.................. | ← increased
................................|.................. | ← width )
```

## Functionality

1. display orders
2. display items
3. print labels
    ? save past labels for quick re-prints
4. Collect data - parse sites, emails, APIs
5. ? stats ? - how many items, graph of money spent, items acquired, orders placed  etc
6. ? projects
    → allow to create BOM
    → allow to tag items
         + Project - ideas
         + Implementation - completed works
          , dialog to convert items from project → implementation
          , dialog to fill "slots" / (roles) in BOM
7. Shipment tracking
