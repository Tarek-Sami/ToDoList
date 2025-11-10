import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
// other imports
import {useState, useContext, useEffect, useMemo} from "react";
import {TodosContext} from "../contexts/todosContext";
import {v4 as uuidv4} from "uuid";
// component imports
import Todo from "./Todo";

export default function Todolist() {
  const {todos, setTodos} = useContext(TodosContext);

  const [titleInput, setTitleInput] = useState("");

  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  // Filterd Todos
  const compledtedTodos = useMemo(() => {
    return todos.filter((todo) => todo.isCompleted);
  }, [todos]);
  const notCompletedTodos = useMemo(() => {
    return todos.filter((todo) => !todo.isCompleted);
  }, [todos]);

  // End of Filtered Todos

  let todosToBeDisplayed = todos;

  if (displayedTodosType === "completed") {
    todosToBeDisplayed = compledtedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeDisplayed = notCompletedTodos;
  } else {
    todosToBeDisplayed = todos;
  }

  const todosJsx = todosToBeDisplayed.map((todo) => {
    return <Todo key={todo.id} todo={todo} />;
  });

  function changeDisplayedTodosType(e) {
    setDisplayedTodosType(e.target.value);
  }
  function handleAddTodo() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }

  useEffect(() => {
    const storgeTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storgeTodos);
  }, []);

  return (
    <Container maxWidth="sm">
      <Card
        sx={{minWidth: 275}}
        style={{
          maxHeight: "80vh",
          overflowY: "scroll",
        }}
      >
        <CardContent>
          <Typography variant="h1" style={{fontWeight: "bold"}}>
            مهامي
          </Typography>
          <Divider variant="middle" />
          {/* Filters */}
          <ToggleButtonGroup
            style={{direction: "ltr", marginTop: "30px"}}
            color="primary"
            value={displayedTodosType}
            exclusive
            aria-label="Platform"
            onChange={changeDisplayedTodosType}
          >
            <ToggleButton value="non-completed">غير منجز</ToggleButton>
            <ToggleButton value="completed">منجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>
          {/* End of Filters */}
          {/* All to dos */}
          {todosJsx}
          {/* ---All to dos--- */}
          {/* INPUT + ADD BUTTON */}
          <Grid container style={{marginTop: "20px"}} spacing={2}>
            <Grid
              size={8}
              display="flex"
              justifyContent="space-between"
              alignItems="right"
            >
              <TextField
                style={{width: "100%"}}
                id="outlined-basic"
                label="عنوان المهمة"
                variant="outlined"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
              />
            </Grid>

            <Grid
              size={4}
              display="flex"
              justifyContent="space-between"
              alignItems="left"
            >
              <Button
                style={{width: "100%", height: "100%"}}
                variant="contained"
                onClick={() => {
                  handleAddTodo();
                }}
                disabled={titleInput.trim() === ""}
              >
                إضافة
              </Button>
            </Grid>
          </Grid>
          {/*== INPUT + ADD BUTTON ==*/}
        </CardContent>
      </Card>
    </Container>
  );
}
