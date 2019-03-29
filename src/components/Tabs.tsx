import * as PropTypes from "prop-types";
import * as React from "react";

import Tabs, { Tab } from "react-uwp/Tabs";


interface ITabsProps {
  title: ITabTitle;
}

export interface ITabTitle {
  icon?: React.Component;
  text: string;
}

export default class TabsIconable extends Tabs {
  constructor(props: {}){
    super(props);
    this.defaultProps["renderTitle"] = () => "eric";
  }
}

