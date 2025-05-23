const QuickQuestionItem = ({ question, subtitle, onClick }) => {
  return (
    <div
      className="allm-bg-white allm-rounded-xl allm-shadow-sm allm-p-4 allm-flex allm-items-center allm-justify-between allm-cursor-pointer hover:allm-bg-gray-50 active:allm-bg-gray-100 allm-transition-colors allm-duration-200"
      onClick={onClick}
    >
      <div>
        <p className="allm-text-gray-800 allm-font-semibold allm-text-sm">{question}</p>
        {subtitle && <p className="allm-text-gray-500 allm-text-xs mt-1">{subtitle}</p>}
      </div>
      <svg className="allm-w-4 allm-h-4 allm-text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </div>
  );
};

export default QuickQuestionItem;