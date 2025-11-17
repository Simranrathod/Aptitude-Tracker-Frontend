import axios from "axios";
const Action=(level)=>async (dispatch)=>{
    try{
          dispatch({ type: "request" });
          const res = await axios.get(`http://localhost:8089/questions/${level}`);
        // const res=product.data;
        dispatch({type:'success',payload:res.data})
    }
    catch(error)
    {
        dispatch({type:'fail',payload:error.message})
    }
}
export default Action;
