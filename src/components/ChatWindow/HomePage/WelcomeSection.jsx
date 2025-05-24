const WelcomeSection = ({ settings }) => {
  return (
    <div className="allm-px-4 allm-pt-8 allm-pb-6 allm-bg-gradient-to-br allm-from-gray-900 allm-to-gray-800 allm-rounded-b-2xl allm-shadow-lg">
      <div className="allm-flex allm-items-center allm-mb-4">
        {/* Placeholder for Bot Icon/Logo from settings.brandImageUrl */}
        <div className="allm-w-10 allm-h-10 allm-bg-gray-700 allm-rounded-full allm-flex allm-items-center allm-justify-center allm-mr-3">
          <svg className="allm-w-6 allm-h-6 allm-text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM7 9a1 1 0 100 2h6a1 1 0 100-2H7zm6 3a1 1 0 11-2 0 1 1 0 012 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <h1 className="allm-text-white allm-text-2xl allm-font-bold">{settings.welcomeGreeting}</h1>
        <span className="allm-text-2xl allm-ml-2">👋</span> {/* Hand emoji */}
      </div>
      <p className="allm-text-gray-300 allm-text-xl allm-font-semibold">{settings.welcomeHelpPrompt}</p>
    </div>
  );
};

export default WelcomeSection;