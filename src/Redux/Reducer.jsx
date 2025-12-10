import Action from "./Action"

const initialState = {
    loading:false,
    questions:[],
    error:null,

}
const Reducers=(state=initialState,Action)=>{
    switch(Action.type){
        case'request':
        return{...state,loading:true}
case "success":
   return {
      loading: false,
      questions: Action.payload,
      error: null
   }

case'fail':
return {loading:false,questions:[],error:Action.payload}
    
    default:
        return state
}
}
export default Reducers;