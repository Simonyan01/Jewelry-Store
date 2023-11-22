/* eslint-disable no-unused-vars */
import { useEffect } from "react"
import { getCollections } from "./fetchAPI"
import { Box, CircularProgress } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { selectCollections, selectLoading } from "../../../features/collections/CollectionSlice"
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';

const HomePage = () => {
    const dispatch = useDispatch()
    const collections = useSelector(selectCollections);
    const loading = useSelector(selectLoading);

    useEffect(() => {
        dispatch(getCollections())
    }, [dispatch])

    return (
        <Box className="flex p-7 mt-10 mx-7 max-w-full bg-containerBg items-center justify-center rounded-2xl text-slate-200">
            <Box className="gap-5 flex">
                {loading ?
                    <CircularProgress /> :
                    collections?.map(({ id, prize, title, img }) => (
                        <Box key={id} className="relative">
                            <FavoriteBorderSharpIcon className="absolute right-0 m-2 p-[0.5px] cursor-pointer" />
                            <img className="bg-cardBg px-16 py-6" src={img} alt={title} />
                            <div className="text-start w-[6rem] tracking-wide">
                                <span className="break-words text-md font-light">
                                    {title}
                                </span>
                            </div>
                            <span className="text-md font-normal">
                                {prize}
                            </span>
                        </Box>
                    ))
                }
            </Box>
        </Box>
    )
}

export default HomePage
