import { StrictMode } from 'react';
import { Route, Routes } from 'react-router-dom';
import Cart from './components/Cart/Cart';
import DetailedCard from './components/DetailedCard/DetailedCard';
import MainPage from './components/MainPage/MainPage';

function App() {
  return (
    <StrictMode>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={null} />
          <Route path="shoes/:id" element={<DetailedCard />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </StrictMode>
  );
}

export default App;
