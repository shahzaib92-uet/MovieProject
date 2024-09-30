import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./Components/Signin/Signin";
import MyMovies from "./Components/MyMovies/MyMovies";
import AddMovies from "./Components/AddMovies/AddMovies";
import EditMovie from "./Components/EditMovie/EditMovie";
import Signup from "./Components/Signup/Signup";
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
       <Route path="/MyMovie" element={<MyMovies />} />
      <Route path="/add-movie" element={<AddMovies />} />
       {/* <Route path="/addmovie" element={< />} />
      //  */}
      <Route path="/update-movie/:id" element={<EditMovie />}></Route>
    </Routes>
  </Router>
);

export default App;
