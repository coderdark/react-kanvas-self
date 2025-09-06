import {Group, Layer, Rect, Stage, Text} from "react-konva";
import {useEffect, useState} from "react";

interface Slide {
    id: string;
    name: string;
    width: number;
    height: number;
    x: number;
    y: number;
    fill: string;
    visuals: any[];
}

export default function App() {
    const [slides, setSlides] = useState<Slide[]>([]);
    const [selectedSlide, setSelectedSlide] = useState<Slide | null>(null);
    const [stageSize, setStageSize] = useState<number[]>([window.innerWidth, window.innerHeight]);

    useEffect(() => {
        function handleWindowResize(e) {
            setStageSize([e.target.innerWidth, e.target.innerHeight]);
        }

        window.addEventListener('resize', handleWindowResize);

        return () => window.removeEventListener('resize', handleWindowResize)
    }, []);

    useEffect(() => {
        if (slides.length > 0)
            console.log("Slides", slides);
    }, [slides])

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

    function handleAddNewShape() {

    }

    return <main className={'w-screen h-screen'}>
        <section className={'flex flex-col p-4 gap-4'}>
            <h1 className={'text-3xl font-extrabold'}>Konvas</h1>
            <div className={'flex gap-4'}>
                <div><span className={'font-extrabold'}>Stage Width</span>: {window.innerWidth}</div>
                <div><span className={'font-extrabold'}>Stage Height</span>: {window.innerHeight}</div>
            </div>
            <div>
                <span className={'font-extrabold'}>Slide Count</span>: {slides.length}
            </div>
            <div>
                <span className={'font-extrabold'}>Selected Slide</span>: {selectedSlide?.id || 'None'}
            </div>
            <div>
                <button className={'bg-red-500 p-2 rounded text-white'} onClick={handleAddNewSlide}>
                    Add New Slide
                </button>
            </div>
            <div className={'flex gap-4'}>
                <button className={'bg-blue-500 p-2 rounded text-white'} onClick={handleAddNewShape}>
                    Add New Rect
                </button>
                <button className={'bg-green-500 p-2 rounded text-white'} onClick={handleAddNewShape}>
                    Add New Circle
                </button>
                <button className={'bg-pink-500 p-2 rounded text-white'} onClick={handleAddNewShape}>
                    Add New Text
                </button>
            </div>
            <div>
                <Stage width={stageSize[0]} height={stageSize[1]} draggable>
                    <Layer>
                        <Group>
                            {
                                slides.map(slide =>
                                    <Rect key={slide.id} {...slide}
                                          shadowBlur={5} shadowColor={'#ccc'}/>)
                            }

                            {
                                slides.map(slide => <Text key={slide.id}
                                                          x={slide.x}
                                                          y={slide.y - 20}
                                                          fontSize={14}
                                                          text={slide.name}
                                                          fill={'#aaa'}
                                />)
                            }
                        </Group>
                    </Layer>
                </Stage>
            </div>
        </section>
    </main>
}
