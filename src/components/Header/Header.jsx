import { changeLanguageType, selectHeaderState, switchToActive, toggleBar } from "features/header/HeaderSlice"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"
import { Box, Button, Menu, MenuItem, } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import styles from "./header.module.scss"
import { Link } from "react-router-dom"
import { navbar } from "./models"

const Header = () => {
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()

    const { activeLink, languageBar, language } = useSelector(selectHeaderState)

    const handleClose = (prev) => dispatch(toggleBar(!prev))

    const handleLanguageChange = (lng) => {
        i18n.changeLanguage(lng);
        dispatch(changeLanguageType(lng));
        handleClose(lng);
    };

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
                        {icon} {t(`translation:${title}`)}
                    </Link>
                ))}
            </Box>
            <Button
                sx={{ color: "whitesmoke" }}
                onClick={(e) => dispatch(toggleBar(e.currentTarget))}
            >
                {language} {!languageBar ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
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
                            onClick={() => handleLanguageChange(lng)}>
                            {lng.toUpperCase()}
                        </MenuItem>
                    ))}
            </Menu>
        </Box>
    )
}

export default Header
