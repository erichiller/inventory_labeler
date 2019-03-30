import * as React from "react";

import AutoSuggestBox from "react-uwp/AutoSuggestBox";
import Icon from "react-uwp/Icon";

interface ITypedResponse<T = any> extends Response {
  /**
   * this will override `json` method from `Body` that is extended by `Response`
   * interface Body {
   *     json(): Promise<any>;
   * }
   */
  json<P = T>(): Promise<P>;
}

// https://dev.to/iamandrewluca/typed-fetch-response-in-typescript-1eh1
// function TypedFetch<T>(url: string, ...args: any): Promise<ITypedResponse<T>> {
// return fetch(url, args);
// }
declare function fetch<T>(input: RequestInfo, init?: RequestInit): Promise<ITypedResponse<T>>;

// async function syncFetch<T>(input: RequestInfo, init?: RequestInit): Promise<ITypedResponse<T>> {
//   return await fetch<T>(input, init)
//     .then((response) => response.json())
//   // .then((data) => console.log(data))
//   .then((data) => data);
// }

type currency = "usd" | "eur";

class CurrencyAmount {
  public value: number;
  public id: currency;
  constructor(value: number, id?: currency) {
    this.value = value;
    this.id = id ? id : "usd";
  }
}

enum ItemClass {
  SCREW = "SCREW",
  ELECTRONICS = "ELECTRONICS",
}

interface IVendor {
  vendorId: number;
  name: string;
}

interface IOrderItems {
  itemId: number;
  qty: number;
  price: CurrencyAmount;
  vendorPartNumber: string | number;
}

interface IOrder {
  orderId: number;
  vendorId: number;
  date: Date;
  total: CurrencyAmount;
  items: IOrderItems[];

}
interface IItem {
  itemId: number;
  name: string;
  class: ItemClass;
  manufacturerPartNumber: string | number;
}

const itemStyle: React.CSSProperties = {
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

interface IAutoSuggestSearch {
  error: any;
  isLoaded: boolean;
  activeItemElements: JSX.Element[];
}

export default class AutoSuggestSearch extends React.Component<{}, IAutoSuggestSearch> {

  private itemElements: JSX.Element[] = [];
  public state: IAutoSuggestSearch = {
    activeItemElements: [],
    error: null,
    isLoaded: false,
  };

  constructor(props: {}){
    super(props);
  }

  protected createSuggestListElements(items: IItem[]): JSX.Element[] {
    console.log(items)
    const itemElements = items.map((item, index) => (
      <div style={itemStyle} key={`${item.itemId}`} {...{ value: item.name }}>
        {item.name}
        <Icon>HeartFillLegacy</Icon>
      </div>
    ));
    return itemElements;
  }

  public componentDidMount() {
    fetch<IItem[]>("/api/items.json")
      .then((res) => res.json())
      .then(
        (result) => {
          this.itemElements = this.createSuggestListElements(result);
          this.setState({
            activeItemElements: this.itemElements,
            isLoaded: true,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            error,
            isLoaded: true,
          });
        }
      )
  }

  private handleChangeValue = (value: string) => {
    this.setState({
      activeItemElements: value ? this.itemElements.filter(
        (item) => item.props.value.toLowerCase().includes(value.toLowerCase())
      ) as any : [],
    });
  }

  public render() {
    const { error, isLoaded, activeItemElements } = this.state;
    if (error) {
      console.log("error while rendering AutoSuggestSearch");
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      console.log("loading data for AutoSuggestSearch");
      return <div>Loading...</div>;
    } else {
      return (
        <AutoSuggestBox
          placeholder="Search for Items or Orders"
          listSource={activeItemElements}
          onChangeValue={this.handleChangeValue}
        />
      );
    }



  }
}
