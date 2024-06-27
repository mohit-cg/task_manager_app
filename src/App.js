import "./App.css";
import Header from "./Components/Header/Header";
import SubHeader from "./Components/SubHeader/SubHeader";
import TaskList from "./Components/TaskList/TaskList";

function App() {
  return (
    <div className="container">
      <Header />
      <SubHeader/>
      <TaskList/>
    </div>
  );
}

export default App;
