import { createBrowserRouter } from "react-router-dom";

import Cart from "./pages/cart";
import Dashboard from "./pages/dashboard";
import Detail from "./pages/detail";
import Card from "./component/card";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard />,
        children: [
            {
                path: '',
                element: <Card />,
            },
            {
                path: 'cart',
                element: <Cart />,
            },
            {
                path: 'detail/:id',
                element: <Detail />,
            },
        ],
    },
])

export default router