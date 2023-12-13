import CollectionSlider from "./collections/CollectionSlider"
import CharmSlider from "./charms/CharmSlider"
import styles from "./slider.module.scss"
import { Box } from "@mui/material"

const Slider = () => {
    return (
        <Box className={styles.container}>
            <CollectionSlider />
            <CharmSlider />
        </Box>
    )
}

export default Slider