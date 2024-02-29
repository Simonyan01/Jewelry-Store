import { selectWishlistState, setCurrentPage } from "features/wishlist/WishlistSlice"
import { useDispatch, useSelector } from "react-redux"
import { Box, Pagination } from "@mui/material"
import styles from "../wishlist.module.scss"
import { paginataionStyles } from "./styles"

const WishlistPagination = () => {
    const dispatch = useDispatch()

    const { wishlist, currentPage, itemsPerPage } = useSelector(selectWishlistState)

    const totalPages = Math.ceil(wishlist.length / itemsPerPage);

    return (
        <Box className={styles.pagination}>
            <Pagination
                onChange={(_, newPage) => dispatch(setCurrentPage(newPage))}
                sx={paginataionStyles}
                page={currentPage}
                count={totalPages}
                boundaryCount={2}
                defaultValue={5}
                siblingCount={0}
                variant="outlined"
                color="primary"
                shape="rounded"
                size="large"
            />
        </Box>
    )
}

export default WishlistPagination