
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import './App.css';

// Récupérer le chemin de base pour le déploiement à www.plumridge.be/diagnostic/
const BASE_PATH = '/diagnostic';

function App() {
  return (
    <BrowserRouter basename={BASE_PATH}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
