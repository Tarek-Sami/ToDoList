import "./App.css";
import Todolist from "./components/Todolist";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {TodosContext} from "./contexts/todosContext";
import {useState} from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["Tajawal"],
  },
  palette: {
    // primary: {main: "#ff0000ff"},
  },
});

const initialTodos = [];
function App() {
  const [todos, setTodos] = useState(initialTodos);
  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#181616",
          direction: "rtl",
        }}
      >
        <TodosContext.Provider value={{todos, setTodos}}>
          <Todolist />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
