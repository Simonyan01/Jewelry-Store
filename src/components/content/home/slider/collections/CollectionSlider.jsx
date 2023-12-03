import { selectCollections, selectLoading, selectActiveLink, switchToActive, selectError } from "../../../../../features/collections/CollectionSlice";
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Navigation, Pagination } from 'swiper/modules';
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material"
import { Swiper, SwiperSlide } from 'swiper/react';
import { getCollections } from "../../fetchAPI";
import styles from "./collection.module.scss"
import { useEffect, useRef } from "react";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

const CollectionSlider = () => {
    const dispatch = useDispatch()
    const swiperRef = useRef()

    const collections = useSelector(selectCollections);
    const activeLink = useSelector(selectActiveLink);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(getCollections())
    }, [dispatch])

    return <>
        <p className={`${styles.title} pb-8`}>COLLECTION </p>
        <Box className="text-center">
            {loading ? <CircularProgress /> :
                error ? <p className={styles.title}>Data not found.</p> :
                    <Box className={styles.container}>
                        <ArrowBackIosNewIcon
                            className={`${styles.arrowLeft} arrow-left`}
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
                                prevEl: '.arrow-left',
                                nextEl: '.arrow-right',
                            }}
                            modules={[Pagination, Navigation]}
                            className="mySwiper select-none"
                        >
                            {collections?.map(({ id, title, img, price, additional }) => (
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
                            className={`${styles.arrowRight} arrow-right`}
                            onClick={() => swiperRef.current && swiperRef.current.swiper.slideNext()}
                        />
                    </Box>
            }
        </Box>
    </>
}

export default CollectionSlider