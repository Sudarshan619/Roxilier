import { useEffect, useState } from 'react';
import './App.css';
import ResponsiveAppBar from './components/Navbar';
import Statistics from './components/Statistics';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BarChart from './components/Barchart';
import PieChart from './components/Pie-chart';

function App() {

  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/" element={<Home />} />
        <Route path="/bar-chart" element={<BarChart />} />
        <Route path="/pie-chart" element={<PieChart />} />
      </Routes>
    </Router>
  );
}

export default App;
