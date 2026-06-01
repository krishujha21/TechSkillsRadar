// filepath: TechSkillsRadar/frontend/src/App.jsx
/**
 * Root application component with React Router and navigation.
 * Uses the new Premium Layout with a persistent Sidebar.
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import Layout from "./components/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}