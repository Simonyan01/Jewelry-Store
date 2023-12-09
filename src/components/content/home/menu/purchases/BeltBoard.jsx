/* eslint-disable react-hooks/exhaustive-deps */
import { selectBoard } from "../../../../../features/collections/CollectionSlice";
import { clearBeltItems, selectBeltColour, selectBox } from "../../../../../features/board/BoardSlice";
import belt from "../../../../../images/board/belt.png"
import RefreshIcon from '@mui/icons-material/Refresh';
import styles from "./belt-board.module.scss"
import { useDispatch, useSelector, } from "react-redux";
import { Box } from "@mui/material"

const BeltBoard = () => {
    const dispatch = useDispatch()

    const isPainted = useSelector(selectBeltColour)
    const box = useSelector(selectBox)
    const board = useSelector(selectBoard);

    // console.log(isPainted);

    return (
        <Box className={styles.mainContainer}>
            <Box className={styles.subContainer}>
                <Box className={styles.beltContainer}>
                    <img
                        src={belt}
                        alt="Belt chain"
                        width={210}
                        className={styles.beltChain}    
                    />
                    <Box className={`${styles.clipPath} ${isPainted && styles.activeColour}`}>
                        {board?.map(({ id, img, title }) => (
                            <img className={styles.activeImg} key={id} src={img} alt={title} />
                        ))}
                    </Box>
                </Box>
                <RefreshIcon onClick={() => dispatch(clearBeltItems())} className={styles.refreshButton} />
            </Box>
            <Box className={styles.discount}>
                <Box className={styles.title}>Belt</Box>
                <Box className={styles.discountedPrice}>
                    <span className={styles.discountedPriceText}> Belt Price:</span> 400,00 $
                </Box>
            </Box>
            <Box className={styles.boxContainer}>
                {box.map((item, i) => (
                    <Box key={i} className={styles.box}>
                        {
                            item && <>
                                <img src={box[i].img} alt="box" />
                                <Box>{board[i].price}</Box>
                            </>
                        }
                    </Box>
                ))}
            </Box>
            <Box className={styles.totalPrice}>
                <span className={styles.totalPriceText}>Total Price:</span> 578,00 $
            </Box>
        </Box>
    )
}

export default BeltBoard