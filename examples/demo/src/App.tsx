import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import BasicUsage from './pages/BasicUsage';
import DynamicAudio from './pages/DynamicAudio';

function App() {
  return (
    <div className="app">
      <Navigation />
      <main className="app-main">
        <Routes>
          <Route path="/react-browse-autoplay" element={<BasicUsage />} />
          <Route path="/react-browse-autoplay/dynamic-audio" element={<DynamicAudio />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
