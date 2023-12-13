import { deleteInWishlist, getWishlist, seeMoreInfo, selectActiveLink, selectError, selectLoading, selectModalSrc, selectWishlist, switchToActive } from "../../../features/wishlist/WishListSlice"
import { Box, CircularProgress, Fade, Pagination, Stack } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from "react-redux"
import { paginataionStyles } from "./styles"
import styles from "./wishlist.module.scss"
import { useEffect } from "react"

const WishList = () => {
  const dispatch = useDispatch()

  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const modalSrc = useSelector(selectModalSrc);
  const wishlist = useSelector(selectWishlist);
  const activeLink = useSelector(selectActiveLink);

  useEffect(() => {
    dispatch(getWishlist())
  }, [dispatch])

  return (
    <>
      {loading ? <CircularProgress className={styles.progress} /> :
        error ? <p className={styles.errorText}>Data not found.</p> :
          <Box className={styles.mainContainer}>
            <Box className={styles.wishlistContainer}>
              {wishlist?.map(({ id, title, img, price, additional }) => (
                <Box key={id} className={`${activeLink === id && styles.active}`}>
                  <Box className={styles.card}>
                    <FavoriteIcon
                      className={styles.favoriteIcon}
                      onClick={() => {
                        dispatch(deleteInWishlist(id))
                        dispatch(getWishlist())
                        dispatch(switchToActive(null))
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
                      <Box className={styles.addToBag}>Add To Bag</Box>
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
            </Box>
          </Box>
      }
    </>
  )
}

export default WishList