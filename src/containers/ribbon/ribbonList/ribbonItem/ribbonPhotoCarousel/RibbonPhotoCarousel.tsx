import React, {FC} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styles from "../styles.module.scss";
import SpinnerBlock from "../../../../../components/spinner/Spinner";


export interface IRibbonPhotoCarouselProps {
    data:string[]
}

const RibbonPhotoCarousel:FC<IRibbonPhotoCarouselProps> = ({data}) => {



    const list = data?.map((item) => {
        return (
            <Carousel.Item
                key={item}
            >
                <img
                    className={styles.img}
                    src={item} alt=""/>


            </Carousel.Item>
        )
    });


    return (

        <Carousel className={styles.slider} interval={null} >
            {data ? list : <SpinnerBlock/>}
        </Carousel>
    );
};

export default RibbonPhotoCarousel;