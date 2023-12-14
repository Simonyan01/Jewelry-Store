import { deleteInWishlist, getWishlist, seeMoreInfo, selectWishlistState, setCurrentPage, switchToActive } from "../../../features/wishlist/WishListSlice"
import { Box, CircularProgress, Fade, Pagination, Stack } from "@mui/material"
import { getBagList, postToBagList } from "../../../features/bag/BagSlice"
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useDispatch, useSelector } from "react-redux"
import { paginataionStyles } from "./styles"
import styles from "./wishlist.module.scss"
import { useEffect } from "react"

const WishList = () => {
  const dispatch = useDispatch()

  const { error, loading, modalSrc, wishlist, activeLink, currentPage, itemsPerPage } = useSelector(selectWishlistState)

  const totalPages = Math.ceil(wishlist.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePagination = (event, newPage) => {
    dispatch(setCurrentPage(newPage))
  }

  useEffect(() => {
    dispatch(getWishlist())
  }, [dispatch, currentPage])

  return (
    <>
      {loading ? <CircularProgress className={styles.progress} /> :
        error ? <p className={styles.errorText}>Data not found.</p> :
          <Box className={styles.mainContainer}>
            <Box className={styles.wishlistContainer}>
              {wishlist?.slice(startIndex, endIndex).map(({ id, title, img, price, additional }) => (
                <Box key={id} className={`${activeLink === id && styles.active}`}>
                  <Box className={styles.card}>
                    <FavoriteIcon
                      className={styles.favoriteIcon}
                      onClick={() => {
                        dispatch(switchToActive(null))
                        if (dispatch(deleteInWishlist(id))) {
                          dispatch(getWishlist())
                        }
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
                        {price}
                      </span>
                    </Box>
                    <Box className={styles.additional}>
                      <Box onClick={() => {
                        if (dispatch(postToBagList({ title, img, price }))) {
                          dispatch(getBagList())
                        }
                      }
                      } className={styles.addToBag}>Add To Bag</Box>
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
                onChange={handlePagination}
                sx={paginataionStyles}
                page={currentPage}
                count={totalPages}
                boundaryCount={2}
                defaultValue={5}
                siblingCount={0}
                size="large"
                shape="rounded"
                color="primary"
                variant="outlined"
              />
            </Box>
          </Box>
      }
    </>
  )
}

export default WishList