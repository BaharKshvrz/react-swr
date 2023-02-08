import React, {useState} from 'react';
import toast, {Toaster} from 'react-hot-toast';
import useSWR from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import NewNote from './NewNote';

import {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    todosUrlEndpoint as cacheKey,
} from '../../api/todosApi';

import {addTodoOptions, deleteTodoOptions, updateTodoOptions} from '../../api/todosSWROption';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');

  const {
    isLoading, 
    error,
    data: todos,
    mutate,
  } = useSWR(cacheKey, getTodos, {
    onSuccess: data => data.sort((a, b) => b.id - a.id)
  });


  const addTodoMutation = async(newTodo) => {
    try {
        await mutate(
            addTodo(newTodo),
            addTodoOptions(newTodo)
        );
       toast.success("Success! Added new item.", {
         duration: 1000,
       });
    } catch (error) {
       toast.error("Failed to add the new todo", {
         duration: 1000,
       }); 
    }
  }

  const updateTodoMutation = async(updatedTodo) => {
   try {
    await mutate(
        updateTodo(updatedTodo),
        updateTodoOptions(updatedTodo)
    );
    toast.success("Todo was updated successfully!");
   } catch (error) {
      toast.error("Failed to update the todo", {
        duration: 1000,
      });   
   }
  }

  const deleteTodoMutaion = async({ id }) => {
    try {
     await mutate(
        deleteTodo({ id }),
        deleteTodoOptions({ id })
     );
     toast.success("Todo was deleted successfully!");
    } catch (error) {
        toast.error("Failed to delete the todo", {
            duration: 1000,
          });   
     }
  }


  let content;
  if (isLoading) {
    content = <p>Loading ... </p>;
  } else if (error) {
    content = <p>{error.message} </p>
  } else {
    content = todos.map(todo => {
        return (
            <article key={todo.id}>
                <div className="todo">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      id= {todo.id}
                      onChange= {() => updateTodoMutation({...todo, completed: !todo.completed})}
                    />
                    <label htmlFor={todo.id}>{todo.title}</label>
               </div>
               <button className="trash" onClick={() => deleteTodoMutaion({id: todo.id})}>
                  <FontAwesomeIcon icon={faTrash}/>
               </button>
            </article>
            );
    })
 }

  return <main>
       <Toaster toastOptions={{position: "top-center"}} />
       <h1>Todo List</h1>
       <NewNote
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        addTodoMutation= {addTodoMutation}
        />
       {content}
    </main>
}

export default TodoList
