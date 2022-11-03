import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useStore } from "@nanostores/react";
import { todosAtom } from "../stores/todoStore";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
  },
});

export default function Home() {
  const todos = useStore(todosAtom);

  const handleTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      todo: { value: string };
      reset: () => void; // clear all input values in the form
    };
    const newTodo = { title: target.todo.value };
    todosAtom.set(todos.concat(newTodo));

    target.reset();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xs" sx={{ my: 10 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Add Todo
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          onSubmit={handleTodo}
        >
          <TextField id="todo" name="todo" label="Add a Task" />
          <Button variant="contained" type="submit">
            Add Task
          </Button>
        </Box>
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            List of To Do's
          </Typography>
          <Box>
            {todos.map((todo, index) => (
              <Paper key={index} sx={{ px: 2, py: 1, mb: 2 }}>
                {todo.title}
              </Paper>
            ))}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
