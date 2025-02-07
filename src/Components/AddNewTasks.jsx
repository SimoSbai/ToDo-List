import { useContext, useState } from "react"
import {Data} from "./TodoList"
import ListOfTasks from "./ListOfTasks"

function AddNewTasks() {
    const {setInput} = useContext(Data)
    const [newInput, setNewInput] = useState({
        id : Date.now(),
        task : "",
        status : ""
    })

    const changeInputValue = (e)=> setNewInput(prev=>({...prev, task : e.target.value}))

    const addYourTask=()=>{
        if (newInput.task !== "") {
            setInput(prevTasks => {
                const updateData = [...prevTasks, newInput]
                window.localStorage.setItem("tasks", JSON.stringify(updateData))
                return updateData
            })
            setNewInput({id : Date.now(), task : "", status:""})
        }
    }

    const addYourTaskAction=(e)=>{
        if (e.key === "Enter") {
            addYourTask()
        }
    }
    
  return (
    <div className="container">
        <div className="addNewTasks">
            <input type="text" placeholder="Add your task..." value={newInput.task} onChange={changeInputValue} onKeyUp={addYourTaskAction}/>
            <button onClick={addYourTask}>Add Task</button>
        </div>
        <ListOfTasks />
    </div>
  )
}

// window.localStorage.clear()

export default AddNewTasks