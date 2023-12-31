import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateOutlet } from './components/outlets/private.outlet';
import { PublicOutlet } from './components/outlets/public.outlet';
import { Home } from './pages/home';
import { CurrentUserProvider } from './components/context/current-user-context';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { Navigation } from './components/navigation';
import './App.css';
import { NotFoundPage } from './pages/not-found';
import { ConfigProvider, theme } from 'antd';

function App() {
  return (
    <BrowserRouter>
      <CurrentUserProvider>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
          }}
        >
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
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </div>
        </ConfigProvider>
      </CurrentUserProvider>
    </BrowserRouter>
  );
}

export default App;
