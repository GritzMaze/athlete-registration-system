import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateOutlet } from './components/outlets/private.outlet';
import { PublicOutlet } from './components/outlets/PublicOutlet';
import { Home } from './pages/home';
import { CurrentUserProvider } from './components/context/current-user-context';

function App() {
  return (
    <BrowserRouter>
    <CurrentUserProvider>
      <Routes>
        <Route path='/' element={<PrivateOutlet />}>
          <Route path='/' element={<Home />}>
          </Route>
        </Route>

        <Route element={<PublicOutlet />}>
          <Route path='/' element={<Home />}>
          </Route>
          {/* <Route
            path='/login'
            element={
                <LoginPage />
            }
          /> */}
        </Route>
      </Routes>
      </CurrentUserProvider>
    </BrowserRouter>
  );
}

export default App;
