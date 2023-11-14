import { Route, Routes, useRoutes } from "react-router-dom"
import HomePage from "../../Content/HomePage"
import WishList from "../../Content/WishList"
import { navbar } from "../models"

export const Routing = () => {
    const element = useRoutes([
        { path: "/", element: <HomePage /> },
        {
            path: "/wishlist",
            element: <WishList />,
        },
        {
            path: "/bag",
        },
        {
            path: "/account",
        },
    ])
    
    return (
        <Routes>
            {navbar.map(({ id, path }) => (
                <Route key={id} path={path} element={element} />
            ))}
        </Routes>
    )
}
