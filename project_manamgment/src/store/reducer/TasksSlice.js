// const { createSlice } = require("@reduxjs/toolkit")
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    station: ["To Do", "In Progress", "Done"],
    priority: ["High", "Medium", "Low"],
    tasks: [
        {
            id: 1,
            title: "משימה 1",
            description: "תיאור המשימה",
            status: "To Do",
            priority: "High",
            dueDate: "2023-02-01"
            
        },
        {
            id: 2,
            title: "משימה 2",
            description: "תיאור המשימה",
            status: "In Progress",
            priority: "Medium",
            dueDate: "2023-02-15"
        },
        {
            id: 3,
            title: "משימה 1",
            description: "תיאור המשימה",
            status: "To Do",
            priority: "High",
            dueDate: "2023-02-01"
            
        },
        {
            id: 4,
            title: "משימה 1",
            description: "תיאור המשימה",
            status: "To Do",
            priority: "High",
            dueDate: "2023-02-01"
            
        }
    ]

     
};  


const taskSlice= createSlice ({
    name:"tasks",
    initialState:initialState,
    reducers:{
        addTask:(state,action)=>{
            state.tasks.push(action.payload)
        },

        editTask:(state,action)=>{
         const index=state.projects.findIndex(p=>p.id===action.payload.id)
         if(index!=-1){
              state.tasks[index]=action.payload
         }
        },
        removeTask:(state,action)=>{
         state.tasks = state.projects.filter(p => p.id !== action.payload)
        }
        ,
        changeStation:(state,action)=>{
            const index=state.projects.findIndex(p=>p.id===action.payload.id)
            if(index!=-1){
                 state.tasks[index]=action.payload
            }  
        }


        
        
  
    }
})




 export const { add, edit, remove,changeStation } = taskSlice.actions
 export default taskSlice.reducer
