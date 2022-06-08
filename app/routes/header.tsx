import { json, LoaderFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import React from "react";
import { useState } from "react";
import { getNews } from "~/models/news.server";
import { commitSession, getSession } from "~/sessions";
import { userPrefs } from "~/cookie";
// import { loader } from ".";
import { login, logout, checkLogin } from "./utils";
import { LoaderData } from ".";

// type HeaderProps = {
//   userName? : string
// }

// let user = "d";
// export const Loader: LoaderFunction = async ({ request }) => {
//   const session = await sessionStorage.getSession(
//     request.headers.get("Cookie")
//   );
//   session.set("cookie_example", "thisworks");
//   return json(
//     { status: "this works" },
//     {
//       headers: {
//         "Set-Cookie": await sessionStorage.commitSession(session),
//       },
//     }
//   );
// };

export default function Header() {
  const { username } = useLoaderData<LoaderData>();
  //console.log(useLoaderData());
  const data = useLoaderData();
  console.log("header loader", data);
  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        backgroundColor: "orange",
        marginLeft: 100,
        marginRight: 100,
      }}
    >
      <h4>
        <Link to="/">Hacker news</Link>
        {"\n"}
        <Link to="/newest_route">new</Link>
        {" | "}
        <Link to={{ pathname: "/newcomments" }}>comments</Link>
        {" | "}
        {username === null ? (
          <Link to={{ pathname: "/login" }}>LogIn</Link>
        ) : (
          <b>
            {" "}
            {username}
            {" | "}
            <Link to={{ pathname: "/logout" }}>Logout</Link>
          </b>
        )}
      </h4>
    </div>
  );
}
