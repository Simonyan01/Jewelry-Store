import { Route, Routes, useRoutes } from "react-router-dom"
import { navbar } from "components/header/models"
import HomePage from "components/content/HomePage"
import WishList from "components/content/WishList"
import UserAccount from "components/content/UserAccount"
import Bag from "components/content/Bag"

const Router = () => {
    const element = useRoutes([
        { path: "/", element: <HomePage /> },
        {
            path: "/wishlist",
            element: <WishList />,
        },
        {
            path: "/bag",
            element: <Bag />
        },
        {
            path: "/account",
            element: <UserAccount />
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

export default Router
