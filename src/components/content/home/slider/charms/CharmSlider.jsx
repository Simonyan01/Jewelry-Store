import { selectCharms, switchToActive, seeMoreInfo, getCharms, switchToActiveHeart, postCharms } from "../../../../../features/charms/CharmSlice";
import { postToWishlist } from "../../../../../features/wishlist/WishListSlice";
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import { getBeltBoard } from "../../../../../features/board/BoardSlice";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { postToBagList } from "../../../../../features/bag/BagSlice";
import { Box, CircularProgress, Fade, Stack } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Navigation, Pagination } from 'swiper/modules';
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useRef } from "react";
import styles from "./charm.module.scss"
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

const CharmSlider = () => {
    const swiperRef = useRef()
    const dispatch = useDispatch()

    const { charm, activeLink, modalSrc, loading, error } = useSelector(selectCharms);

    useEffect(() => {
        dispatch(getCharms())
    }, [dispatch])

    return (
        <>
            <p className={`${styles.title} py-10`}> CHARMS </p>
            {loading ? <CircularProgress className={styles.progress} /> :
                error ? <p className={styles.errorText}>Data not found.</p> :
                    <Box className={styles.container}>
                        <ArrowBackIosNewIcon
                            className={`${styles.arrowLeft} arrow-Left`}
                            onClick={() => swiperRef.current &&
                                swiperRef.current.swiper.slidePrev()}
                        />
                        <Swiper
                            slidesPerView={6}
                            spaceBetween={30}
                            loop={true}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={{
                                prevEl: '.arrow-Left',
                                nextEl: '.arrow-Right',
                            }}
                            modules={[Pagination, Navigation]}
                            className="mySwiper select-none"
                        >
                            {charm?.map(({ id, price, title, img, additional, addToBag, isChecked }) => (
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
                                                    dispatch(postCharms({ price, title, img })) &&
                                                        setTimeout(() => dispatch(getBeltBoard()), 500)
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
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <ArrowForwardIosIcon
                            className={`${styles.arrowRight} arrow-Right`}
                            onClick={() => swiperRef.current &&
                                swiperRef.current.swiper.slideNext()}
                        />
                    </Box>
            }
        </>
    )
}

export default CharmSlider