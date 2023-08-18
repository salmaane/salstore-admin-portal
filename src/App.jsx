import { 
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
  Outlet
} from 'react-router-dom';
import { AuthProvider, RequireAuth } from 'react-auth-kit';
// Contexts
import { ColorModeContext, useMode } from './context/themeContext';
import { ThemeProvider } from '@mui/material';
// Pages
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound'
import RootLayout from './components/layout/RootLayout';
import UserManagement from './pages/UserManagement/UserManagement'
import Products from './pages/Products/Products';
import AddProduct from './pages/AddProduct/AddProduct';
import UpdateProduct from './pages/UpdateProduct/UpdateProduct';
import ProductDetails from './pages/ProductDetails/ProductDetails';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound/>}>
      <Route path='/login' element={<Login/>} />
      <Route path='/' element={<RequireAuth loginPath='/login'><RootLayout/></RequireAuth > }>
        <Route index element={<RequireAuth loginPath='/login'><Dashboard /></RequireAuth>}/>
        <Route path='user-management' element={<RequireAuth loginPath='/login'><UserManagement /></RequireAuth>}/>
        <Route path='products' element={<Outlet/>}>
          <Route index element={<RequireAuth><Products/></RequireAuth>}/>
          <Route path='add-product' element={<RequireAuth><AddProduct/></RequireAuth>}/>
          <Route path='update-product/:id' element={<RequireAuth><UpdateProduct/></RequireAuth>}/>
          <Route path=':id' element={<RequireAuth><ProductDetails/></RequireAuth>} />
        </Route>
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
