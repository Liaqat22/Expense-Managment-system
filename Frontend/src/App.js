import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../src/component/Layout/Layout'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AddTrans from './pages/AddTrans';
import EditTrans from './pages/EditTrans';






const App = () => {


    return (
        <>
            <Layout>
                <Routes>
                    <Route path='/' element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/add' element={<AddTrans />} />
                    <Route path='/edit/:id' element={<EditTrans />} />
                </Routes>

            </Layout>
        </>
    )
}
export function ProtectedRoute(props) {
    if (localStorage.getItem('auth')) {
        return props.children
    } else {
      return  <Navigate to='/login' />
    }
}
export default App
