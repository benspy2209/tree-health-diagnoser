
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
          {/* Routes avec préfixe de langue */}
          <Route path="/fr/*" element={
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          } />
          <Route path="/en/*" element={
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          } />
          <Route path="/nl/*" element={
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          } />
          
          {/* Route par défaut (sans préfixe de langue) - français par défaut */}
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
