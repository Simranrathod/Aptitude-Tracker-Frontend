import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Src/Questionpage.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Action from "../Redux/Action";
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

  const { level } = useParams()
  const dispatch = useDispatch()
  const { loading, questions, error } = useSelector(
    (state) => state.items
  );
  useEffect(() => {
    if (level) dispatch(Action(level))
  }, [dispatch, level])

  return (
    <div className="questions-page">
      <h2>{level.toUpperCase()} Level Questions</h2>

      {loading && <p>Loading questions...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="question-list">
        {questions.map((q, i) => (
          <div key={i} className="question-card">
            <h4>Q{i + 1}. {q.question}</h4>

            {/* MCQ Options */}
            {q.options && (
              <ul>
                {q.options.map((op, index) => (
                  <li key={index}>{op}</li>
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

    </div>
  );
}
