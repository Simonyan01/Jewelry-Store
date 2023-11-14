import { useState } from "react"
import { Link } from "react-router-dom"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"
import { Box, Button, Menu, MenuItem } from "@mui/material"
import { navbar } from "./models"
import styles from "./header.module.scss"

export const Header = () => {
    const [elem, setElem] = useState(false);

    const handleClick = (event) => {
        setElem(event.currentTarget);
    };
    const handleClose = () => {
        setElem(false);
    };
    return (
        <Box className={styles.container}>
            <Link to="/" className={styles.title}>COMPOSET</Link>
            <Box className={styles.nav}>
                {navbar.map(({ id, title, path, icon }) => (
                    <Link key={id} to={path} className={styles.navItem}>
                        {icon} {title}
                    </Link>
                ))}
                <Button
                    sx={{ color: "whitesmoke" }}
                    onClick={handleClick}
                >
                    EN {!elem ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
                </Button>
                <Menu
                    anchorEl={elem}
                    open={elem}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>RU</MenuItem>
                    <MenuItem onClick={handleClose}>AM</MenuItem>
                </Menu>
            </Box>
        </Box>
    )
}

