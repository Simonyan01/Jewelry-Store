import { getCollections, postCollections, seeMoreInfo, selectCollections, switchToActive, switchToActiveHeart } from "features/collections/CollectionSlice";
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, CircularProgress, Fade, Stack } from "@mui/material"
import { postToWishlist } from "features/wishlist/WishlistSlice";
import { getBeltBoard } from "features/board/BoardSlice";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Navigation, Pagination } from 'swiper/modules';
import { useDispatch, useSelector } from "react-redux";
import { postToBagList } from "features/bag/BagSlice";
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from "./collection.module.scss"
import { useEffect, useRef } from "react";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';


const CollectionSlider = () => {
    const swiperRef = useRef()
    const dispatch = useDispatch()

    const { collection, activeLink, modalSrc, loading, error } = useSelector(selectCollections);

    useEffect(() => {
        dispatch(getCollections())
    }, [dispatch])

    return (
        <>
            <p className={`${styles.title} pb-8`}>COLLECTION</p>
            {loading ? <CircularProgress className={styles.progress} /> :
                error ? <p className={styles.errorText}>Data not found.</p> :
                    <Box className={styles.container}>
                        <ArrowBackIosNewIcon
                            className={`${styles.arrowLeft} arrow-left`}
                            onClick={() => swiperRef.current && swiperRef.current.swiper.slidePrev()}
                        />
                        <Swiper
                            slidesPerView={6}
                            spaceBetween={30}
                            loop={true}
                            pagination={{ clickable: true }}
                            navigation={{
                                prevEl: '.arrow-left',
                                nextEl: '.arrow-right',
                            }}
                            modules={[Pagination, Navigation]}
                            className="mySwiper select-none"
                        >
                            {collection?.map(({ id, title, img, price, additional, addToBag, isChecked }) => (
                                <SwiperSlide key={id} className="h-72">
                                    <Box
                                        ref={swiperRef}
                                        className={`${activeLink === id && styles.active}`}
                                    >
                                        <Box className={styles.card}>
                                            {isChecked ?
                                                <FavoriteIcon
                                                    className={styles.favoriteIcon}
                                                    onClick={() => dispatch(switchToActiveHeart(null))}
                                                /> :
                                                <FavoriteBorderSharpIcon
                                                    className={styles.sharpIcon}
                                                    onClick={() => {
                                                        dispatch(postToWishlist({ price, title, img, additional, addToBag })) &&
                                                            dispatch(switchToActiveHeart(id))
                                                    }}
                                                />
                                            }
                                            <img
                                                src={img}
                                                alt={title}
                                                className={styles.img}
                                                onClick={() => {
                                                    dispatch(switchToActive(id))
                                                    dispatch(seeMoreInfo(!modalSrc))
                                                    dispatch(postCollections({ price, title, img })) &&
                                                        setTimeout(() => dispatch(getBeltBoard()), 500)
                                                }
                                                }
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
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <ArrowForwardIosIcon
                            className={`${styles.arrowRight} arrow-right`}
                            onClick={() => swiperRef.current && swiperRef.current.swiper.slideNext()}
                        />
                    </Box>
            }
        </>
    )
}

export default CollectionSlider