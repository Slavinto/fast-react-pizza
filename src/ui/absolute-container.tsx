const AbsoluteContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='absolute inset-0 bg-slate-200/20 backdrop-blur-sm'>
            <div className='relative left-1/2 top-1/2 w-fit -translate-x-1/2 -translate-y-1/2'>
                {children}
            </div>
        </div>
    );
};

export default AbsoluteContainer;
