import { useState } from "react";

type user = {
  name: string;
  password: string;
};

// eslint-disable-next-line react-hooks/rules-of-hooks
let users = [
  {
    name: "test",
    password: "test",
  },
];

export async function getUsers(): Promise<Array<user>> {
  return users;
}

export async function createUser(user: Pick<user, "name" | "password">) {
  users.push({
    name: user.name,
    password: user.password,
  });
  return users;
}
