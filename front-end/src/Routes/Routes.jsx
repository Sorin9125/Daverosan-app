import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import App from '../App'
import RoleBasedAcces from './RoleBasedAcces'

import Navbar from '../Components/Navbar/Navbar'
import Client from '../Pages/Client'
import Request from '../Pages/Requests'
import Offers from '../Pages/Offer'
import Orders from '../Pages/Orders'
import LoginPage from '../Pages/LoginPage/LoginPage'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<App />}>
                {/* Rute autentificare */}
                <Route path='/' element={<LoginPage />} />
                {/* Rute utilizator */}
                <Route element={<RoleBasedAcces WrapperComponent={Navbar} />}>
                    <Route path='/clienti' element={<Client />} />
                    <Route path='/cereri' element={<Request />} />
                    <Route path='/oferte' element={<Offers />} />
                    <Route path='/comenzi' element={<Orders />} />
                </Route>
            </ Route>
        </>
    )
)

export default router;