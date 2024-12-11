export const MainHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-32">
      <div className="absolute inset-0">
        <img
          src="/lovable-uploads/db363979-bee9-4ace-810b-c458111ef8f2.png"
          alt="Gold liquid texture"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="relative max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-6xl md:text-8xl font-serif">
          GOLD IS <span className="italic text-yellow-500">THE</span>
          <br />
          TRUTH CURRENCY
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
          Gold provides stability against inflation and economic uncertainty, unlike fiat & crypto which can be easily devalued through monetary printing, news and network shutdown.
        </p>
      </div>
    </section>
  );
};