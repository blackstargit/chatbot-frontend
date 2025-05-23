export default function Sponsor({ settings }) {
  if (!!settings.noSponsor) return null;

  return (
    <div className="allm-py-2.5">
      <div className="allm-flex allm-w-full allm-items-center allm-justify-center allm-gap-x-3 allm-h-[17px]">
        <img
          className="allm-w-5 allm-h-[17px] allm-text-[#404040] allm-grayscale"
          src={settings.brandImageUrl ?? ""}
          alt={settings.brandImageUrl ? "Alphabase" : ""}
        />
        <a
          href={settings.sponsorLink ?? "#"}
          target="_blank"
          rel="noreferrer"
          className="allm-text-[13px] allm-font-sans allm-no-underline allm-text-[#404040] hover:allm-opacity-100 hover:allm-underline"
        >
          {settings.sponsorText ?? "Powered by Alphabase"}
        </a>
      </div>
    </div>
  );
}
