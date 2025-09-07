interface ToolbarProps {
    enableShapeButtons?: boolean;
    onAddNewSlide?: () => void;
    onAddNewShape?: (type: string) => void;
}


export default function Toolbar({
                                    enableShapeButtons = false,
                                    onAddNewSlide,
                                    onAddNewShape
                                }: ToolbarProps) {
    function handleOnAddNewSlide() {
        if (onAddNewSlide)
            onAddNewSlide()
    }

    function handleOnAddNewShape(type: string) {
        if (onAddNewShape)
            onAddNewShape(type)
    }

    return (<div className={'flex gap-4'}>
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
    )
}
