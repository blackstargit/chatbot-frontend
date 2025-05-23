import QuickQuestionItem from "@/components/ChatWindow/HomePage/QuickQuestionItem";

const QuickQuestionsSection = ({ title, questions, onQuestionClick }) => {
  return (
    <div className="allm-space-y-4">
      <h2 className="allm-text-gray-800 allm-font-semibold allm-text-lg">{title}</h2>
      <div className="allm-space-y-3">
        {questions.map((q, index) => (
          <QuickQuestionItem key={index} question={q.question} subtitle={q.subtitle} onClick={() => onQuestionClick(q.question)} />
        ))}
      </div>
    </div>
  );
};

export default QuickQuestionsSection;