import { useReducer, useEffect } from "react"
import { todoReducer } from "./todoReducer"

const initialState = []

const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || initialState
}

export const useTodos = () => {

  const [todos, dispatch] = useReducer(todoReducer, initialState, init)

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const handleNewTodo = (todo) => {
    const action = {
      type: '[TODO] add todo',
      payload: todo
    }
    dispatch(action)
  }

  const handleDeleteTodo = (id) => {
    dispatch({
      type: '[TODO] delete todo',
      payload: id
    })
  }

  const handleToggleTodo = (id) => {
    dispatch({
      type: '[TODO] toggle todo',
      payload: id
    })
  }

  return {
    todos,
    todoCount: todos.length,
    todoPending: todos.filter(todo => !todo.done).length,
    handleDeleteTodo,
    handleToggleTodo,
    handleNewTodo,
  }
}
