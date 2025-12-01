import './App.css';
import Todolist from './components/Todolist';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastProvider } from './contexts/toastContext';
import TodosProvider from './contexts/todosContext';
import DarkVeil from './component/DarkVeil.jsx';
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
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#181616',
            direction: 'rtl',
            overflow: 'hidden',
          }}
        >
          {/* Full-screen DarkVeil background layer */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 0,
              pointerEvents: 'none',
            }}
          >
            <DarkVeil
              hueShift={0}
              noiseIntensity={0.02}
              scanlineIntensity={0.1}
              scanlineFrequency={40}
              speed={0.5}
              warpAmount={0.05}
              resolutionScale={1}
            />
          </div>

          {/* Foreground app content */}
          <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
            <ToastProvider>
              <Todolist />
            </ToastProvider>
          </div>
        </div>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
