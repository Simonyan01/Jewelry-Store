import { deleteInBagList, getBagList, selectBagState } from "../../../features/bag/BagSlice";
import { useDispatch, useSelector } from "react-redux";
import ClearIcon from '@mui/icons-material/Clear';
import styles from "./bag.module.scss"
import { Box } from "@mui/material"
import { useEffect } from "react";
import { icons } from "./data"

const Bag = () => {
    const dispatch = useDispatch()

    const { bag } = useSelector(selectBagState)

    useEffect(() => {
        dispatch(getBagList())
    }, [dispatch])

    return (
        <Box className={styles.mainContainer}>
            <Box className={styles.subContainer}>
                <ClearIcon className={styles.clearIcon} />
                {bag?.map(({ id, title, img, price }) => (
                    <Box key={id}>
                        <Box className={styles.bagItem}>
                            <img
                                onClick={() => {
                                    dispatch(deleteInBagList(id)) &&
                                        dispatch(getBagList())
                                }}
                                className={styles.trashIcon}
                                src="src/images/bag/trash.png"
                                alt="trash image"
                            />
                            <img className={styles.bagImg} src={img} alt={title} />
                            <span className={styles.bagItemTitle}>{title}</span>
                            {icons.map(({ id, img, title }) => (
                                <img key={id} src={img} alt={title} />
                            ))}
                            <Box className={styles.counter}>
                                <Box className={styles.calculate}>
                                </Box>
                                <Box className={styles.initialState}>1</Box>
                                <Box className={styles.calculate}>
                                </Box>
                            </Box>
                            <Box className={styles.bagItemPrice}>{price}$</Box>
                        </Box>
                        <Box className={styles.line}></Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default Bag