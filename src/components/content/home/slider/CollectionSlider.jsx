import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material"
import { getCollections } from "../fetchAPI";
import styles from "./collection.module.scss"
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import { selectCollections, selectLoading } from "../../../../features/collections/CollectionSlice";
// import Slider from "react-slick"
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const CollectionSlider = () => {
    const dispatch = useDispatch()
    const [activeLink, setActiveLink] = useState(null);
    const collections = useSelector(selectCollections);
    const loading = useSelector(selectLoading);

    useEffect(() => {
        dispatch(getCollections())
    }, [dispatch])

    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    // };
    return (
        <Box className={styles.container}>
            {/* <Slider {...settings} > */}
            {loading ?
                <CircularProgress /> :
                collections?.map(({ id, prize, title, img, additional }) => (
                    <Box
                        key={id}
                        className={`${activeLink === id && styles.active}`}
                        onClick={() => setActiveLink(id)}
                    >
                        <Box className={styles.card}>
                            <FavoriteBorderSharpIcon className={styles.sharpIcon} />
                            <img className={styles.img} src={img} alt={title} />
                            <Box className={styles.description}>
                                <span className={styles.cardName}>
                                    {title}
                                </span>
                                <span className={styles.cardPrize}>
                                    {prize}
                                </span>
                            </Box>
                            <Box className={styles.additional}>
                                {additional}
                            </Box>
                        </Box>
                    </Box>
                ))
            }
            {/* </Slider> */}
        </Box>
    )
}

export default CollectionSlider