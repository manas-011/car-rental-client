const initialData = {
    cars : [],

};

// initialData is a state and state contain different state variable here is car 
// state is an object 

export const carsReducer = (state=initialData , action)=>{

     switch(action.type)
     {
         case 'GET_ALL_CARS' : {
             return{
                 ...state,
                 cars : action.payload
             }
         }
         
         default:return state
     }

}
