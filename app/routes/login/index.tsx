import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import React from "react";
import { useState } from "react";
import { createUser, getUsers } from "~/models/user.server";
import { useLoaderData } from "@remix-run/react";
import { getSession, commitSession } from "app/sessions.js";

type LoaderData = {
  // this is a handy way to say: "posts is whatever type getPosts resolves to"
  Users: Awaited<ReturnType<typeof getUsers>>;
  data: any;
};

export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    // Redirect to the home page if they are already signed in.
    return redirect("http://localhost:3000/");
  }
  const data = { error: session.get("error") };
  // const name = "newUsername";
  // const password = "newPassword";
  // await createUser({ name, password });

  return json<LoaderData>(
    {
      Users: await getUsers(),
      data: data,
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}

export async function action({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const form = await request.formData();
  const username = form.get("name");
  const Password = form.get("password");
  const newUsername = form.get("newName");
  const newPassword = form.get("newPassword");

  if (newUsername && newPassword) {
    //create user
    const name = newUsername;
    const password = newPassword;
    await createUser({ name, password });

    session.set("userId", newUsername);
    const data = newUsername;

    // Login succeeded, send them to the home page.
    return redirect("/login", {
      headers: {
        "Set-Cookie": newUsername,
      },
    });
  }

  const userId = await validateCredentials(username, Password);

  if (userId == null) {
    session.flash("error", "Invalid username/password");

    // Redirect back to the login page with errors.
    return redirect("http://localhost:3000/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  session.set("userId", userId);
  const data = username;

  // Login succeeded, send them to the home page.
  return redirect("http://localhost:3000/", {
    headers: {
      "Set-Cookie": session.get("userId"),
    },
  });
}

export default function Login() {
  const [user, setUser] = useState("");
  const [passsword, setPassword] = useState("");
  const [newUser, setNewUser] = useState("");
  const [newPasssword, setNewPassword] = useState("");
  console.log("user-list", useLoaderData<LoaderData>());

  const handleChangeName = (e: any) => {
    setUser(e.target.value);
    //console.log(e.target.value);
  };

  const handleChangePass = (e: any) => {
    setPassword(e.target.value);
    //console.log(e.target.value);
  };

  const handleChangeNewName = (e: any) => {
    setNewUser(e.target.value);
    //console.log(e.target.value);
  };

  const handleChangeNewPass = (e: any) => {
    setNewPassword(e.target.value);
    //console.log(e.target.value);
  };

  return (
    <>
      {/* <h1>Login</h1> */}
      <Form method="post">
        <p>
          <label>
            username:{" "}
            <input
              type="text"
              value={user}
              name="name"
              placeholder="User name..."
              onChange={handleChangeName}
            />
          </label>
        </p>
        <p>
          <label>
            password:{" "}
            <input
              type="password"
              value={passsword}
              name="password"
              placeholder="password..."
              onChange={handleChangePass}
            />
          </label>
        </p>
        <button
          type="submit"
          disabled={user.length === 0 || passsword.length === 0}
        >
          Log in
        </button>
      </Form>
      <Form method="post">
        <p>
          <label>
            username:{" "}
            <input
              type="text"
              value={newUser}
              name="newName"
              placeholder="User name..."
              onChange={handleChangeNewName}
            />
          </label>
        </p>
        <p>
          <label>
            password:{" "}
            <input
              type="password"
              value={newPasssword}
              name="newPassword"
              placeholder="password..."
              onChange={handleChangeNewPass}
            />
          </label>
        </p>
        <button
          type="submit"
          disabled={newUser.length === 0 || newPasssword.length === 0}
        >
          Sign up
        </button>
      </Form>
      {/* <h1>Sign Up</h1> */}
    </>
  );
}
function validateCredentials(username: any, password: any) {
  //   throw new Error("Function not implemented.");
  return "username";
}
