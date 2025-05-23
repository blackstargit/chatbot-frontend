const RecentMessageCard = ({ message, sender, timeAgo, onClick }) => {
  return (
    <div
      className="allm-bg-white allm-rounded-xl allm-shadow-md allm-p-4 allm-flex allm-items-center allm-justify-between allm-cursor-pointer hover:allm-bg-gray-50 active:allm-bg-gray-100 allm-transition-colors allm-duration-200 allm-min-w-[280px] allm-max-w-xs" // Added min-w for horizontal scroll
      onClick={onClick}
    >
      <div className="allm-flex allm-items-center">
        {/* Placeholder for Sender Avatar */}
        <div className="allm-w-8 allm-h-8 allm-bg-gray-200 allm-rounded-full allm-flex allm-items-center allm-justify-center allm-mr-3">
          <svg className="allm-w-5 allm-h-5 allm-text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM7 9a1 1 0 100 2h6a1 1 0 100-2H7zm6 3a1 1 0 11-2 0 1 1 0 012 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <div>
          <p className="allm-text-gray-800 allm-font-semibold allm-text-sm">{message}</p>
          <p className="allm-text-gray-500 allm-text-xs">
            {sender} - {timeAgo}
          </p>
        </div>
      </div>
      <svg className="allm-w-4 allm-h-4 allm-text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </div>
  );
};

export default RecentMessageCard;