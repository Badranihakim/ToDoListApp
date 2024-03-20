import React, {useEffect} from "react";
import {v4 as uuidv4} from "uuid"

export default function Form({input, setInput, todos, setTodos, editTodo, setEditTodo}){
    
    function updateTodo(title,id,completed){
        const newTodo = todos.map((todo)=>
            todo.id === id ? {title, id, completed} : todo
        )
        setTodos(newTodo)
        setEditTodo("")
    }

    useEffect(()=>{
        if(editTodo){
            setInput(editTodo.title);
        }else{
            setInput('')
        }
    },[setInput,editTodo])

    function onInputChange(e){
        setInput(e.target.value)
    }
    
    function onFormSubmit(e){
        e.preventDefault()
        if(!editTodo){
            setTodos([...todos,{id: uuidv4(), title: input, completed: false}]);
            setInput("")
        }else{
            updateTodo(input, editTodo.id, editTodo.completed)
        }
    }

    return(
        <form onSubmit={onFormSubmit}>
            <input type="text" placeholder="Enter a todo.." className="task-input" value={input} required onChange={onInputChange}/>
            <button className="button-add" type="submit" >{editTodo ? 'Ok' : 'Add'}</button>
        </form>
    )
}