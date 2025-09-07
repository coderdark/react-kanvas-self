import {Circle, Layer} from "react-konva";

interface BackgroundProps {
    color: string;
    width: number;
    height: number;
    spacing?: number;
    radius?: number;
}

export default function Background({
                                       color,
                                       width,
                                       height,
                                       spacing=35,
                                       radius=3,
                                   }: BackgroundProps) {
    const cols = Math.ceil(width / spacing);
    const rows = Math.ceil(height / spacing);

    return (
        <Layer width={width} height={height}>
            {Array.from({length: cols}).map((_, i) =>
                Array.from({length: rows}).map((_, j) => (
                    <Circle
                        key={`${i}-${j}`}
                        x={i * spacing}
                        y={j * spacing}
                        radius={radius}
                        fill={color}
                    />
                ))
            )}
        </Layer>
    );
}
