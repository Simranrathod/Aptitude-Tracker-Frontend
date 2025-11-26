import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Src/Questionpage.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Action from "../Redux/Action";
import { useNavigate } from "react-router-dom";
// import Signup from "./Signup";
import Signupmain from "./Signupmain";
import { RxCross2 } from "react-icons/rx";
// <------------------------------this is without using redux---------------->
// export default function QuestionsPage() {
//   const [questions, setQuestions] = useState([]);
//   const {level}=useParams()

//   useEffect(() => {
//     fetchQuestions();
//   }, [level]);

//   const fetchQuestions = async () => {
//     try {
//       const res = await axios.get(`http://localhost:8089/questions/${level}`);
//      console.log("Fetched Questions:", res.data);
//       setQuestions(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="questions-page">
//       <h2>{level.toUpperCase()} Level Questions</h2>

//       {questions.length === 0 ? (
//         <p>Loading questions...</p>
//       ) : (
//         <div className="question-list">
//           {questions.map((q, i) => (
//             <div key={i} className="question-card">
//               <h4>Q{i + 1}. {q.question}</h4>

//               {/* MCQ Options */}
//               {q.options && (
//                 <ul>
//                   {q.options.map((op, index) => (
//                     <li key={index}>{op}</li>
//                   ))}
//                 </ul>
//               )}

//               {/* Code or Writing Type */}
//               {q.type === "code" && (
//                 <pre className="code-block">{q.codeSnippet}</pre>
//               )}
//               {q.type === "writing" && (
//                 <textarea placeholder="Write your answer here..."></textarea>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// <-----------------------------------using redux---------------->
export default function QuestionsPage() {

  // <--------------------------------------for making rough note-------------------------------->
  const [showNotes, setShowNotes] = useState(false);
  const [roughText, setRoughText] = useState("");

  const navigate = useNavigate();
  const { level } = useParams()
  const dispatch = useDispatch()
  const { loading, questions, error } = useSelector(
    (state) => state.items
  );

  // <-----------------------------for blur effect----------------------->
  const [isBlurred, setIsBlurred] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("token");

    if (!user) {
      setIsBlurred(true);
      setShowSignup(true);
    } else {
      setIsBlurred(false);
      setShowSignup(false);
    }
  }, [level]);

  // <------------------------------------fo options selection------------------->
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (level) dispatch(Action(level))
  }, [dispatch, level])


  // <--------------------------------------for  timer--------------------------->
  const [timeleft, settimeleft] = useState(20 * 60)
  const [isstarted, setisstarted] = useState(false)
  useEffect(() => {
    let timer;
    if (isstarted && timeleft > 0) {
      timer = setInterval(() => {
        settimeleft((prev) => prev - 1)
      }, 1000);
    }
    if (timeleft == 0) {
      handlesubmit();
    }

    return () => clearInterval(timer)
  }, [isstarted, timeleft])
  const formattime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;

  }
  // <----------------------------------------------------------------->
  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, index) => {
      // assumes each question object has `correctAnswer` field
      if (answers[index] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  // <----------------------------------------------------------------------->

  const handlesubmit = async () => {

    setisstarted(false)
    const score = calculateScore()
    const total = questions.length;
    const levelName = level;


    try {
      const user = JSON.parse(localStorage.getItem("user"));

      // const token=localStorage.getItem("token");
      console.log({
        // name: user?.name,
        score: score,
        level: levelName,
        total: total,
        userId: user?._id,
      });
      const res = await axios.post(
        " https://aptitude-tracker-backend1-2.onrender.com/score/submit-score",
        {

          userId: user._id,
          name: user?.name,
          score: score,
          level: levelName,
          total: total
        }
      );
      alert(`Your score: ${score}/${questions.length}`);
      navigate("/scorepage", { state: { score, total, level, userId: user?._id, name: user?.name, } });

    }
    catch (err) {
      console.error(err);
      alert("Error submitting score.");
    }
  }



  return (

    <>
      {showSignup && (
        <div className="signup-popup">
          <Signupmain
            closePopup={() => {
              setShowSignup(false);
              setIsBlurred(false);
            }}
          />
        </div>
      )}
      <div className={`notes-panel ${showNotes ? "open" : ""}`}>
        <h3>Rough Notes</h3>
        <button className="close-popup" onClick={() => setShowNotes(false)}>
          <RxCross2 />
        </button>
        <textarea
          value={roughText}
          onChange={(e) => setRoughText(e.target.value)}
          placeholder="Write your rough work here..."
        ></textarea>

        <button className="clear-notes" onClick={() => setRoughText("")}>
          Clear
        </button>
      </div>
      <div className={`questions-page ${isBlurred ? "blur-bg" : ""}`}>

        <div className="header-row">
          <h2>{level.toUpperCase()} Level Questions</h2>
          <div className="right-controls">
            <div className="timer-box">
              <h3> {formattime(timeleft)}</h3>

              {!isstarted && (
                <button className="start-btn" onClick={() => setisstarted(true)}>
                  Start
                </button>


              )}


            </div>
               <button className="notes-toggle-btn" onClick={() => setShowNotes(!showNotes)}>
            Notes
          </button>

          </div>
        </div>

        {loading && <p>Loading questions...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="question-list">
          {questions.map((q, i) => (
            <div key={i} className="question-card">
              <h4>Q{i + 1}. {q.question}</h4>


              {q.options && (
                <ul>
                  {q.options.map((op, index) => (
                    <li key={index} className="option-item">

                      <label>
                        <input type="radio" name={`question-${i}`} value={op} checked={answers[i] === op} disabled={!isstarted} onChange={() => setAnswers({ ...answers, [i]: op })} />
                        {op}
                      </label>
                    </li>
                  ))}
                </ul>
              )}

              {/* Code or Writing Type */}
              {q.type === "code" && (
                <pre className="code-block">{q.codeSnippet}</pre>
              )}
              {q.type === "writing" && (
                <textarea placeholder="Write your answer here..."></textarea>
              )}
            </div>
          ))}
        </div>
        <button className="submit-btn" onClick={handlesubmit} disabled={!isstarted} >
          Submit Test
        </button>
      </div>
    </>
  );
}
