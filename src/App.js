import Home from "./components/Home/Home";
import "./App.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Home></Home>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
