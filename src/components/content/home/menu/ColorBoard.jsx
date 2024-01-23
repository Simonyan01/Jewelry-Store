import { useDispatch, useSelector } from "react-redux"
import ClearIcon from '@mui/icons-material/Clear';
import styles from "./color-board.module.scss";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { changeBeltColour, getColorBoard, selectBoardState, switchToActive } from "features/board/BoardSlice";

const ColorBoard = () => {
    const dispatch = useDispatch()

    const { colorBoard, activeLink } = useSelector(selectBoardState);

    useEffect(() => {
        dispatch(getColorBoard())
    }, [dispatch])

    return (
        <>
            <Box className={styles.mainContainer}>
                <Box className={styles.actions}>
                    <Box className={styles.title}>Belt</Box>
                    <ClearIcon className={styles.clearButton} />
                </Box>
                <Box className={styles.subContainer}>
                    {colorBoard?.map(({ id, title, price, img }) => (
                        <Box
                            key={id}
                            className={`${styles.element} ${activeLink === id && styles.active}`}
                            onClick={() => {
                                dispatch(switchToActive(id))
                                dispatch(changeBeltColour(img))
                            }}
                        >
                            <img className={styles.color} src={img} alt={title} />
                            <Box className={styles.title}>{title}</Box>
                            <span className={styles.price}>{price}</span>
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    )
}

export default ColorBoard