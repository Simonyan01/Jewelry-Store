import styles from "./footer.module.scss"
import { Box } from "@mui/material"

const Footer = () => {
    return (
        <Box className={styles.footerContainer}>
            © 2024 Composet. All Rights Reserved.
        </Box>
    )
}

export default Footer