import  {useState, FC} from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import styles from './styles.module.scss'

interface IDataInputProps {
    onChangeDateValue: (data: number) => void,
    dateProp: string
}

const DateInput :FC<IDataInputProps> = ({onChangeDateValue,dateProp}) => {
        const date =  dateProp && new Date(dateProp).getTime();

        const [startDate, setStartDate] = useState<any>(date);

        const onChangeDate = (date: Date ) => {
            if(date){
                setStartDate(date);
                const dateSeconds = Date.parse(date.toISOString())/1000;
                onChangeDateValue(dateSeconds)
            }

        };
        return (
            <>
                <DatePicker
                    className={styles.root}
                    selected={startDate}
                    onChange={onChangeDate}
                />
            </>
        );

    };

export default DateInput;