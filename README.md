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

#### Tabs and Context
* [React Context Docs](https://reactjs.org/docs/context.html)
* [Exmaples creating Tabs using Context](https://gist.github.com/YazanAabeed?page=2)
* [Tabs.js](https://gist.github.com/YazanAabeed/37a1f14c638b51f0319455fd55e5ea74)
* [Tab.js](https://gist.github.com/YazanAabeed/3a73cefcea8ce34d319f47ad5255558a)
* [TabsContext.js](https://gist.github.com/YazanAabeed/5551ddb2a7c69e51c53c1e9d6ec35504)

#### Resizable, Draggable "Panes"

* from STRML
  * [react-resizable](https://github.com/STRML/react-resizable)
    * [Resizable.js](https://github.com/STRML/react-resizable/blob/master/lib/Resizable.js)
    * [ResizableBox.js](https://github.com/STRML/react-resizable/blob/master/lib/ResizableBox.js)
    * [cloneElement.js](https://github.com/STRML/react-resizable/blob/master/lib/cloneElement.js)
    * [styles](https://github.com/STRML/react-resizable/blob/master/css/styles.css)
  * react-draggable
  * [react-grid-layout](https://github.com/STRML/react-grid-layout) combines both of the above 


* [react-DnR](https://github.com/yongxu/react-DnR)
  * is both resizable and draggable.
  * can create OS native like windows

* from bokuweb
  * [react-sortable-pane](https://github.com/bokuweb/react-sortable-pane) drag and drop of panes
  * [react-rnd](https://github.com/bokuweb/react-rnd)
  * [re-resizable](http://bokuweb.github.io/re-resizable)


* [react-dock](https://github.com/alexkuz/react-dock)


* https://github.com/avocode/react-resizer


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
