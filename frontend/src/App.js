import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./containers/Login";
import Question from "./containers/Ask";
import ListQuestions from "./containers/List";
import NotFoundPage from "./containers/NotFound";

function App() {
  const handleLogin = ({ props }) => {
    localStorage.setItem('token', props.token);
  };
  let routes = (
    <Routes>
      <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      <Route path="/ask" element={<Question/>}/>
      <Route path="/list" element={<ListQuestions/>}/>
      <Route path="/*" element={<NotFoundPage/>}/>
    </Routes>
  );
  return (
    <BrowserRouter>
      <div className="fixed-layout">
        <div>{routes}</div>
      </div>
    </BrowserRouter>
  );
}

export default App;
