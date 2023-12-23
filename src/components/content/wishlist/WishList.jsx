import { deleteInWishlist, getWishlist, seeMoreInfo, selectWishlistState, switchToActive } from "../../../features/wishlist/WishListSlice"
import { postToBagList } from "../../../features/bag/BagSlice"
import WishlistPagination from "./pagination/Pagination"
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useDispatch, useSelector } from "react-redux"
import { Box, Fade, Stack } from "@mui/material"
import styles from "./wishlist.module.scss"
import { useEffect } from "react"

const WishList = () => {
  const dispatch = useDispatch()

  const { modalSrc, wishlist, activeLink, currentPage, itemsPerPage } = useSelector(selectWishlistState)

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
          <WishlistPagination />
        </Box>
      }
    </>
  )
}

export default WishList