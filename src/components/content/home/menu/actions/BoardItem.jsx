/* eslint-disable no-unused-vars */
import belt from "../../../../../images/board/belt.png"
import RefreshIcon from '@mui/icons-material/Refresh';
import styles from "./board_item.module.scss"
import { Box } from "@mui/material"

const BoardItem = () => {
    const items = [
        {
            id: 1,
            price: "49,00$"
        }
    ]
    return (
        <Box className={`${styles.mainContainer}`}>
            <Box className={styles.subContainer}>
                <Box className={styles.beltContainer}>
                    <img
                        src={belt}
                        alt="Belt chain"
                        width={210}
                        className={styles.beltChain}
                    />
                    <Box className={styles.clipPath}></Box>
                </Box>
                <RefreshIcon className={styles.refreshButton} />
            </Box>
            <Box className={styles.discount}>
                <Box className={styles.title}>Belt</Box>
                <Box className={styles.discountedPrice}>
                    <span className={styles.discountedPriceText}> Belt Price:</span> 400,00 $
                </Box>
            </Box>
            <Box className={styles.boxContainer}>
                {Array(14).fill(null).map((item, i) => (
                    <Box
                        key={i}
                        className={styles.box}
                    >
                        {item}
                    </Box>
                ))}
            </Box>
            <Box className={styles.totalPrice}>
                <span className={styles.totalPriceText}>Total Price:</span> 578,00 $
            </Box>
        </Box>
    )
}

export default BoardItem