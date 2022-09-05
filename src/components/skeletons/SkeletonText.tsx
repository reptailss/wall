import React, {FC} from 'react';
import {Skeleton} from "@mui/material";

interface ISkeletonTextProps {
    height?: number
}
const SkeletonText:FC<ISkeletonTextProps> = ({height}) => {
    return <Skeleton height={height} variant="rounded" />


};

export default SkeletonText;