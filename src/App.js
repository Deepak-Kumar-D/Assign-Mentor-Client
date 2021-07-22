import "./Styles.css";
import { Route, Switch, Link } from "react-router-dom";
import NewStudent from "./components/NewStudent.js";
import Home from "./components/Home.js";
import NewMentor from "./components/NewMentor.js";
import AssignStudent from "./components/AssignStudent.js";
import ShowMentor from "./components/ShowMentor.js";
import UpdateMentor from "./components/UpdateMentor.js";
import { createContext, useState } from "react";

export const showLoad = createContext(null);

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <showLoad.Provider value={{ loading, setLoading }}>
      <div className="App">
        <div className="navBar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/show-mentor-student">Show Mentor</Link>
            </li>
            <li>
              <Link to="/create-mentor">Create Mentor</Link>
            </li>
            <li>
              <Link to="/create-student">Create Student</Link>
            </li>
            <li>
              <Link to="/assign-student">Assign Student</Link>
            </li>
            <li>
              <Link to="/update-mentor">Update Mentor</Link>
            </li>
          </ul>
        </div>

        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            {/* Displaying mentor with their students */}
            <Route path="/show-mentor-student">
              <ShowMentor />
            </Route>

            {/* Assigning a student under a mentor */}
            <Route path="/assign-student">
              <AssignStudent />
            </Route>

            {/* Creating a new mentor */}
            <Route path="/create-mentor">
              <NewMentor />
            </Route>

            {/* Creating a new student */}
            <Route path="/create-student">
              <NewStudent />
            </Route>

            {/* Changing a mentor of a student */}
            <Route path="/update-mentor">
              <UpdateMentor />
            </Route>
          </Switch>
        </div>
      </div>
    </showLoad.Provider>
  );
}

export default App;
