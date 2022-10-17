
import {Button} from "@mui/material";
import Link from "next/link";
import LinkMU from '@mui/material/Link'

import styles from './styles.module.scss'

const SignInButton = () => {
    return (
            <Button
                className={styles.root}
                variant="outlined">
                <Link href={'/signin'}>
                    <LinkMU
                        underline="none"
                        variant="caption"
                        component="div"
                        color="secondary">
                        Увійти
                    </LinkMU
                    ></Link>
            </Button>
    );
};

export default SignInButton;