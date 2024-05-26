/* eslint-disable react/react-in-jsx-scope */
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import Header from './components/Header';
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/library" element={<Library />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;