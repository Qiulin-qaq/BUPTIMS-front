import Home from '../pages/layout'
import Login from '../pages/login'
import Signup from '../pages/signup'
import SearchPage from '../pages/search'

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
    },
    {
        path: "home/search",
        element: <SearchPage/>
    }
])

export default router
