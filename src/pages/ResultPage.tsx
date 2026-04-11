import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../const";
import Result from "../Result/Result";
import Loading from "../Loading/Loading";


export default function ResultPage() {
  const [active, setActive] = useState(false);
  const location = useLocation();
  const maxQuizLen = location.state?.maxQuizLen || 0;
  const correctNumLen = location.state?.correctNumLen || 0;
  const answerLogs = location.state?.answerLogs || [];

  useEffect(() => {
    setTimeout(() => { setActive(true) }, 2000);
  }, []);

  return (
    <>
      <Loading active={active} />
      <h1>Result</h1>
      <Result maxQuizLen={maxQuizLen} correctNumLen={correctNumLen} answerLogs={answerLogs}/>
      <Link to={ROUTES.HOME}>もう一度挑戦する</Link>
    </>

  )
}
