import {FC, memo, useState} from 'react'
import {Dropdown} from 'react-bootstrap'
import style from './select.module.scss'
import {ISelectButton} from "../../types/button";

interface ISelectButtons {
    data: ISelectButton[],
    defaultlValue: any,
    onChangeValue: (value: any) => void,
    defaultTitle: string
}

const SelectButtons: FC<ISelectButtons> = memo(({data, defaultlValue, onChangeValue, defaultTitle}) => {

    const [value, setValue] = useState(defaultlValue);
    const [title, setTitle] = useState(defaultTitle);

    const onChangeSelect = (event: any) => {
        setValue(event.target.getAttribute('value'));
        setTitle(event.target.getAttribute('title'));
        onChangeValue(event.target.getAttribute('value'))
    };

    const selectItems = data.map((item) => {
            return (
                <Dropdown.Item
                    onClick={(event) => {
                        onChangeSelect(event);
                    }}
                    key={item.title}
                    value={item.value}
                    title={item.title}>
                    {item.title}
                </Dropdown.Item>
            )
        }
    );
    return (
        <Dropdown className={style.drop}>
            <Dropdown.Toggle
                variant="dark"
                className={style.drop}
            >
                {title}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {selectItems}
            </Dropdown.Menu>
        </Dropdown>
    )
});


export default SelectButtons;