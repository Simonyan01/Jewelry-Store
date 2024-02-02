import { changeLanguageType, selectHeaderState, switchToActive, toggleBar } from "features/header/HeaderSlice"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"
import { Box, Button, Drawer, IconButton, Menu, MenuItem } from "@mui/material"
import { MiscellaneousServicesOutlined } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import styles from "./header.module.scss"
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import { navbar } from "./models"
import { t } from "i18next"

const Header = (props) => {
    const dispatch = useDispatch()
    const { i18n } = useTranslation()
    const { window } = props
    const drawerWidth = 240;
    const { activeLink, languageBar, language } = useSelector(selectHeaderState)
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleClose = (prev) => dispatch(toggleBar(!prev))

    const handleChangeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        dispatch(changeLanguageType(lng));
        handleClose(lng);
    };

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    useEffect(() => {
        const storedLanguage = localStorage.getItem("language");
        if (storedLanguage) {
            dispatch(changeLanguageType(storedLanguage));
            i18n.changeLanguage(storedLanguage);
        }
    }, [dispatch, i18n]);

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            {navbar.map(({ id, title, path, icon }) => (
                <Link
                    key={id}
                    to={path}
                    className={`${styles.navItem} ${activeLink === id && styles.active}`}
                    onClick={() => dispatch(switchToActive(id))}
                >
                    {icon} {t(`translation:${title}`)}
                </Link>
            ))}
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box className={styles.container}>
            <Box className={styles.nav}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MiscellaneousServicesOutlined />
                </IconButton>

                <Box className="hidden sm:flex sm:justify-between ">
                    {navbar.map(({ id, title, path, icon }) => (
                        <Link
                            key={id}
                            to={path}
                            className={`${styles.navItem} ${activeLink === id && styles.active}`}
                            onClick={() => dispatch(switchToActive(id))}
                        >
                            {icon} {t(`translation:${title}`)}
                        </Link>
                    ))}
                </Box>
            </Box>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Button
                sx={{ color: "whitesmoke" }}
                onClick={(e) => dispatch(toggleBar(e.currentTarget))}
            >
                {language} {languageBar ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </Button>
            <Menu
                PaperProps={{ style: { backgroundColor: "#2F333A", color: "white" } }}
                anchorEl={languageBar}
                onClose={handleClose}
                open={languageBar}
            >
                {Object.keys(i18n.options.resources)
                    .map((lng, i) => (
                        <MenuItem
                            key={i}
                            disabled={i18n.resolvedLanguage === lng}
                            onClick={() => handleChangeLanguage(lng)}
                        >
                            {lng.toUpperCase()}
                        </MenuItem>
                    ))}
            </Menu>
        </Box>
    )
}

Header.propTypes = {
    window: PropTypes.func,
};

export default Header

