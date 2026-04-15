// const { createSlice } = require("@reduxjs/toolkit")
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    projects:[{
        id: 1,
        name: "Project A",
        description: "Project description",
        date: "2023-01-01",
        tasks: [
            {
                id: 1,
                title: "Task 1",
                description: "Task description",
                status: "To Do",
                priority: "High",
                dueDate: "2023-02-01"
            },
            {
                id: 2,
                title: "Task 2",
                description: "Task description",
                status: "In Progress",
                priority: "Medium",
                dueDate: "2023-02-15"
            }
        ]
},
{
    id: 2,
    name: "Project B",
    description: "Project description",
    date: "2023-01-01",
    tasks: [
        {
            id: 3,
            title: "Task 3",
            description: "Task description",
            status: "Done",
            priority: "Low",
            dueDate: "2023-03-01"
        },{
            id: 443,
            title: "Task 4",
            description: "Task description",
            status: "Done",
            priority: "Low",
            dueDate: "2023-03-01"
        },{
            id: 2313,
            title: "Task 5",
            description: "Task description",
            status: "Done",
            priority: "Low",
            dueDate: "2023-03-01"
        }
    ]

},
{
    id: 3213,
    name: "Project C",
    description: "Project description",
    date: "2023-01-01",
    tasks: []
}
]
}

const projectSlice= createSlice ({
    name:"project",
    initialState:initialState,
    reducers:{
        add:(state,action)=>{
            state.projects.push(action.payload)
        },

        edit:(state,action)=>{
         const index=state.projects.findIndex(p=>p.id===action.payload.id)
         if(index!=-1){
              state.projects[index]=action.payload
         }
        },

        remove:(state,action)=>{
         state.projects = state.projects.filter(p => p.id !== action.payload)
        },

        addTask:(state,action)=>{
            const proj=state.projects.find(p=>p.id==action.payload.id)
            if(proj!=null)
                proj.tasks.push(action.payload.task)
        },

        editTask:(state,action)=>{
            const proj=state.projects.find(p=>p.id==action.payload.id)
            const taskIndex=proj.tasks.findIndex(p=>p.id===action.payload.task.id)
            if(taskIndex!=-1){
              proj.tasks[taskIndex]=action.payload.task
         }
        },

        removeTask:(state,action)=>{
         const proj=state.projects.find(p=>p.id==action.payload.id)
         proj.tasks = proj.tasks.filter(p => p.id !== action.payload.task.id)
        },

        changeStatus:(state,action)=>{
            const proj=state.projects.find(p=>p.id==action.payload.id)
            const taskIndex=proj.tasks.findIndex(p=>p.id===action.payload.task.id)
            if(taskIndex!=-1){
              proj.tasks[taskIndex].status = action.payload.task.status
         }
        }
        
  
    }
})




export const { add, edit, remove, addTask, editTask, removeTask ,changeStatus} = projectSlice.actions

 export default projectSlice.reducer
