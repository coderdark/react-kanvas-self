import type {ISlide} from "../types.ts";
import {Rect} from "react-konva";

interface SlideProps extends ISlide {
    selected?: boolean;
    draggable?: boolean;
    onClick?: (slideId: string) => void;
}

export default function Slide({
                                  id,
                                  name,
                                  width,
                                  height,
                                  x,
                                  y,
                                  fill,
                                  visuals,
                                  selected = false,
                                  draggable = false,
                                  onClick
                              }: SlideProps) {
    function handleOnClick(slideId: string) {
        if (onClick) {
            onClick(slideId)
        }
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
        shadowBlur={selected ? 10 : 5}
        stroke={selected ? '#2d7bfa' : '#cccccc'}
        strokeWidth={selected ? 0.5 : 0}
        shadowColor={`${selected ? '#2d7bfa' : '#cccccc'}`}
        onClick={() => handleOnClick(id)}
        draggable={draggable}
    />
}
