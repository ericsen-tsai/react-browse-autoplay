import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowseAutoplayProvider } from '@erichandsen/react-browse-autoplay';
import App from './App';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find the root element');
}

createRoot(container).render(
  <StrictMode>
    <BrowseAutoplayProvider initialAudioPath="https://storytelling-storage.twreporter.org/files/cafe-music-0417-7n87gToMulIAwpW4EC0.mp3">
      <App />
    </BrowseAutoplayProvider>
  </StrictMode>,
);
