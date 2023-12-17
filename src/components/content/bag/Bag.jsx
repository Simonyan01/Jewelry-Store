import { decrement, deleteInBagList, getBagList, increment, selectBagState } from "../../../features/bag/BagSlice";
import { useDispatch, useSelector } from "react-redux";
import ClearIcon from '@mui/icons-material/Clear';
import styles from "./bag.module.scss"
import { Box, Button } from "@mui/material"
import { useEffect } from "react";
import { icons } from "./data"

const Bag = () => {
    const dispatch = useDispatch()

    const { bag, value } = useSelector(selectBagState)

    useEffect(() => {
        dispatch(getBagList())
    }, [dispatch])

    const allPrices = [];

    bag.forEach(item => {
        allPrices.push(item.price);
    });

    // const orderPrice = allPrices.reduce((total, price) => total + parseInt(price), 0) * value;

    return (
        <Box className={styles.mainContainer}>
            <Box className={styles.subContainer}>
                <ClearIcon className={styles.clearIcon} />
                {bag?.map(({ id, title, img, price }) => (
                    <Box key={id}>
                        <Box className={styles.bagItem}>
                            <img
                                onClick={() => {
                                    dispatch(deleteInBagList(id)) &&
                                        setTimeout(() => dispatch(getBagList()), 200)
                                }}
                                className={styles.trashIcon}
                                src="src/images/bag/trash.png"
                                alt="trash image"
                            />
                            <img className={styles.bagImg} src={img} alt={title} />
                            <span className={styles.bagItemTitle}>{title}</span>
                            {icons.map(({ img, title }, i) => (
                                <img key={i} src={img} alt={title} />
                            ))}
                            <Box className={styles.counter}>
                                <Button className={styles.calculate}
                                    onClick={() => dispatch(decrement())} disabled={value === 1}>
                                    -
                                </Button>
                                <Box className={styles.initialNumber}>{value}</Box>
                                <Button className={styles.calculate}
                                    onClick={() => dispatch(increment())}>
                                    +
                                </Button>
                            </Box>
                            <Box className={styles.bagItemPrice}>{parseInt(price).toFixed(2)}$</Box>
                            <Box className={styles.bagTotalPrice}>{price * value}.00$</Box>
                        </Box>
                        <Box className={styles.line}></Box>
                    </Box>
                ))}
            </Box>
            <Box className="bg-[#3E4148] relative bottom-20 border-t-[1.7px] px-8 border-gray-500 rounded-b-xl w-[900px] h-[120px]">
                <Box className="underline absolute mt-12 tracking-widest cursor-pointer active:text-red-600 text-primaryColor transition-all duration-100">
                    Add Product
                </Box>
                <button className="uppercase bg-primaryColor float-right rounded-3xl py-1 px-11 relative top-12">
                    order
                </button>
                <Box className="float-right mt-[3.3rem] mr-20 font-light tracking-wider">Order Price:
                    {/* <span className="font-medium text-lg">{allPrices[0] * value}.00$</span> */}
                </Box>
            </Box>
        </Box>
    )
}

export default Bag