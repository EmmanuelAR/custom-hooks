import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

export const useTodo = () => {
  const init = () => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  };

  const [todos, dispatch] = useReducer(todoReducer, [], init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onNewTodo = (todo) => {
    const action = {
      type: "[TODO] Add Todo",
      payload: todo,
    };
    dispatch(action);
  };

  const onRemoveTodo = (id) => {
    dispatch({ type: "[TODO] Remove Todo", payload: id });
  };

  const onToggleTodo = (id) => {
    dispatch({ type: "[TODO] Change State Todo", payload: id });
  };

  return {
    onNewTodo,
    onRemoveTodo,
    onToggleTodo,
    todos,
    todosCount: todos.length,
    todosPendingCount: todos.filter((todo) => !todo.done).length,
  };
};
