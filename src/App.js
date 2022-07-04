import React from "react";
import { Clock } from "./components/Clock";
import { Home } from "./pages/Home";


class App extends React.Component {
  render() {
    return (
      <div>
        <Home/>
      </div>
    );
  }
}

export default App;
