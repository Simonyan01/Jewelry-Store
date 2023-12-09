import CollectionSlider from "./collections/CollectionSlider"
import CharmSlider from "./charms/CharmSlider"
import styles from "./slider.module.scss"
import { Box, IconButton } from "@mui/material"
import { SnackbarProvider, closeSnackbar } from "notistack"
import { Close } from "@mui/icons-material"
import { useDispatch } from "react-redux"

const Slider = () => {
    const dispatch = useDispatch()

    const handleCloseSnackbar = () => dispatch(closeSnackbar());

    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
        >
            <Close fontSize="small" />
        </IconButton>
    );
    return (
        <Box className={styles.container}>
            <SnackbarProvider
                maxSnack={3}
                action={action}
                autoHideDuration={3000}
            >
                <CollectionSlider />
                <CharmSlider />
            </SnackbarProvider>
        </Box>
    )
}

export default Slider