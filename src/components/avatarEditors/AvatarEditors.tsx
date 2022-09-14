import { Button, Box, Slider } from "@mui/material";
import {useState, useRef, FC, useEffect} from "react";
import AvatarEditor from "react-avatar-editor";
import React from "react";

interface IAvatarEditorsProps {
    onSaveAvatar: (img:string) => void,
    file: any
}


const AvatarEditors:FC<IAvatarEditorsProps> = ({onSaveAvatar,file}) => {
    var editor = "";
    const [picture, setPicture] = useState({
        cropperOpen: false,
        img: null,
        zoom: 2,
        croppedImg: ''
    });

    const[rotate,setRotate] = useState();

    const handleSlider = (event, value) => {
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

    const setEditorRef = (ed) => {
        editor = ed;
    };

    const handleSave = (e) => {
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

    const onChangeRotate = () => {
        setRotate()
    }

    const handleFileChange = (e) => {
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


                {picture.cropperOpen && (
                    <Box display="block">
                        <AvatarEditor
                            ref={setEditorRef}
                            image={picture.img}
                            width={200}
                            height={200}
                            border={50}
                            // color={[0, 0, 0, 1]} // RGBA
                            rotate={0}
                            scale={picture.zoom}
                        />
                        <Slider
                            aria-label="raceSlider"
                            value={picture.zoom}
                            min={1}
                            max={10}
                            step={0.1}
                            onChange={handleSlider}
                        ></Slider>
                        <Slider
                            aria-label="raceSlider"
                            value={picture.zoom}
                            min={1}
                            max={10}
                            step={0.1}
                            onChange={handleSlider}
                        ></Slider>
                        <Box>
                            <Button variant="contained" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave}>Save</Button>
                        </Box>
                    </Box>
                )}
            </div>
        </div>
    );
};

export default AvatarEditors;
