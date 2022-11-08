export interface IRadioButton {
    value: string,
    name: string,
    checkedValue: string,
    onChangeInput: () => void,

}


export interface ISelectButton {
    value: string | boolean | {
        of: number,
        to: number
    },
    title: string,
}
