import { deleteInWishlist, getWishlist, seeMoreInfo, selectWishlistState, setCurrentPage, switchToActive } from "../../../features/wishlist/WishListSlice"
import { Box, Fade, Pagination, Stack } from "@mui/material"
import { postToBagList } from "../../../features/bag/BagSlice"
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useDispatch, useSelector } from "react-redux"
import { paginataionStyles } from "./styles"
import styles from "./wishlist.module.scss"
import { useEffect } from "react"

const WishList = () => {
  const dispatch = useDispatch()

  const { modalSrc, wishlist, activeLink, currentPage, itemsPerPage } = useSelector(selectWishlistState)

  const totalPages = Math.ceil(wishlist.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    dispatch(getWishlist())
  }, [dispatch, currentPage])

  return (
    <>
      {!wishlist || wishlist.length === 0 ? <p className={styles.errorText}>Your wishlist is empty . . .</p> :
        <Box className={styles.mainContainer}>
          <Box className={styles.wishlistContainer}>
            {wishlist?.slice(startIndex, endIndex).map(({ id, title, img, price, additional, addToBag }) => (
              <Box key={id} className={`${activeLink === id && styles.active}`}>
                <Box className={styles.card}>
                  <FavoriteIcon
                    className={styles.favoriteIcon}
                    onClick={() => {
                      dispatch(deleteInWishlist(id)) &&
                        setTimeout(() => dispatch(getWishlist()), 100)
                    }}
                  />
                  <img
                    src={img}
                    alt={title}
                    className={styles.img}
                    onClick={() => {
                      dispatch(switchToActive(id))
                      dispatch(seeMoreInfo(!modalSrc))
                    }}
                  />
                  <Box className={styles.description}>
                    <span className={styles.cardName}>
                      {title}
                    </span>
                    <span className={styles.cardPrice}>
                      {price} $
                    </span>
                  </Box>
                  <Box className={styles.additional}>
                    <Box
                      className={styles.addToBag}
                      onClick={() => dispatch(postToBagList({ title, img, price }))}
                    >
                      {addToBag}
                    </Box>
                    <Box
                      className={styles.moreInfo}
                      onClick={() => dispatch(seeMoreInfo(id))}
                    >
                      {additional}
                      {modalSrc === id && (
                        <Fade in={modalSrc}>
                          <Stack
                            className={styles.modal}
                            onClick={(e) => {
                              e.stopPropagation()
                              dispatch(seeMoreInfo(!modalSrc))
                            }}
                          > Awesome bracelet
                          </Stack>
                        </Fade>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
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
        </Box>
      }
    </>
  )
}

export default WishList