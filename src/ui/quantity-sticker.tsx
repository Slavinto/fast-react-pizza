const QuantitySticker = ({
    text,
    handler,
}: {
    text: string | number;
    handler: () => void;
}) => {
    return (
        <div
            onClick={handler}
            className='w-20 h-10 rounded-md text-white text-center -top-[0.2rem] right-[-1.5rem] rotate-[25deg] absolute bg-orange-500/80 text-3xl transition ease-in-out delay-150 hover:scale-105 duration-300 focus:scale-125'
        >
            {text}
        </div>
    );
};

export default QuantitySticker;
