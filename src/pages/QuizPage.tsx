import { useEffect,useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Display from "../components/Display/Display";
// import quizData from "../data/quiz";
import Button from "../Button/Button";
import { ROUTES } from "../const";

type TriviaQuestion = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export default function QuizPage() {

  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quizIndex, setQuizIndex] = useState(0);
  const [answerLogs, setAnswerLogs] = useState<{ isCorrect: boolean; correctAnswer: string }[]>([]);
  const navigation = useNavigate();
  const MAX_QUIZ_LEN = questions.length;
  const hasFetched = useRef(false);


  const handleClick = (clickedIndex: number) => {
    const currentQuestion = questions[quizIndex];
    const options = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers].sort();
    const selectedAnswer = options[clickedIndex] === currentQuestion.correct_answer;

    setAnswerLogs(prev => [...prev, {
      isCorrect: selectedAnswer,
      correctAnswer: currentQuestion.correct_answer
    }]);
    setQuizIndex(prev => prev + 1);
  };


  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const fetchQuizData = async () => {
      try {
        const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");

        console.log("status:", res.status);
        console.log("ok:", res.ok);

        if (!res.ok) {
          throw new Error("APIの取得に失敗しました");
        }

        const data = await res.json();
        console.log("取得データ：", data);

        setQuestions(data.results);
      } catch (err) {
        console.error(err);
        setError("クイズの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);






  useEffect(() => {
    if (answerLogs.length > 0 && answerLogs.length === MAX_QUIZ_LEN && MAX_QUIZ_LEN > 0) {
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
  }, [answerLogs, MAX_QUIZ_LEN, navigation])


  return (
    <div>
      {loading && <div>読み込み中...</div>}
      {error && <div>エラー: {error}</div>}
      {questions.length > 0 && questions[quizIndex] && (
        <>
          <Display>
            {`Q${quizIndex + 1}. ${questions[quizIndex].question}`}
          </Display>
          <br />
          {[questions[quizIndex].correct_answer, ...questions[quizIndex].incorrect_answers]
            .sort()
            .map((option, index) => {
              return (
                <Button key={index} onClick={() => { handleClick(index) }}>
                  {option}
                </Button>
              );
            })}
        </>
      )}
    </div>
  )
}
