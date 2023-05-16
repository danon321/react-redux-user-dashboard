import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import AddUserPage from "./pages/AddUserPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-user" element={<AddUserPage />} />
        </Routes>
      </Router>
    </Layout>
  );
}

export default App;
