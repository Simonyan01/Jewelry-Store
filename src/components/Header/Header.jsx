import { changeLanguageType, selectHeaderState, toggleBar } from "../../features/header/HeaderSlice"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"
import { switchToActive } from "../../features/header/HeaderSlice"
import { Box, Button, Menu, MenuItem, } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
// import { useTranslation } from "react-i18next"
import styles from "./header.module.scss"
import { Link } from "react-router-dom"
import { navbar } from "./models"

const lngs = {
    en: { text: 'EN' },
    ru: { text: 'RU' },
    hy: { text: 'AM' },
};

const Header = () => {
    const dispatch = useDispatch()
    // const { i18n } = useTranslation()

    const { activeLink, languageBar, language } = useSelector(selectHeaderState)

    // const changeLanguage = (language) => {
    //     i18n.changeLanguage(language);
    // };

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
                    {language} {!languageBar ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
                </Button>
                <Menu
                    color="black"
                    anchorEl={languageBar}
                    onClose={handleClose}
                    open={languageBar}
                    value={language}
                >
                    {Object.keys(lngs).map((lng) => (
                        <MenuItem key={lng} onClick={() => {
                            // changeLanguage(lng)
                            dispatch(changeLanguageType(lng))
                        }}>
                            {lngs[lng].text}
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </Box>
    )
}

export default Header
