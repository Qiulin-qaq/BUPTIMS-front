import Home from '../pages/layout'
import Login from '../pages/login'
import Signup from '../pages/signup'

import {createBrowserRouter} from "react-router-dom"

const router = createBrowserRouter([
    {
        path: "/home/display",
        element: <Home/>
    },
    {
        path: "/user/login",
        element: <Login/>
    },
    {
        path: "/user/signup",
        element: <Signup />
    }
])

export default router
