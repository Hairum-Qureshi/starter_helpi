import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Basic from "./basic";
import Detailed from "./detailed";
import Navigation from "./navbar";
import Footer from "./Footer";
import BasicDetailedButtons from "./basicDetailedButton";

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  return (
    <Router>
      <>
        <Navigation />
        <BasicDetailedButtons />
        <Routes>
          <Route path="/basic" Component={Basic} />
          <Route path="/detailed" Component={Detailed} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}
export default App;
