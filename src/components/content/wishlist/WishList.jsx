import { Box, Pagination, Stack } from "@mui/material"
import styles from "./wishlist.module.scss"
import { paginataionStyles } from "./styles"

const WishList = () => {
  return (
    <Box className={styles.mainContainer}>
      <Box className="text-center select-none">vsdfsd</Box>
      <Box className={styles.pagination}>
        <Stack>
          <Pagination
            sx={paginataionStyles}
            defaultValue={5}
            siblingCount={0}
            boundaryCount={2}
            count={10}
            color="primary"
            size="large"
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </Box>
    </Box>
  )
}

export default WishList