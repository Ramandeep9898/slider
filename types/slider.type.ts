export type SliderPropsType = {
    max: number,
    steps: number,
    //TODO: not option function...
    onValueChange?: () => void,
    progress?: number,
    frozenProgress?: number,
    min?: number,
    disable?: boolean,
    width?: number,
};
