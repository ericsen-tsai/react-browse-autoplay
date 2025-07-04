import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import BasicUsage from './pages/BasicUsage';
import DynamicAudio from './pages/DynamicAudio';

function App() {
  return (
    <div className="min-h-screen bg-custom-primary">
      <Navigation />
      <main className="max-w-7xl mx-auto px-8 text-center">
        <Routes>
          <Route path={import.meta.env.VITE_DEMO_PAGE_BASE_URL} element={<BasicUsage />} />
          <Route path={`${import.meta.env.VITE_DEMO_PAGE_BASE_URL}/dynamic-audio`} element={<DynamicAudio />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
