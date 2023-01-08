import { Button, Container, TextField, Typography } from "@mui/material";
import { json, redirect } from "@remix-run/node";
import { useState } from "react";
import { commitSession, getSession } from "../sessions";

export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/");
  }

  const data = { error: session.get("error") };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function action({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = 1;
  // const userId = await validateCredentials(username, password);
  session.set("userId", userId);
  // Login succeeded, send them to the home page.
  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function LoginPage() {
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
      <Typography> *press any text in tel & password</Typography>
      <Typography> session 10 mins</Typography>

      <form method="POST">
        <TextField
          id="outlined-basic"
          label="Tel"
          name="tel"
          type="text"
          placeholder="Tel"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          required
        />
        <TextField
          name="password"
          id="outlined-basic"
          type="password"
          label="รหัสผ่าน"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">
          เข้าสู่ระบบ
        </Button>
      </form>
    </Container>
  );
}
