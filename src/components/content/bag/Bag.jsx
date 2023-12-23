import { decrement, deleteInBagList, getBagList, increment, selectBagState } from "../../../features/bag/BagSlice";
import { useDispatch, useSelector } from "react-redux";
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button } from "@mui/material";
import styles from "./bag.module.scss";
import { useEffect } from "react";
import { icons } from "./data";

const Bag = () => {
    const dispatch = useDispatch();
    const { bag, value } = useSelector(selectBagState);

    useEffect(() => {
        dispatch(getBagList());
    }, [dispatch]);

    // const orderPrice = allPrices.reduce((total, price) => total + parseInt(price), 0) * value;

    return (
        <>
            <Box className={styles.mainContainer}>
                <Box className={styles.subContainer}>
                    {!bag || bag.length === 0 ? (
                        <p className={styles.errorText}>Your bag is empty . . .</p>
                    ) : (
                        <>
                            <ClearIcon className={styles.clearIcon} />
                            {bag.map(({ id, title, img, price }) => (
                                <Box key={id}>
                                    <Box className={styles.bagItem}>
                                        <img
                                            onClick={() => {
                                                dispatch(deleteInBagList(id));
                                                setTimeout(() => dispatch(getBagList()), 100);
                                            }}
                                            className={styles.trashIcon}
                                            src="src/images/bag/trash.png"
                                            alt="trash image"
                                        />
                                        <img className={styles.bagImg} src={img} alt={title} />
                                        <span className={styles.bagItemTitle}>{title}</span>
                                        {icons.map(({ img: iconImg, title: iconTitle }, i) => (
                                            <img key={i} src={iconImg} alt={iconTitle} />
                                        ))}
                                        <Box className={styles.counter}>
                                            <Button
                                                className={styles.calculate}
                                                onClick={() => dispatch(decrement())}
                                            >
                                                -
                                            </Button>
                                            <Box className={styles.initialNumber}>{value}</Box>
                                            <Button
                                                className={styles.calculate}
                                                onClick={() => dispatch(increment())}
                                            >
                                                +
                                            </Button>
                                        </Box>
                                        <Box className={styles.bagItemPrice}>{parseFloat(price).toFixed(2)}$</Box>
                                        <Box className={styles.bagTotalPrice}>{price * value}.00$</Box>
                                    </Box>
                                    <Box className={styles.line}></Box>
                                </Box>
                            ))}
                        </>
                    )}
                </Box>
                <Box className={styles.orderContainer}>
                    <Box className={styles.addProductText}>Add Product</Box>
                    <button className={styles.orderButton}>order</button>
                    <Box className={styles.orderPrice}>
                        Order Price:
                        {/* <span className="font-medium text-lg">.00$</span> */}
                    </Box>
                </Box>
            </Box>
            <Box className={styles.allPrices}>
                <button className={styles.allPricesButton}>order</button>
            </Box>
        </>
    );
};

export default Bag;
