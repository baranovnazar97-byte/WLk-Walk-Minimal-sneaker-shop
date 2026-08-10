import { StrictMode } from 'react';
import { Route, Routes } from 'react-router-dom';
import DetailedCard from './components/DetailedCard/DetailedCard';
import MainPage from './components/MainPage/MainPage';

function App() {
  return (
    <StrictMode>
      <Routes>
        <Route path="/*" element={<MainPage />} />
        <Route path="/shoes/:id" element={<DetailedCard />} />
      </Routes>
    </StrictMode>
  );
}

export default App;
