import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"
import { Box, Button, Menu, MenuItem } from "@mui/material"
import styles from "./header.module.scss"
import { Link } from "react-router-dom"
import { navbar } from "./models"
import { useState } from "react"

const Header = () => {
    const [elem, setElem] = useState(false);
    const [activeLink, setActiveLink] = useState(null);

    const handleClick = (event) => {
        setElem(event.currentTarget);
    };

    const handleClose = () => {
        setElem(false);
    };

    const handleActive = (id) => {
        setActiveLink(id);
    };


    return (
        <Box className={styles.container}>
            <Link to="/" className={styles.title}>COMPOSET</Link>
            <Box className={styles.nav}>
                {navbar.map(({ id, title, path, icon }) => (
                    <>
                        <Link
                            key={id}
                            to={path}
                            className={`${styles.navItem} ${activeLink === id}`}
                            onClick={() => handleActive(id)}
                        >
                            {icon} {title}
                        </Link>
                    </>
                ))}
                {/* <div className={styles.underline}></div> */}
                <Button
                    sx={{ color: "whitesmoke" }}
                    onClick={handleClick}
                >
                    EN {!elem ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
                </Button>
                <Menu
                    color="black"
                    anchorEl={elem}
                    open={elem}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>RU</MenuItem>
                    <MenuItem onClick={handleClose}>AM</MenuItem>
                </Menu>
            </Box>
        </Box >
    )
}

export default Header
