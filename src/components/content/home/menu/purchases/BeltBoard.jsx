import { changeBeltColour, deleteBeltBoardItem, getBeltBoard, selectBoardState, switchToActive } from "../../../../../features/board/BoardSlice";
import { useDispatch, useSelector, } from "react-redux";
import belt from "../../../../../images/board/belt.png"
import RefreshIcon from '@mui/icons-material/Refresh';
import styles from "./belt-board.module.scss"
import { Box } from "@mui/material"
import { useEffect } from "react";

const BeltBoard = () => {
    const dispatch = useDispatch()

    const { beltBoard, box, isPainted, colorBoard } = useSelector(selectBoardState);

    useEffect(() => {
        dispatch(getBeltBoard())
    }, [dispatch])

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
                    <Box
                        style={{ backgroundImage: `url(${isPainted})` }}
                        className={`${styles.clipPath}`}>
                        {beltBoard?.map(({ id, img, title }) => (
                            <img className={styles.activeImg} key={id} src={img} alt={title} />
                        ))}
                    </Box>
                </Box>
                <RefreshIcon
                    className={styles.refreshButton}
                    onClick={() => {
                        if (dispatch(deleteBeltBoardItem(beltBoard[0].id))) {
                            setTimeout(() => {
                                dispatch(getBeltBoard())
                                dispatch(changeBeltColour(""))
                                dispatch(switchToActive(null))
                            }, 300)
                        }
                    }}
                />
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
                                <Box>{colorBoard[i].price}</Box>
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