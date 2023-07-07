"use client";

import { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEditAlt } from "react-icons/bi";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

export default function Home() {
  const { push } = useRouter();

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const [hasPremium, setHasPremium] = useState(false);

  const [loading, setLoading] = useState(true);

  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch("api/todo/edit-todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        todoId: edit.id,
        name: edit.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.error) {
          toast.error(data.error);
        }

        if (data.error === "Invalid User") {
          push("/login");
        }

        if (data.success) {
          toast.success("Todo Updated");
          setTodos(data.todos);
          setEdit({ id: null, value: "" });
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        setLoading(false);
      });
  };

  const updateTodo = (id) => {
    const todoItem = todos.filter((todo) => {
      if (todo._id === id) {
        return todo;
      }
    });

    console.log(todoItem);
    setEdit({ id: id, value: todoItem[0].name });
  };

  const deleteTodo = (id) => {
    setLoading(true);

    fetch("api/todo/delete-todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        todoId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.error) {
          toast.error(data.error);
        }

        if (data.error === "Invalid User") {
          push("/login");
        }

        if (data.success) {
          toast.success("Todo Deleted");
          setTodos(data.todos);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        setLoading(false);
      });
  };

  const addTodo = (e) => {
    e.preventDefault();

    setLoading(true);
    if (input) {
      fetch("/api/todo/add-todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          name: input,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data.error) {
            toast.error(data.error);
          }

          if (data.error === "Invalid User") {
            push("/login");
          }

          if (data.success) {
            toast.success("Todo Added");
            setTodos(data.todos);
            setInput("");
          }
        })
        .catch((err) => {
          toast.error("Server Error");
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetch("/api/todo/get-todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("token") }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }

        if (data.error === "Invalid User") {
          setLoading(false);
          push("/login");
        }

        if (data.success) {
          setTodos(data.todos);
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
      });
  }, []);

  useEffect(() => {
    fetch("/api/premium/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }

        if (data.error === "Invalid User") {
          push("/login");
        }

        if (data.success) {
          setHasPremium(data.hasPremium);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
      });
  }, []);

  const checkHasPremium = () => {
    if (hasPremium) {
      return true;
    } else {
      toast.error("You need to have premium to edit todo");
      push("/premium");
    }
  };

  return (
    <main className="text-center p-5">
      <h1 className={hasPremium ? "premiumText mb-5" : "text-warning mb-5"}>
        To Do Application
      </h1>

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
          <form onSubmit={(e) => (loading ? e.preventDefault() : addTodo(e))}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="todoInput"
            />
            <button type="submit" className="todoSubmit ms-2">
              {loading ? "loading" : "Add"}
            </button>
          </form>

          <div className="todo-row">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              todos.map((todo, index) => (
                <div key={todo._id} className="todo-item p-2 row">
                  <div className="todo-text col-9">{todo.name}</div>
                  <div className="todo-icons col-3">
                    <BiSolidEditAlt
                      onClick={() => {
                        if (checkHasPremium()) updateTodo(todo._id);
                        else push("/premium");
                      }}
                    />

                    <AiFillDelete
                      onClick={() => {
                        deleteTodo(todo._id);
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </main>
  );
}
