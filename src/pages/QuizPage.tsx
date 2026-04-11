import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Display from "../components/Display/Display";
import quizData from "../data/quiz";
import Button from "../Button/Button";
import { ROUTES } from "../const";

export default function QuizPage() {

  const [quizIndex, setQuizIndex] = useState(0);
  const [answerLogs, setAnswerLogs] = useState<{ isCorrect: boolean ; correctAnswer: string }[]>([]);
  const navigation = useNavigate();
  const MAX_QUIZ_LEN = quizData.length;


  const handleClick = (clickedIndex: number) => {
    if (clickedIndex === quizData[quizIndex].answerIndex){
      setAnswerLogs(prev => [...prev, { isCorrect: true, correctAnswer: quizData[quizIndex].options[quizData[quizIndex].answerIndex] }]);
    }else {
      setAnswerLogs(prev => [...prev, { isCorrect: false, correctAnswer: quizData[quizIndex].options[quizData[quizIndex].answerIndex] }]);
    }
    setQuizIndex(prev => prev + 1);
  };





  useEffect(() => {
    if (answerLogs.length === MAX_QUIZ_LEN) {
      const correctNum = answerLogs.filter(answer => {
        return answer.isCorrect === true;
      })
      navigation(ROUTES.RESULT, {
        state: {
          maxQuizLen: MAX_QUIZ_LEN,
          correctNumLen: correctNum.length,
          answerLogs: answerLogs
        }
      });
    }
  }, [answerLogs,MAX_QUIZ_LEN, navigation])


  return (
    <div>
      {quizData[quizIndex] && 
      <Display>
        {`Q${quizIndex+1}.${quizData[quizIndex].question}`}
      </Display>}
      <br />
      {quizData[quizIndex] &&
        quizData[quizIndex].options.map((option, index) => {
          return (
            <Button key={index} onClick={() => {handleClick(index)}}>
              {option}
            </Button>)
        })
      }
    </div>
  )
}
