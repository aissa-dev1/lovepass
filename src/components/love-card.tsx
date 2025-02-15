import clsx from "clsx";

interface LovePassCardProps {
  backgroundColor: string;
  cardTitle: string;
  cardSubtitle: string;
  mainText: string;
  fromText: string;
  emoji: string;
}

export default function LovePassCard({
  backgroundColor,
  cardTitle,
  cardSubtitle,
  mainText,
  fromText,
  emoji,
}: LovePassCardProps) {
  const charLimit = 70;

  return (
    <div
      style={{ backgroundColor }}
      className="relative w-96 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-48 sm:h-56 md:h-64 rounded-2xl shadow-xl text-white p-4 sm:p-6 border border-black/25"
    >
      <div className="absolute top-2 left-4 sm:top-4 sm:left-6">
        <p className="text-md sm:text-lg font-semibold">{cardTitle}</p>
        <p className="text-xs sm:text-sm text-white/80">To {cardSubtitle}</p>
      </div>
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
        <p
          className={clsx(
            "text-xl sm:text-2xl font-bold break-words max-w-xs pr-2 lg:max-w-sm",
            {
              "max-h-20 overflow-y-auto lg:max-h-28":
                mainText.length > charLimit,
            }
          )}
        >
          {emoji} {mainText}
        </p>
        <p className="text-xs sm:text-sm text-white/80">From {fromText}</p>
      </div>
      <div className="absolute top-2 right-4 sm:top-4 sm:right-6 text-2xl sm:text-4xl">
        {emoji}
      </div>
      <div className="absolute bottom-2 right-4 sm:bottom-4 sm:right-6 text-xs sm:text-sm font-mono">
        #LP-XXXXXX
      </div>
    </div>
  );
}
