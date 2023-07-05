"use client";

import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEditAlt } from "react-icons/bi";

import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Example To Do",
    },
    {
      id: 2,
      text: "Example To Do",
    },
    {
      id: 3,
      text: "Example To Do",
    },
  ]);

  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === edit.id) {
          todo.text = edit.value;
        }
        return todo;
      })
    );
    setEdit({
      id: null,
      value: "",
    });
  };

  const updateTodo = (id) => {
    const todoItem = todos.filter((todo) => {
      if (todo.id === id) {
        return todo.text;
      }
    });

    setEdit({ id: id, value: todoItem[0].text });
  };

  const deleteTodo = (id) => {
    console.log(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTodo = (e) => {
    e.preventDefault();
    setTodos([...todos, { id: todos.length, text: input }]);
    setInput("");
  };

  const checkHasPremium = () => {
    return true;
  };

  return (
    <main className="text-center p-5">
      <h1 className="text-success mb-5">To Do Application</h1>

      {edit.id ? (
        <form onSubmit={submitUpdate}>
          <input
            type="text"
            value={edit.value}
            onChange={(e) =>
              setEdit({
                id: edit.id,
                value: e.target.value,
              })
            }
            className="todoInput"
          />
          <button type="submit" className="todoSubmit ms-2">
            Update
          </button>
        </form>
      ) : (
        <div>
          <form onSubmit={addTodo}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="todoInput"
            />
            <button type="submit" className="todoSubmit ms-2">
              Add
            </button>
          </form>

          <div className="todo-row">
            {todos.map((todo, index) => (
              <div key={todo.id} className="todo-item p-2 row">
                <div className="todo-text col-9">{todo.text}</div>
                <div className="todo-icons col-3">
                  <BiSolidEditAlt
                    onClick={() => {
                      if (checkHasPremium()) updateTodo(todo.id);
                      else push("/premium");
                    }}
                  />

                  <AiFillDelete onClick={() => deleteTodo(todo.id)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
