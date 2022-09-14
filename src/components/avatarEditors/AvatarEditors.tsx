import { Button, Box, Slider } from "@mui/material";
import {useState, useRef, FC, useEffect} from "react";
import AvatarEditor from "react-avatar-editor";
import React from "react";

interface IAvatarEditorsProps {
    onSaveAvatar: (img:string) => void,
    file: any
}

interface IpictureInitial {
    cropperOpen: boolean,
    img: null | string,
    zoom: number,
    croppedImg: string,
    rotate: number
}

const AvatarEditors:FC<IAvatarEditorsProps> = ({onSaveAvatar,file}) => {
    var editor = "";
    const [picture, setPicture] = useState<IpictureInitial>({
        cropperOpen: false,
        img: null,
        zoom: 2,
        croppedImg: '',
        rotate: 0
    });

    const[rotate,setRotate] = useState();

    const handleSlider = (event:any, value:any) => {
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

    const setEditorRef = (ed:any) => {
        editor = ed;
    };

    const handleSave = (e:any) => {
        if (setEditorRef) {
            const canvasScaled = editor.getImageScaledToCanvas();
            const croppedImg = canvasScaled.toDataURL();
            setPicture({
                ...picture,
                img: null,
                cropperOpen: false,
                croppedImg: croppedImg
            });

            onSaveAvatar(picture.croppedImg);
        }

    };

    const onChangeRotate = (event:any, value:any) => {
        setPicture({
            ...picture,
            rotate: value
        });
    }

    const handleFileChange = (e:any) => {
        let url = URL.createObjectURL(e.target.files[0]);
        setPicture({
            ...picture,
            img: url,
            cropperOpen: true
        });
    };

    useEffect(()=>{
     if(file){
         let url = URL.createObjectURL(file);
         setPicture({
             ...picture,
             img: url,
             cropperOpen: true
         });
     }
    },[file])


    useEffect(()=>{
        onSaveAvatar(picture.croppedImg);
    },[picture]);

    return (
        <div>
            <div >


                {picture.cropperOpen && picture.img && (
                    <Box display="block">
                        <AvatarEditor
                            ref={setEditorRef}
                            image={picture.img}
                            width={200}
                            height={200}
                            border={50}
                            rotate={picture.rotate}
                            scale={picture.zoom}
                        />
                        <Slider
                            value={picture.zoom}
                            min={1}
                            max={10}
                            step={0.1}
                            onChange={handleSlider}
                        />
                        <Slider
                            value={picture.rotate}
                            min={1}
                            max={360}
                            step={1}
                            onChange={onChangeRotate}
                        />
                        <Box>
                            <Button  onClick={handleCancel}>
                                Очистити
                            </Button>
                            <Button variant="contained" onClick={handleSave}>Зберегти</Button>
                        </Box>
                    </Box>
                )}
            </div>
        </div>
    );
};

export default AvatarEditors;
