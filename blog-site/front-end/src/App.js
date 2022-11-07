import "./styles/main.css";
import { BrowserRouter } from "react-router-dom";
import { DefaultLayout } from "./scripts/index";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <DefaultLayout />
      </BrowserRouter>
    </div>
  );
}

export default App;
