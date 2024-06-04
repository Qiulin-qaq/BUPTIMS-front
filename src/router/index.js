import Layout from '../pages/layout'
import Login from '../pages/login'

import {createBrowserRouter} from "react-router-dom"

const  router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>
    },
    {
        path: "/login",
        element: <Login/>
    }
])

export default router
