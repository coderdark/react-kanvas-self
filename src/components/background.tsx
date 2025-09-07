import {Layer, Shape} from "react-konva";

interface BackgroundProps {
    color?: string;
    spacing?: number;
    radius?: number;
}

export default function Background({
                                       color = '#cbcbcb',
                                       spacing = 35,
                                       radius = 3,
                                   }: BackgroundProps) {
    return (
        <Layer listening={false}>
            <Shape
                sceneFunc={(ctx, shape) => {
                    const stage = shape.getStage();
                    if (!stage) return;

                    const width = stage.width();
                    const height = stage.height();
                    const offsetX = -stage.x();
                    const offsetY = -stage.y();

                    const startX = Math.floor(offsetX / spacing) * spacing - spacing;
                    const startY = Math.floor(offsetY / spacing) * spacing - spacing;
                    const endX = offsetX + width + spacing;
                    const endY = offsetY + height + spacing;

                    for (let x = startX; x <= endX; x += spacing) {
                        for (let y = startY; y <= endY; y += spacing) {
                            ctx.beginPath();
                            ctx.arc(x, y, radius, 0, Math.PI * 2);
                            ctx.fillStyle = color;
                            ctx.fill();
                        }
                    }
                }}
            />
        </Layer>
    );
}
