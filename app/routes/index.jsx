import {
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Form, useNavigate } from "@remix-run/react";
import { formTodoStore } from "~/stores/index.store";
import dayjs from "dayjs";
import { useState } from "react";
import _ from "lodash";
import { getSession } from "~/sessions";
import { redirect } from "@remix-run/node";

export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("userId");
  if (!user) {
    // Redirect to the home page if they are already signed in.
    return redirect("/login");
  }
  return null;
}

export default function Index() {
  const [form, setForm, setFilterForm] = formTodoStore((e) => [
    e.form,
    e.setForm,
    e.setFilterForm,
  ]);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  function handleSubmit() {
    setForm({
      [dayjs().format()]: {
        id: _.size(form),
        task,
        description,
      },
    });
    setTask("");
    setDescription("");
  }
  return (
    <Container sx={{ textAlign: "center" }}>
      <Form onSubmit={handleSubmit}>
        <Grid container mt={2}>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Task"
              name="task"
              type="text"
              placeholder="Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={{ my: 2 }}
            id="outlined-basic"
            label="description"
            name="description"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Grid>
        <Button type="submit" variant="contained">
          ยืนยัน
        </Button>
      </Form>
      <Grid mt={4}>
        {_.map(form, (el, index) => (
          <Grid key={index}>
            <Typography
              fontSize={16}
              sx={{ cursor: "pointer" }}
              onClick={() =>
                navigate(`/tasks/${el?.task}`, {
                  state: { description: el?.description },
                })
              }
            >
              {el?.task}
            </Typography>
            <Typography color="grey" fontSize={12}>
              {el?.description}
            </Typography>
            <Grid container justifyContent="center">
              <Typography>แก้ไข</Typography>
              <Typography
                ml={2}
                sx={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => {
                  const newForm = _.omit(form, [index]);
                  setFilterForm(newForm);
                }}
              >
                ลบ
              </Typography>
            </Grid>
            <Divider light sx={{ my: 2 }} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
