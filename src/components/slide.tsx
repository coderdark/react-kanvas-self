import type {ISlide} from "../types.ts";
import {Rect} from "react-konva";

interface SlideProps extends ISlide {
    onClick?: (slideId: string) => void;
}

export default function Slide({id, name, width, height, x, y, fill, visuals, onClick}: SlideProps) {
    function handleOnClick(slideId: string) {
        if (onClick)
            onClick(slideId)
    }

    return <Rect
        id={id}
        name={name}
        width={width}
        height={height}
        x={x}
        y={y}
        fill={fill}
        visuals={visuals}
        shadowBlur={5}
        shadowColor={'#ccc'}
        onClick={() => handleOnClick(id)}/>
}
