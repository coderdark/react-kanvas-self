import type {ISlide} from "../types.ts";
import {Circle, Group, Rect, Star, Text} from "react-konva";
import {type KonvaEventObject} from "konva/lib/Node";
import type {ComponentType} from "react";
import type {KonvaPointerEvent} from "konva/lib/PointerEvents";

interface SlideProps extends ISlide {
    selected?: boolean;
    draggable?: boolean;
    onClick?: (slideId: string) => void;
    onContextMenu?: (e: KonvaEventObject<PointerEvent>) => void;
}

/* eslint-disable-next-line */
const shapeMap: Record<string, ComponentType<any>> = {
    circle: Circle,
    rect: Rect,
    text: Text,
    star: Star
};

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

    function handleOnContextMenu(e: KonvaEventObject<PointerEvent>) {
        if (onContextMenu) {
            onContextMenu(e)
        }
    }

    return (
        <Group width={width}
               height={height}
               x={0}
               y={0}
               onContextMenu={handleOnContextMenu}>
            <Rect
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
            />
            <Text
                x={x}
                y={y - 20}
                fontSize={16}
                fontStyle={'bold'}
                text={name}
                fill={'#aaa'}/>
            {
                visuals?.map(visual => {
                    const Shape = shapeMap[visual.type];

                    return <Shape key={visual.id} {...visual}
                                  draggable
                                  dragBoundFunc={(pos: KonvaPointerEvent) => {
                                      return pos;
                                  }}
                                  onDragMove={(evt: KonvaEventObject<PointerEvent>) => {
                                      const shape = evt.currentTarget;

                                      if (shape.x() >= x && shape.x() <= (x + width) - (visual.width || 0)) {
                                          console.log("Dragged", "Shape X", shape.x(), "Slide X", x);
                                      } else {
                                          console.log("Not Dragged", "Shape X", shape.x(), "Slide X", x);
                                      }

                                      if (shape.y() >= y && shape.y() <= (y + height) - (visual.height || 0)) {
                                          console.log("Dragged", "Shape Y", shape.x(), "Slide Y", x);
                                      } else {
                                          console.log("Not Dragged", "Shape Y", shape.x(), "Slide Y", x);
                                      }
                                  }}/>
                })
            }
        </Group>)
}
