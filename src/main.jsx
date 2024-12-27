import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route, Outlet} from 'react-router'
import './index.css'
import './mobile.css'
import App from './App.jsx'
import Map from './components/Map.jsx'
import DevicesHome from './DevicesHome.jsx'
import Login from './Login.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login></Login>} />
          <Route path='/dashboard' element={<ProtectedRoute><App /></ProtectedRoute>}>
              <Route index element={<><h1>Hola</h1></>}/>
              <Route path='devices' element={<Outlet></Outlet>}>
                <Route index element={<ProtectedRoute><DevicesHome></DevicesHome></ProtectedRoute>}/>
                <Route path=':id' element={<ProtectedRoute><Map></Map></ProtectedRoute>}/>
              </Route>
            
          </Route>
        </Routes>
      </BrowserRouter>  
  </StrictMode>,
)
