
import CircularProgress from '@mui/material/CircularProgress';
import {AnimatePresence, motion} from "framer-motion";
import styles from './styles.module.scss'


const SpinnerBlock = () => {
    return (

        <AnimatePresence>
            <motion.div
                className={styles.root}
                key={1}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{
                    type: 'Tween',
                    opacity: {duration: 1.2},
                }}
            >
                <CircularProgress
                />
            </motion.div>
        </AnimatePresence>


    );
};

export default SpinnerBlock;