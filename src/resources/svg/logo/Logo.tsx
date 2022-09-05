import styles from './styles.module.scss'
import {useAppSelector} from "../../../hooks/redux";


const Logo = (props:any) => {

    const {themeMode} = useAppSelector(state => state.theme);

    const fill = themeMode === 'dark' ? 'white' : 'rgba(0,0,0, .6)';

    return (
        <svg
            className={styles.logo}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 298 298"
            style={{
                enableBackground: "new 0 0 298 298",
            }}
            xmlSpace="preserve"
            {...props}
        >
            <path
                fill={fill}
                d="M278.125 33H235v67h42.917C288.945 100 298 90.862 298 79.834V52.5c0-11.028-8.847-19.5-19.875-19.5zM20.75 33C9.722 33 0 41.472 0 52.5v27.334C0 90.862 9.722 100 20.75 100H63V33H20.75zM78 33h142v67H78zM278.125 198H235v67h42.917c11.028 0 20.083-9.138 20.083-20.166V217.5c0-11.028-8.847-19.5-19.875-19.5zM78 198h142v67H78zM20.75 198C9.722 198 0 206.472 0 217.5v27.334C0 255.862 9.722 265 20.75 265H63v-67H20.75zM20.75 116C9.722 116 0 123.972 0 135v27.334C0 173.362 9.722 183 20.75 183H141v-67H20.75zM278.125 116H156v67h121.917c11.028 0 20.083-9.638 20.083-20.666V135c0-11.028-8.847-19-19.875-19z" />
        </svg>
    )
}

export default Logo