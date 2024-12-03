import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route, Outlet} from 'react-router'
import './index.css'
import './mobile.css'
import App from './App.jsx'
import Map from './components/Map.jsx'
import DevicesHome from './DevicesHome.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<><h1>Hola</h1></>}/>
          <Route path='devices' element={<Outlet></Outlet>}>
            <Route index element={<DevicesHome></DevicesHome>}/>
            <Route path=':id' element={<Map></Map>}/>
          </Route>
          
          
        </Route>
        
      </Routes>
    </BrowserRouter>
    
  </StrictMode>,
)
