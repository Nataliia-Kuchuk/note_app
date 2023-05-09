import { useContext } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import WorkSpace from "./components/WorkSpace/WorkSpace";
import { Context } from "./contex/Contex";


function App() {
  const { DB } = useContext(Context);
  return (
    <div className="App">
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        {DB.length ? <WorkSpace /> : null}
      </div>
    </div>
  );
}

export default App;
