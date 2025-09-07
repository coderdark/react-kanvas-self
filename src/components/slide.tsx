import type {ISlide} from "../types.ts";
import {Rect} from "react-konva";

interface SlideProps extends ISlide {
    selected?: boolean;
    draggable?: boolean;
    onClick?: (slideId: string) => void;
    onContextMenu?: (e: any) => void;
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
                                  onClick,
                                  onContextMenu
                              }: SlideProps) {
    function handleOnClick(slideId: string) {
        if (onClick) {
            onClick(slideId)
        }
    }

    function handleOnContextMenu(e: any) {
        if (onContextMenu) {
            onContextMenu(e)
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
        stroke={selected ? '#2d7bfa' : '#ccc'}
        strokeWidth={selected ? 0.8 : 0.5}
        shadowColor={`${selected ? '#2d7bfa' : '#ccc'}`}
        onClick={() => handleOnClick(id)}
        draggable={draggable}
        onContextMenu={handleOnContextMenu}
    />
}
