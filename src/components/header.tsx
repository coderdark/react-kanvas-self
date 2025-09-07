import type {ISlide} from "../types.ts";
import {twMerge} from 'tailwind-merge';

interface HeaderProps {
    title: string;
    stage: { width: number, height: number };
    slides: ISlide[];
    selectedSlideId: string | null;
    className?: string;
}

export default function Header({
                                   title,
                                   stage,
                                   slides,
                                   selectedSlideId,
                                   className
                               }: HeaderProps) {

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
    </header>)
}
