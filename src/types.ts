export interface IShape {
    id: string;
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    radius?: number;
    text?: string;
    fontSize?: number;
    numPoints?: number;
    innerRadius?: number;
    outerRadius?: number;
    fill: string;
}

export interface ISlide {
    id: string;
    name: string;
    width: number;
    height: number;
    x: number;
    y: number;
    fill: string;
    visuals: IShape[];
}
