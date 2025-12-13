import axios from "axios";
const Action = (level) => async (dispatch) => {
    try {

        const res = await axios.get(`https://aptitude-tracker-backend1-3.onrender.com/questions/${level}`);
        dispatch({ type: "request" });
        dispatch({ type: 'success', payload: res.data })
    }
    catch (error) {
        dispatch({ type: 'fail', payload: error.message })
    }
}
export default Action;
