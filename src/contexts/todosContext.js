import { createContext, useReducer, useContext } from 'react';
import todosReducer from '../reducers/todosReducer';

export const TodosContext = createContext([]);
export const dispatchContext = createContext([null]);

const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, []);

  return (
    <TodosContext.Provider value={{ todos }}>
      <dispatchContext.Provider value={{ dispatch }}>
        {children}
      </dispatchContext.Provider>
    </TodosContext.Provider>
  );
};
export const useTodos = () => useContext(TodosContext);
export const useDispatch = () => useContext(dispatchContext);
export default TodosProvider;
