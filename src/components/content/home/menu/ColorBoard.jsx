import { selectActiveLink, selectColorBoard, switchToActive } from "../../../../features/board/ColorBoardSlice.jsx"
import { useDispatch, useSelector } from "react-redux"
import ClearIcon from '@mui/icons-material/Clear';
import { getColorBoard } from "../fetchAPI.js"
import BoardItem from "./actions/BoardItem.jsx";
import styles from "./board.module.scss";
import { Box } from "@mui/material"
import { useEffect } from "react"

const ColorBoard = () => {
    const dispatch = useDispatch()

    const board = useSelector(selectColorBoard);
    const activeLink = useSelector(selectActiveLink);

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
                    {board?.map(({ id, title, price, img }) => (
                        <Box
                            key={id}
                            className={`${styles.element} ${activeLink === id && styles.active}`}
                            onClick={() => dispatch(switchToActive(id))}
                        >
                            <img className={styles.color} src={img} alt={title} />
                            <Box className={styles.title}>{title}</Box>
                            <span className={styles.price}>{price}</span>
                        </Box>
                    ))}
                </Box>
            </Box>
            <BoardItem id={board} />
        </>
    )
}

export default ColorBoard