import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HeadlinesList from "./components/HeadlinesList";
import HeadlineDetail from "./components/HeadlineDetail";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HeadlinesList />} />
          <Route path="/headline/:id" element={<HeadlineDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
