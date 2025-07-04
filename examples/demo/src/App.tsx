import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import BasicUsage from './pages/BasicUsage';
import DynamicAudio from './pages/DynamicAudio';

function App() {
  return (
    <div className="min-h-screen bg-bg-primary px-8">
      <Navigation />
      <main className="mx-auto max-w-7xl text-center">
        <Routes>
          <Route path={import.meta.env.VITE_DEMO_PAGE_BASE_URL} element={<BasicUsage />} />
          <Route path={`${import.meta.env.VITE_DEMO_PAGE_BASE_URL}/dynamic-audio`} element={<DynamicAudio />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
