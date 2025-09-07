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
            <button className={'bg-orange-900 p-2 w-20 text-xl rounded text-white'} onClick={handleOnAddNewSlide}>
                <span className={'font-extrabold'}>+</span>
            </button>
            <button className={'bg-orange-900 p-2 w-20 rounded text-white disabled:opacity-50'}
                    disabled={!enableShapeButtons}
                    onClick={() => handleOnAddNewShape('star')}>
                <span className={'text-red-500'}>★</span>
            </button>
            <button className={'bg-orange-900 p-2 w-20 rounded text-white disabled:opacity-50'}
                    disabled={!enableShapeButtons}
                    onClick={() => handleOnAddNewShape('circle')}>
                <span className={'text-green-500'}>●</span>
            </button>
            <button className={'bg-orange-900 p-2 w-20 rounded text-white disabled:opacity-50'}
                    disabled={!enableShapeButtons}
                    onClick={() => handleOnAddNewShape('rect')}>
                <span className={'text-blue-500'}>■️</span>
            </button>
            <button className={'bg-orange-900 p-2 w-20 rounded text-white disabled:opacity-50'}
                    disabled={!enableShapeButtons}
                    onClick={() => handleOnAddNewShape('text')}>
                <span className={'font-extrabold text-purple-500'}>T</span>
            </button>
        </div>
    )
}
