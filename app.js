import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import Homepage from './src/pages/homepage/homepage'
import SignUp from "./src/pages/homepage/signup";
import Login from "./src/pages/homepage/login";
import AllProducts from "./src/pages/homepage/AllProducts";
import PointsContext from "./src/pages/context/pointsContext";
import Cart from "./src/pages/homepage/Cart";

const React = require('react')
const ReactDOM = require('react-dom/client')

const parent = document.getElementById("root");
const root = ReactDOM.createRoot(parent);

const App = () => {

    const [userPoints, setUserPoints] = useState(0);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Homepage />
        },
        {
            path: "/signup",
            element: <SignUp />
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/allproducts",
            element: <AllProducts />
        },
        {
            path: "/cart",
            element: <Cart />
        }
    ]);

    return (
        <div>
           
            <PointsContext.Provider value={{
                userPoints: userPoints,
                setUserPoints: setUserPoints
            }}>
                <RouterProvider router={router} />
            </PointsContext.Provider>
        </div>
    )
}


root.render(<App />)