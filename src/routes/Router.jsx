import { Route, Routes, useRoutes } from "react-router-dom"
import UserAccount from "components/content/account/UserAccount"
import WishList from "components/content/wishlist/WishList"
import HomePage from "components/content/home/HomePage"
import Bag from "components/content/bag/Bag"

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

    const navbarRoutes = [
        { path: '/' },
        { path: '/wishlist' },
        { path: '/bag' },
        { path: '/account' },
    ];

    return (
        <Routes>
            {navbarRoutes.map(({ path }, i) => <Route key={i} path={path} element={element} />)}
        </Routes>
    )
}

export default Router
