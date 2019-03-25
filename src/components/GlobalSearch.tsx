import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

// tslint:disable:jsx-no-lambda
export class GlobalSearch extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <SearchBox
        placeholder="Global Search"
        onFocus={() => console.log('onFocus called')}
        onBlur={() => console.log('onBlur called')}
        underlined={true}
      />
    );
  }
}