import styles from './Result.module.css';
import Confetti from 'react-confetti'

export default function Result({ maxQuizLen, correctNumLen, answerLogs }: { maxQuizLen: number; correctNumLen: number; answerLogs: { isCorrect: boolean; correctAnswer: string }[] }) {
    return (
        <>
            <div className={styles.result}>
                <p>
                    あなたの正解数は...
                    <span className={styles.resultHighlight}>{`全${maxQuizLen}問中、${correctNumLen}問`}</span>
                    でした！
                </p>

                <p>
                    {answerLogs && answerLogs.length > 0 ? answerLogs.map((answer, index) => {
                        return (
                            <div key={index}>
                                <ul>
                                    <li>Q{index + 1}: {answer.isCorrect ? '正解' : `不正解 (正解: ${answer.correctAnswer})`}</li>
                                </ul>

                            </div>
                        );
                    }) : <div>データがありません</div>}
                </p>


            </div>
            <Confetti />
        </>

    )
}
