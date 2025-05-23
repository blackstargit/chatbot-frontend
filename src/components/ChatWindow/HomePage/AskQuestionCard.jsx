const AskQuestionCard = ({ placeholder, onClick }) => {
  return (
    <div
      className="allm-bg-white allm-rounded-xl allm-shadow-md allm-p-4 allm-flex allm-items-center allm-justify-between allm-cursor-pointer hover:allm-bg-gray-50 active:allm-bg-gray-100 allm-transition-colors allm-duration-200"
      onClick={onClick}
    >
      <p className="allm-text-gray-800 allm-font-semibold allm-text-sm">{placeholder}</p>
      <svg className="allm-w-5 allm-h-5 allm-text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-1 1v2a1 1 0 102 0V8a1 1 0 00-1-1zm0 4a1 1 0 100 2 1 1 0 000-2z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};

export default AskQuestionCard;