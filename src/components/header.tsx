import type {ISlide} from "../types.ts";
import {twMerge} from 'tailwind-merge';

interface HeaderProps {
    title: string;
    stage: { width: number, height: number };
    slides: ISlide[];
    selectedSlideId: string | null;
    enableShapeButtons?: boolean;
    onAddNewSlide?: () => void;
    onAddNewShape?: (type: string) => void;
    className?: string;
}

export default function Header({
                                   title,
                                   stage,
                                   slides,
                                   selectedSlideId,
                                   enableShapeButtons = false,
                                   onAddNewSlide,
                                   onAddNewShape,
                                   className
                               }: HeaderProps) {
    function handleOnAddNewSlide() {
        if (onAddNewSlide)
            onAddNewSlide()
    }

    function handleOnAddNewShape(type: string) {
        if (onAddNewShape)
            onAddNewShape(type)
    }

    return (<header className={twMerge(`flex flex-col gap-2 w-full`, className)}>
        {/*//title*/}
        <h1 className={'text-3xl font-extrabold'}>
            {title}
        </h1>

        {/*//stage size (width and height)*/}
        <div className={'flex gap-2'}>
            <div>
                <span className={'font-extrabold'}>Stage Width</span>: {stage.width}
            </div>
            <div>
                <span className={'font-extrabold'}>Stage Height</span>: {stage.height}
            </div>
            {/*//slide info*/}
            <div className={'flex gap-4'}>
                <div>
                    <span className={'font-extrabold'}>Slide Count</span>: {slides.length}
                </div>

                <div>
                    <span className={'font-extrabold'}>Selected Slide</span>: {selectedSlideId ?? 'None'}
                </div>
            </div>
        </div>

        {/*//shapes buttons*/}
        <div className={'flex gap-4'}>
            <button className={'bg-neutral-800 p-2 rounded text-white'} onClick={handleOnAddNewSlide}>
                Add New Slide
            </button>
            <button className={'bg-red-500 p-2 rounded text-white disabled:opacity-50'}
                    disabled={!enableShapeButtons}
                    onClick={() => handleOnAddNewShape('star')}>
                Add New Star
            </button>
            <button className={'bg-green-500 p-2 rounded text-white disabled:opacity-50'}
                    disabled={!enableShapeButtons}
                    onClick={() => handleOnAddNewShape('circle')}>
                Add New Circle
            </button>
            <button className={'bg-blue-500 p-2 rounded text-white disabled:opacity-50'}
                    disabled={!enableShapeButtons}
                    onClick={() => handleOnAddNewShape('rect')}>
                Add New Rect
            </button>
            <button className={'bg-purple-500 p-2 rounded text-white disabled:opacity-50'}
                    disabled={!enableShapeButtons}
                    onClick={() => handleOnAddNewShape('text')}>
                Add New Text
            </button>
        </div>
    </header>)
}
