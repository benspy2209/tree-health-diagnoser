
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageProvider';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import './App.css';

const BASE_PATH = '';

function App() {
  return (
    <BrowserRouter basename={BASE_PATH}>
      <LanguageProvider>
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
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
