import { 
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';
import { AuthProvider, RequireAuth } from 'react-auth-kit';
// Contexts
import { ColorModeContext, useMode } from './context/themeContext';
import { ThemeProvider } from '@mui/material';
// Pages
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound/>}>
      <Route path='/login' element={<Login/>} />
      <Route path='/'>
        <Route index element={<RequireAuth loginPath='/login'><Dashboard /></RequireAuth>}/>
      </Route>
    </Route>
  )
);

function App() {
  
  const [theme, toggleColorMode] = useMode();

  return (
    <ColorModeContext.Provider value={toggleColorMode}>
    <ThemeProvider theme={theme} >
        <AuthProvider
          authName={'_auth'}
          authType={'cookie'}
          cookieDomain={window.location.hostname}
          cookieSecure={window.location.protocol === "https:"}
        >
          <div className="app" >
            <RouterProvider router={router} />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App
