import React, { Component } from 'react';
import '../stylesheets/App.css';
import {Link} from 'react-router'


class App extends Component {

  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}

export default App;
