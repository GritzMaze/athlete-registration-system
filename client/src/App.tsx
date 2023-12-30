import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateOutlet } from './components/outlets/private.outlet';
import { PublicOutlet } from './components/outlets/public.outlet';
import { Home } from './pages/home';
import { CurrentUserProvider } from './components/context/current-user-context';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';

function App() {
  return (
    <BrowserRouter>
      <CurrentUserProvider>
        <Routes>
          <Route path='/' element={<PrivateOutlet />}>
            <Route path='/' element={<Home />}></Route>
          </Route>

          <Route element={<PublicOutlet />}>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Route>
        </Routes>
      </CurrentUserProvider>
    </BrowserRouter>
  );
}

export default App;
