import { selectCharms, selectLoading, selectActiveLink, switchToActive, selectError, selectModalSrc, seeMoreInfo, getCharms, postCharms } from "../../../../../features/charms/CharmSlice";
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import { getBeltBoard } from "../../../../../features/board/BoardSlice";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, CircularProgress, Fade, Stack } from "@mui/material"
import { Navigation, Pagination } from 'swiper/modules';
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useRef } from "react";
import styles from "./charm.module.scss"
import { useSnackbar } from "notistack";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

const CharmSlider = () => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch()
    const swiperRef = useRef()

    const activeLink = useSelector(selectActiveLink);
    const modalSrc = useSelector(selectModalSrc);
    const loading = useSelector(selectLoading);
    const charms = useSelector(selectCharms);
    const error = useSelector(selectError);

    const handleClickVariant = (text, variant) => () => {
        enqueueSnackbar(text, { variant });
    };

    useEffect(() => {
        dispatch(getBeltBoard())
        dispatch(getCharms())
    }, [dispatch])

    return <>
        <p className={`${styles.title} py-10`}> CHARMS </p>
        <Box>
            {loading ? <CircularProgress /> :
                error ? <p className={styles.title}>Data not found.</p> :
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
                            {charms?.map(({ id, price, title, img, additional }) => (
                                <SwiperSlide key={id} className="h-72">
                                    <Box
                                        ref={swiperRef}
                                        className={`${activeLink === id && styles.active}`}
                                    >
                                        <Box className={styles.card}>
                                            <FavoriteBorderSharpIcon
                                                className={styles.sharpIcon}
                                                onClick={handleClickVariant(`${title} added in Wishlist`, 'success')}
                                            />
                                            <img
                                                src={img}
                                                alt={title}
                                                className={styles.img}
                                                onClick={() => {
                                                    if (dispatch(postCharms({ price, title, img }))) {
                                                        setTimeout(() => dispatch(getBeltBoard()), 1000)
                                                    }
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
                                            <Box
                                                className={styles.additional}
                                                onClick={() => dispatch(seeMoreInfo(id))}
                                            >
                                                {additional}
                                                {modalSrc === id &&
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
                                                }
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
        </Box>
    </>
}

export default CharmSlider