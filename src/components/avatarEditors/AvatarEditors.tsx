import { Button, Slider, Typography} from "@mui/material";
import React, {FC, useEffect, useState} from "react";
import AvatarEditor from "react-avatar-editor";
import useMedia from "../../hooks/useMedia/useMedia";
import styles from './styles.module.scss'
import {Col,Row} from "react-bootstrap";

interface IAvatarEditorsProps {
    onSaveAvatar: (img: string) => void,
    file: any
}

interface IpictureInitial {
    cropperOpen: boolean,
    img: null | string,
    zoom: number,
    croppedImg: string,
    rotate: number,
    borderRadius: number
}

const AvatarEditors: FC<IAvatarEditorsProps> = ({onSaveAvatar, file}) => {
    var editor = "";
    const [picture, setPicture] = useState<IpictureInitial>({
        cropperOpen: false,
        img: null,
        zoom: 2,
        croppedImg: '',
        rotate: 0,
        borderRadius: 50,
    });

    const[save,setSave] = useState<boolean>(false);


    const {
        isMobile,
        isTablet,
        isDesktop
    } = useMedia();

    const handleSlider = (event: any, value: any) => {
        setPicture({
            ...picture,
            zoom: value
        });
    };

    const handleCancel = () => {
        setPicture({
            ...picture,
            cropperOpen: false
        });
    };

    const setEditorRef = (ed: any) => {
        editor = ed;
    };

    const handleSave = async (e: any) => {
        //@ts-ignore
        const canvasScaled = editor.getImageScaledToCanvas();
        const croppedImg = canvasScaled.toDataURL();
        setPicture({
            ...picture,
            img: null,
            cropperOpen: false,
            croppedImg: croppedImg
        });
        setSave(true)

    };

    const onChangeRotate = (event: any, value: any) => {
        setPicture({
            ...picture,
            rotate: value
        });
    };
    const onChangeBorderRadius = (event: any, value: any) => {
        setPicture({
            ...picture,
            borderRadius: value
        });
    };


    useEffect(() => {
        if (file) {
            let url = URL.createObjectURL(file);
            setPicture({
                ...picture,
                img: url,
                cropperOpen: true
            });
        }
    }, [file]);


    useEffect(() => {
      if(picture && save){
          onSaveAvatar(picture.croppedImg);
          setSave(false);
      }
    }, [save,picture]);


    const widthAndHeight = isMobile ? 180
        : isDesktop ?  500 : isTablet ? 500 : 200;

    return (
        <Row className={styles.root}>

            <Col xl={7}>
                {picture.cropperOpen && picture.img && (
                    <div className={styles.editor}>
                        <AvatarEditor
                            ref={setEditorRef}
                            image={picture.img}
                            width={widthAndHeight}
                            height={widthAndHeight}
                            borderRadius={picture.borderRadius}
                            rotate={picture.rotate}
                            scale={picture.zoom}
                        />


                        <div className={styles.btnWrap}>
                            <Button onClick={handleCancel}>
                                Очистити
                            </Button>
                            <Button variant="contained" onClick={handleSave}>Зберегти</Button>
                        </div>
                    </div>
                )}
            </Col>

            <Col xl={5}>
                {picture.cropperOpen && picture.img && (
                    <div className={styles.params}>
                        <div className={styles.item}>
                            <Typography
                                component={'caption'}>
                                Zoom
                            </Typography>
                            <Slider
                                size="small"
                                value={picture.zoom}
                                min={1}
                                max={10}
                                step={0.1}
                                onChange={handleSlider}
                            />
                        </div>
                        <div className={styles.item}>
                            <Typography
                                component={'caption'}>
                                Поворот
                            </Typography>
                            <Slider
                                size="small"
                                value={picture.rotate}
                                min={1}
                                max={360}
                                step={1}
                                onChange={onChangeRotate}
                            />
                        </div>
                        <div className={styles.item}>
                            <Typography
                                component={'caption'}>
                               округленість
                            </Typography>
                            <Slider
                                size="small"
                                value={picture.borderRadius}
                                min={1}
                                max={360}
                                step={1}
                                onChange={onChangeBorderRadius}
                            />
                        </div>
                    </div>
                )}

            </Col>


        </Row>
    );
};

export default AvatarEditors;
