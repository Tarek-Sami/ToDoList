import './App.css';
import Todolist from './components/Todolist';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastProvider } from './contexts/toastContext';
import TodosProvider from './contexts/todosContext';
const theme = createTheme({
  typography: {
    fontFamily: ['Tajawal'],
  },
  palette: {
    // primary: {main: "#ff0000ff"},
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <div
          className="App"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#181616',
            direction: 'rtl',
          }}
        >
          <ToastProvider>
            <Todolist />
          </ToastProvider>
        </div>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
