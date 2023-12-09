import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"
import { selectActiveLink, selectLanguageBar, toggleBar } from "../../features/header/HeaderSlice"
import { switchToActive } from "../../features/header/HeaderSlice"
import { Box, Button, Menu, MenuItem } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import styles from "./header.module.scss"
import { Link } from "react-router-dom"
import { navbar } from "./models"

const Header = () => {
    const dispatch = useDispatch()

    const activeLink = useSelector(selectActiveLink)
    const languageBar = useSelector(selectLanguageBar)

    const handleClose = (prev) => dispatch(toggleBar(!prev))

    return (
        <Box className={styles.container}>
            <Box className={styles.nav}>
                {navbar.map(({ id, title, path, icon }) => (
                    <Link
                        key={id}
                        to={path}
                        className={`${styles.navItem} ${activeLink === id && styles.active}`}
                        onClick={() => dispatch(switchToActive(id))}
                    >
                        {icon} {title}
                    </Link>
                ))}
                <Button
                    sx={{ color: "whitesmoke" }}
                    onClick={(e) => dispatch(toggleBar(e.currentTarget))}
                >
                    EN {!languageBar ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
                </Button>
                <Menu
                    color="black"
                    anchorEl={languageBar}
                    open={languageBar}
                    onClose={handleClose}
                >
                    <MenuItem>RU</MenuItem>
                    <MenuItem>AM</MenuItem>
                </Menu>
            </Box>
        </Box>
    )
}

export default Header
