import { Box } from "@mui/material"
import CollectionSlider from "./slider/CollectionSlider"
import styles from "./home.module.scss"

const HomePage = () => {
    
    return (
      
            <Box className={styles.container}>
                <p className={`${styles.title} pt-2 pb-7`} >
                    COLLECTION
                </p>
                <CollectionSlider />
                <p className={`${styles.title} pt-10 pb-8`}>
                    CHARMS
                </p>
                <CollectionSlider />
            </Box>
      
    )
}

export default HomePage
