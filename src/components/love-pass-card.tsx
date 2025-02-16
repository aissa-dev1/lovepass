import clsx from "clsx";

export type LovePassCardType = {
  _id?: string;
  userAuthToken?: string;
  to: string;
  from: string;
  message: string;
  emoji: string;
  backgroundColor: string;
  lovePassId?: string;
};

export function LovePassCard(props: LovePassCardType) {
  const charLimit = 70;

  return (
    <div
      style={{ backgroundColor: props.backgroundColor }}
      className="relative w-96 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-48 sm:h-56 md:h-64 rounded-2xl shadow-xl text-white p-4 sm:p-6 border border-black/25"
    >
      <div className="absolute top-2 left-4 sm:top-4 sm:left-6">
        <p className="text-md sm:text-lg font-semibold">LovePass</p>
        <p className="text-xs sm:text-sm text-white/80">To {props.to}</p>
      </div>
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
        <p
          className={clsx(
            "text-xl sm:text-2xl font-bold break-words max-w-xs pr-2 lg:max-w-sm",
            {
              "max-h-20 overflow-y-auto lg:max-h-28":
                props.message.length > charLimit,
            }
          )}
        >
          {props.emoji} {props.message}
        </p>
        <p className="text-xs sm:text-sm text-white/80">From {props.from}</p>
      </div>
      <div className="absolute top-2 right-4 sm:top-4 sm:right-6 text-2xl sm:text-4xl">
        {props.emoji}
      </div>
      <div className="absolute bottom-2 right-4 sm:bottom-4 sm:right-6 text-xs sm:text-sm font-mono">
        {props.lovePassId}
      </div>
    </div>
  );
}
