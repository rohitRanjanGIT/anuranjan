interface HeroProps {
    title: string;
    subtitle?: string;
    highlightedText?: string;
    description: string;
    backgroundImage: string;
    large?: boolean;
    primaryButtonText?: string;
    secondaryButtonText?: string;
}

export default function Hero({
    title,
    subtitle,
    highlightedText,
    description,
    backgroundImage,
    large = false,
    primaryButtonText,
    secondaryButtonText
}: HeroProps) {
    return (
        <section className={`relative ${large ? "h-[90vh]" : "h-[500px]"} flex items-center overflow-hidden bg-slate-900`}>
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/40 to-slate-950/80 z-10`}></div>
                <img
                    alt={title}
                    className="w-full h-full object-cover scale-105 animate-subtle-zoom opacity-80"
                    src={backgroundImage}
                />
            </div>
            <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-white w-full">
                <div className={`${large ? "max-w-3xl" : "max-w-2xl"} space-y-8`}>
                    {subtitle && (
                        <div className="inline-block">
                            <h2 className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-2 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-primary"></span>
                                {subtitle}
                            </h2>
                        </div>
                    )}
                    <h1 className={`${large ? "text-6xl md:text-8xl" : "text-5xl md:text-6xl"} font-extrabold leading-[1.05] tracking-tight`}>
                        {title} {highlightedText && <><br /><span className="text-primary font-light italic">{highlightedText}</span></>}
                    </h1>
                    <div className="h-1 w-20 bg-primary"></div>
                    <p className={`${large ? "text-xl md:text-2xl" : "text-lg md:text-xl"} text-slate-200 font-light leading-relaxed max-w-xl`}>
                        {description}
                    </p>
                    {(primaryButtonText || secondaryButtonText) && (
                        <div className="flex flex-wrap gap-5 pt-4">
                            {primaryButtonText && (
                                <button className="bg-primary hover:bg-white hover:text-secondary text-white px-10 py-5 rounded-full font-bold text-base transition-all duration-500 shadow-xl flex items-center gap-3">
                                    {primaryButtonText}
                                    <span className="material-symbols-outlined text-sm">north_east</span>
                                </button>
                            )}
                            {secondaryButtonText && (
                                <button className="bg-transparent hover:bg-white/10 text-white border border-white/30 px-10 py-5 rounded-full font-bold text-base transition-all duration-500 backdrop-blur-sm">
                                    {secondaryButtonText}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {large && (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer">
                    <span className="material-symbols-outlined text-white/50 text-4xl">expand_more</span>
                </div>
            )}
        </section>
    );
}
