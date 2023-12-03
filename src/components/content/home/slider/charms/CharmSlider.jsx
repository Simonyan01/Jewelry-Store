import { selectCharms, selectLoading, selectActiveLink, switchToActive, selectError } from "../../../../../features/charms/CharmSlice";
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Navigation, Pagination } from 'swiper/modules';
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material"
import { Swiper, SwiperSlide } from 'swiper/react';
import { getCharms } from "../../fetchAPI";
import { useEffect, useRef } from "react";
import styles from "./charm.module.scss"
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

const CharmSlider = () => {
    const dispatch = useDispatch()
    const swiperRef = useRef()

    const charms = useSelector(selectCharms);
    const activeLink = useSelector(selectActiveLink);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(getCharms())
    }, [dispatch])

    return <>
        <p className={`${styles.title} py-10`}> CHARMS </p>
        <Box className="text-center">
            {loading ? <CircularProgress /> :
                error ? <p className={styles.title}>Data not found.</p> :
                    <Box className={styles.container}>
                        <ArrowBackIosNewIcon
                            className={`${styles.arrowLeft} arrow-Left`}
                            onClick={() => swiperRef.current && swiperRef.current.swiper.slidePrev()}
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
                                        onClick={() => dispatch(switchToActive(id))}
                                    >
                                        <Box className={styles.card}>
                                            <FavoriteBorderSharpIcon className={styles.sharpIcon} />
                                            <img className={styles.img} src={img} alt={title} />
                                            <Box className={styles.description}>
                                                <span className={styles.cardName}>
                                                    {title}
                                                </span>
                                                <span className={styles.cardPrice}>
                                                    {price}
                                                </span>
                                            </Box>
                                            <Box className={styles.additional}>
                                                {additional}
                                            </Box>
                                        </Box>
                                    </Box>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <ArrowForwardIosIcon
                            className={`${styles.arrowRight} arrow-Right`}
                            onClick={() => swiperRef.current && swiperRef.current.swiper.slideNext()}
                        />
                    </Box>
            }
        </Box>
    </>
}

export default CharmSlider