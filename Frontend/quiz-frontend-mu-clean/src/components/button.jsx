/**
 * Simple button component
 * @param {text} param0
 * @param {onAnswerClick} param1
 * @returns
 */
const Button = ({ text, onAnswerClick, disabled = false, className }) => {
  return (
    <button
      onClick={onAnswerClick}
      disabled={disabled}
      className={`button ${className || ""}`}
    >
      {text}
    </button>
  );
};

export default Button;
