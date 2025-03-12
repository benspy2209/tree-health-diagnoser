
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageProvider';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import './App.css';

const BASE_PATH = '';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter basename={BASE_PATH}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
