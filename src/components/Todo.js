import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
// icons
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
// other
import {useState, useContext} from "react";
import {TodosContext} from "../contexts/todosContext";
// dialog imports
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Todo({todo}) {
  const {todos, setTodos} = useContext(TodosContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });

  //Handle Clicks Functions

  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }
  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => t.id !== todo.id);
    setTodos(updatedTodos);
    handleDeleteDialogClose();
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  function handleEditClick() {
    setShowEditDialog(true);
  }
  function handleEditDialogClose() {
    setShowEditDialog(false);
  }
  function handleEditDialogConfirm() {
    // To be implemented
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return {...t, title: updatedTodo.title, details: updatedTodo.details};
      }
      return t;
    });
    setTodos(updatedTodos);
    handleEditDialogClose();
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  //Handle Clicks Functions
  return (
    <>
      {/* Delete Modal */}
      <Dialog
        style={{direction: "rtl"}}
        onClose={handleDeleteDialogClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل أنت متأكد من حذف هذه المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكن التراجع عن هذا الإجراء.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>اغلاق</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            حذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Modal */}
      {/* Update Modal */}
      <Dialog
        style={{direction: "rtl"}}
        onClose={handleEditDialogClose}
        open={showEditDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) =>
              setUpdatedTodo({...updatedTodo, title: e.target.value})
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) =>
              setUpdatedTodo({...updatedTodo, details: e.target.value})
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>اغلاق</Button>
          <Button autoFocus onClick={handleEditDialogConfirm}>
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
      {/* Update Modal */}
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593 ",
          color: "white",
          marginTop: "20px",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                  maxWidth: "400px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "right",
                  maxWidth: "400px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {todo.details}
              </Typography>
            </Grid>

            {/* Buttons */}

            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              gap="10px"
              alignItems="center"
            >
              {/* check icon button */}
              <IconButton
                className="iconButton"
                aria-label="check"
                style={{
                  backgroundColor: todo.isCompleted ? "#8bc34a" : "white",
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  border: "solid 3px #8bc34a",
                }}
                onClick={() => {
                  handleCheckClick();
                }}
              >
                <CheckIcon />
              </IconButton>
              {/* check icon button */}
              {/* Edit icon button */}
              <IconButton
                className="iconButton"
                aria-label="edit"
                style={{
                  backgroundColor: "white",
                  color: "#1796aa",
                  border: "solid 3px #1796aa",
                }}
                onClick={handleEditClick}
              >
                <EditIcon />
              </IconButton>
              {/* Edit icon button */}
              {/* Delete icon button */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  backgroundColor: "white",
                  color: "#b23c17",
                  border: "solid 3px #b23c17",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteIcon />
              </IconButton>
              {/* Delete icon button */}
            </Grid>
            {/* --- Buttons --- */}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
