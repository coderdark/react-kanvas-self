import {Circle, Group, Layer, Rect, Stage, Text, Star} from "react-konva";
import {useEffect, useState} from "react";
import Header from "./components/header.tsx";
import type {ISlide} from "./types.ts";
import type {KonvaNodeComponent} from "react-konva/es/ReactKonvaCore";
import Slide from "./components/slide.tsx";
import Background from "./components/background.tsx";
import Toolbar from "./components/toolbar.tsx";

const shapeMap: Record<string, KonvaNodeComponent<any>> = {
    circle: Circle,
    rect: Rect,
    text: Text,
    star: Star
};

export default function App() {
    const [slides, setSlides] = useState<ISlide[]>([]);
    const [selectedSlideId, setSelectedSlideId] = useState<string | null>(null);
    const [stageSize, setStageSize] = useState<{
        width: number,
        height: number
    }>({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        function handleWindowResize(e: any) {
            setStageSize({
                width: e.target.innerWidth,
                height: e.target.innerHeight
            });
        }

        window.addEventListener('resize', handleWindowResize);

        return () => window.removeEventListener('resize', handleWindowResize)
    }, []);

    useEffect(() => {
        if (slides.length > 0)
            console.log("Slides", slides);
    }, [slides])

    function getShapeConfig(type: string, slide: ISlide) {
        let config = null;

        switch (type) {
            case 'rect':
                config = {
                    id: Date.now().toString(),
                    type: 'rect',
                    x: slide.x + 10,
                    y: slide.y + 10,
                    width: 100,
                    height: 100,
                    fill: '#2b7fff'
                }
                break;
            case 'circle':
                config = {
                    id: Date.now().toString(),
                    type: 'circle',
                    x: slide.x + 60,
                    y: slide.y + 60,
                    radius: 50,
                    fill: '#00c950'
                }
                break;
            case 'text':
                config = {
                    id: Date.now().toString(),
                    type: 'text',
                    x: slide.x + 10,
                    y: slide.y + 10,
                    width: 100,
                    height: 10,
                    text: 'Hello',
                    fontSize: 14,
                    fill: '#715bff'
                }
                break;
            case 'star':
                config = {
                    id: Date.now().toString(),
                    type: 'star',
                    x: slide.x + 60,
                    y: slide.y + 64,
                    numPoints: 5, // number of star points
                    innerRadius: 20, // inner radius of the star
                    outerRadius: 53, // outer radius of the star
                    fill: '#fb2c36'
                }
                break;
        }

        return config;
    }

    function handleOnSlideClick(slideId: string) {
        setSelectedSlideId(slideId)
    }

    function handleAddNewSlide() {
        let y = window.innerHeight / 2 - 300;
        const lastSlide = slides[slides.length - 1];

        if (lastSlide) {
            console.log("Last", lastSlide);
            y = lastSlide.y - lastSlide.height - 100;
        }

        setSlides((slides) => {
            return [...slides, {
                id: Date.now().toString(),
                name: `Slide # ${slides.length + 1}`,
                width: 800,
                height: 600,
                x: window.innerWidth / 2 - 400,
                y,
                fill: 'white',
                visuals: []
            }]
        })
    }

    function handleAddNewShape(type: string, slideId: string) {
        if (!slideId)
            return;

        setSlides((slides) => {
            return slides.map((slide) => {
                if (slide.id === slideId) {
                    const newVisual = getShapeConfig(type, slide);

                    return {
                        ...slide,
                        visuals: [
                            ...slide.visuals,
                            newVisual
                        ]
                    }
                } else {
                    return slide;
                }
            })
        })
    }

    return <main className={'w-screen min-h-screen'}>
        <section className={'flex flex-col w-full h-full'}>
            <Header className={'p-4 bg-transparent'}
                    title={"Konvas Experiment"}
                    stage={stageSize}
                    slides={slides}
                    selectedSlideId={selectedSlideId}/>
            <div className={'flex flex-col w-full h-full'}>
                <Stage width={stageSize.width} height={stageSize.height} draggable>
                    <Background/>
                    <Layer>
                        {
                            slides.map(slide =>
                                <Group key={slide.id}
                                       width={slide.width}
                                       height={slide.height}>
                                    <Slide {...slide}
                                           onClick={(slideId) => handleOnSlideClick(slideId)}
                                           selected={slide.id === selectedSlideId}/>
                                    <Text
                                        x={slide.x}
                                        y={slide.y - 20}
                                        fontSize={14}
                                        text={slide.name}
                                        fill={'#aaa'}/>
                                    {
                                        slide.visuals.map(visual => {
                                            const Shape = shapeMap[visual.type];

                                            return <Shape key={visual.id} {...visual}
                                                          draggable
                                                          dragBoundFunc={(pos) => {
                                                              console.log("Boundaries", pos)
                                                              return pos;
                                                          }}
                                                          onDragMove={(evt) => {
                                                              const shape = evt.currentTarget;

                                                              if (shape.x() >= slide.x && shape.x() <= (slide.x + slide.width) - visual.width) {
                                                                  console.log("Dragged", "Shape X", shape.x(), "Slide X", slide.x);
                                                              } else {
                                                                  console.log("Not Dragged", "Shape X", shape.x(), "Slide X", slide.x);
                                                              }

                                                              if (shape.y() >= slide.y && shape.y() <= (slide.y + slide.height) - visual.height) {
                                                                  console.log("Dragged", "Shape Y", shape.x(), "Slide Y", slide.x);
                                                              } else {
                                                                  console.log("Not Dragged", "Shape Y", shape.x(), "Slide Y", slide.x);
                                                              }
                                                          }}/>
                                        })
                                    }
                                </Group>)
                        }
                    </Layer>
                </Stage>
            </div>
            <footer className={'fixed bottom-0 p-4 bg-neutral-700 w-full'}>
                <Toolbar enableShapeButtons={!!selectedSlideId}
                         onAddNewSlide={handleAddNewSlide}
                         onAddNewShape={(type) => handleAddNewShape(type, selectedSlideId ?? '')}/>
            </footer>
        </section>
    </main>
}
