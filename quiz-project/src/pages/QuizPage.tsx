import Display from "../components/Display/Display";
import quizData from "../data/quiz";
import Button from "../Button/Button";

export default function QuizPage() {
  const quizIndex = 0;
  const handleClick = (clickedIndex: number) => {
    console.log("clickedIndex:", clickedIndex);
  };

  return (
    <div>
      <Display>
        {`Q${quizIndex + 1}.${quizData[quizIndex].question}`}
      </Display>
      {
        quizData[quizIndex].options.map((option, index) => {
          return (
            <Button key={index} onClick={() => handleClick(index)}>
              {option}
            </Button>)
        })
      }
    </div>
  )
}
