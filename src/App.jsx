import { 
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
// Pages
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound/>}>
      <Route path='/login' element={<Login/>} />
      <Route path='/'>
        <Route index element={<Dashboard/>}/>
      </Route>
    </Route>
  )
);

function App() {
  return (
    <div className="app" >
      <RouterProvider router={router} />
    </div>
  );
}

export default App
