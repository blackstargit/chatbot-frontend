export default function Sponsor({ settings }) {
  if (!!settings.noSponsor) return null;

  return (
    <div className="allm-flex allm-w-full allm-items-center allm-justify-center allm-h-[17px]">
      <svg className="allm-w-5 allm-h-[17px] allm-text-[#404040]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
      </svg>
      <a
        href={settings.sponsorLink ?? "#"}
        target="_blank"
        rel="noreferrer"
        className="allm-text-[13px] allm-font-sans allm-no-underline allm-text-[#404040] hover:allm-opacity-100 hover:allm-underline"
      >
        {settings.sponsorText}
      </a>
    </div>
  );
}
