import React, {FC, useState} from 'react';
import {Button, TextField, Typography} from "@mui/material";
import SkeletonText from "../../../../../components/skeletons/SkeletonText";
import {useAppSelector} from "../../../../../hooks/redux";
import {useUsers} from "../../../../../hooks/useUser/UseUser";
import {useFormik} from "formik";
import {validationSchemaUpdateStatus} from "../../../../../constans/validate/profile";
import styles from "./styles.module.scss";
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';


interface IStatusSidebarProps {
    status: string,
    myProfile:boolean
}

const StatusSidebar: FC<IStatusSidebarProps> = ({status,myProfile}) => {

    const [redStatus, setRedStatus] = useState<boolean>(false);


    const {id} = useAppSelector(state => state.user);


    const {updateUserProfile, loadingUpdateUserProfile, getUserProfile} = useUsers();

    const onToggleRedStatus = () =>{
        setRedStatus(!redStatus)
    };


    const formik = useFormik({
        initialValues: {
            status: status
        },
        validationSchema: validationSchemaUpdateStatus,
        onSubmit: async (values) => {
            const {status} = values;
            await updateUserProfile({
                id: id,
                body: {
                    status: status
                },
                snack: true
            });

            await getUserProfile(id);
            setRedStatus(false)

        },
    });


    return (
        <div className={styles.root}>

            {!redStatus ?  <Typography
                color="text.primary"
                variant="body1">
                {status ? status : <SkeletonText/>}
            </Typography> : <form
                onSubmit={formik.handleSubmit}
                className={styles.redStatus}>

                <TextField
                    className={styles.input}
                    fullWidth
                    id="status"
                    name="status"
                    label="статус"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    error={formik.touched.status && Boolean(formik.errors.status)}
                    helperText={formik.touched.status && formik.errors.status}
                />
                <IconButton
                    type="submit"
                    disabled={loadingUpdateUserProfile}

                    aria-label="save">
                    <SaveIcon />
                </IconButton>

            </form>}


            {!redStatus && myProfile &&  <IconButton
                onClick={onToggleRedStatus}
                disabled={loadingUpdateUserProfile}
                aria-label="save">
                <EditIcon />
            </IconButton>}

        </div>


    );
};

export default StatusSidebar;