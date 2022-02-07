
import User from "./Views/User/User"
//  import Adduser from "./components/User/Adduser"
// import Card from "./components/Card/Card";

import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import EditUser from "./components/Adduser/EditUser";

function App() {
  return (

    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<User/>} />
          <Route exact path="/update/:id" element={<EditUser />} />
        </Routes>
      </div>
    </Router>







  );
}

export default App;
