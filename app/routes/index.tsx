import { Link, useLoaderData } from "@remix-run/react";
import Header from "./header";

import { getNews } from "~/models/news.server";
import { json, redirect } from "@remix-run/node";
import { useState } from "react";
import { userPrefs } from "~/cookie";
import { commitSession, getSession } from "~/sessions";

export type LoaderData = {
  // this is a handy way to say: "posts is whatever type getPosts resolves to"
  News: Awaited<ReturnType<typeof getNews>>;
  username: any;
};

export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/login");
  }
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPrefs.parse(cookieHeader)) || {};

  return json<LoaderData>({
    News: await getNews(),
    username: cookieHeader,
  });
}

// export {user, pass, setUser, setPass};
// console.log(window.ENV);

// type LoaderData = {
//   // this is a handy way to say: "posts is whatever type getPosts resolves to"
//   News: Awaited<ReturnType<typeof getNews>>;
// };

// export const loader = async () => {
//   return json<LoaderData>({
//     News: await getNews(),
//   });
// };

export default function Index() {
  let { News } = useLoaderData<LoaderData>();
  const current = new Date();
  // // const [user, setUser] = useState("John");
  // const [pass, setPass] = useState("");
  // // export {user, pass, setUser, setPass};
  const data = useLoaderData();
  console.log("home loader", data);

  return (
    <>
      <Header />
      <div
        style={{
          fontFamily: "system-ui, sans-serif",
          lineHeight: "1.4",
          backgroundColor: "beige",
          marginLeft: 100,
          marginRight: 100,
        }}
      >
        <ol>
          {News.map((news) => (
            <li key={news.id}>
              <p style={{ marginBottom: 0 }}>{news.title}</p>
              <p style={{ marginTop: 0, fontSize: 10 }}>
                {news.points} points by {news.author + " "}
                {current.getFullYear() - new Date(news.date).getFullYear() > 0
                  ? current.getFullYear() -
                    new Date(news.date).getFullYear() +
                    "Years "
                  : ""}
                {current.getMonth() - new Date(news.date).getMonth() > 0
                  ? current.getMonth() -
                    new Date(news.date).getMonth() +
                    "Months "
                  : ""}
                {current.getDay() - new Date(news.date).getDay() > 0
                  ? current.getDay() - new Date(news.date).getDay() + "days "
                  : ""}
                {current.getHours() - new Date(news.date).getHours() > 0
                  ? current.getHours() -
                    new Date(news.date).getHours() +
                    "hours "
                  : ""}
                {current.getMinutes() - new Date(news.date).getMinutes() > 0
                  ? current.getMinutes() -
                    new Date(news.date).getMinutes() +
                    "minutes ago"
                  : ""}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
