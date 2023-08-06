import React, { useEffect, useState } from "react";


const getTodoList = () => {
    const todoList = localStorage.getItem('todos');

    return JSON.parse(todoList) || [
        { id: Date.now(), task: "Apple", completed: true },
      ];
}

const Todos = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(getTodoList());
  const [show, setShow] = useState(true);
  const [updateId, setUpdateId] = useState("");

  const addTodos = () => {
    if (input.trim() !== "") {
      let newTodo = { id: Date.now(), task: input, completed: false };
      setTodos([...todos, newTodo]);
      setInput("");
    } else {
      alert("Please enter something");
    }
  };

  const editTodos = (id) => {
    todos.filter((item) => {
      if (item.id === id) {
        setUpdateId(item.id);
        setInput(item.task);
        setShow(false);
      }
    });
  };

  const updateTodos = () => {
    todos.filter((item) => {
      if (item.id === updateId) {
        item.task = input;
      }

      setTodos([...todos]);

      setInput("");
      setShow(true);
    });
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => {
         return todo.id !== id;
           
    })

    setTodos([...updatedTodos]);
  }

  //adding to the localstorage
  useEffect(()=> {
    localStorage.setItem('todos', JSON.stringify(todos));
  },[todos])

  return (
    <div>
      <h1>My To-Do List</h1>
      <input
        type="text"
        placeholder="Enter a task"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      {show && <button onClick={addTodos}>Add</button>}
      {!show && <button onClick={updateTodos}>Update</button>}
      {todos.map((item) => {
        return (
          <div>
            <h2>{item.task}</h2>
            <button onClick={() => editTodos(item.id)}>Edit</button>
            <button onClick={() => deleteTodo(item.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Todos;
