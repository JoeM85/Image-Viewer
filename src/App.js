import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import MultiThemeProvider from "material-ui/styles/MuiThemeProvider";

class App extends Component {
  render() {
    return (
      <MultiThemeProvider>
        <div>
          <SearchBar />
        </div>
      </MultiThemeProvider>
    );
  }
}

export default App;
