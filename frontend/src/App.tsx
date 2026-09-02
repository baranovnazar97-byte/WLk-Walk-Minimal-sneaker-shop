import { StrictMode } from 'react';
import { Route, Routes } from 'react-router-dom';
import Cart from './components/Cart/Cart';
import DetailedCard from './components/DetailedCard/DetailedCard';
import LoginForm from './components/LoginForm/LoginForm';
import MainPage from './components/MainPage/MainPage';
import RegisterForm from './components/RegisterForm/RegisterForm';

function App() {
  return (
    <StrictMode>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={null} />
          <Route path="shoes/:id" element={<DetailedCard />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
        </Route>
      </Routes>
    </StrictMode>
  );
}

export default App;
