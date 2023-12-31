import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateOutlet } from './components/outlets/private.outlet';
import { PublicOutlet } from './components/outlets/public.outlet';
import { Home } from './pages/home';
import { CurrentUserProvider } from './components/context/current-user-context';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { Navigation } from './components/navigation';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <CurrentUserProvider>
        <div className='main-container'>
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <Navigation /> <PrivateOutlet />
                </>
              }
            >
              <Route path='/' element={<Home />}></Route>
            </Route>

            <Route element={<PublicOutlet />}>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
            </Route>
          </Routes>
        </div>
      </CurrentUserProvider>
    </BrowserRouter>
  );
}

export default App;
