import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload } from "@fortawesome/free-solid-svg-icons"

const NewNote = ({newTodo, setNewTodo, addTodoMutation}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodoMutation({userId:1, title: newTodo, completed: false, id: 14});
    setNewTodo('');
    }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          placeholder= "Enter new todo"
          onChange= {e => setNewTodo(e.target.value)}
        />
      </div>
       <button className="submit">
           <FontAwesomeIcon icon={faUpload}/>
        </button>
    </form>
  )
}

export default NewNote
