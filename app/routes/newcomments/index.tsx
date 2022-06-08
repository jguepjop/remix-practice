import { Link, useLoaderData } from "@remix-run/react";
import Header from "../header";
import type Comments from "~/models/comments.server";
import { getNews } from "~/models/news.server";
import { json } from "@remix-run/node";

type LoaderData = {
  // this is a handy way to say: "posts is whatever type getPosts resolves to"
  News: Awaited<ReturnType<typeof getNews>>;
};

export const loader = async () => {
  return json<LoaderData>({
    News: await getNews(),
  });
};

export default function Index() {
  let { News } = useLoaderData<LoaderData>();
  const current = new Date();

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
          {News.map((news) =>
            news.comment_id.map((comment) => (
              <li key={comment.id}>
                <p style={{ marginTop: 0, fontSize: 10 }}>
                  {comment.author + " "}
                  {current.getFullYear() -
                    new Date(comment.date).getFullYear() >
                  0
                    ? current.getFullYear() -
                      new Date(comment.date).getFullYear() +
                      "Years "
                    : ""}
                  {current.getMonth() - new Date(comment.date).getMonth() > 0
                    ? current.getMonth() -
                      new Date(comment.date).getMonth() +
                      "Months "
                    : ""}
                  {current.getDay() - new Date(comment.date).getDay() > 0
                    ? current.getDay() -
                      new Date(comment.date).getDay() +
                      "days "
                    : ""}
                  {current.getHours() - new Date(comment.date).getHours() > 0
                    ? current.getHours() -
                      new Date(comment.date).getHours() +
                      "hours "
                    : ""}
                  {current.getMinutes() - new Date(comment.date).getMinutes() >
                  0
                    ? current.getMinutes() -
                      new Date(comment.date).getMinutes() +
                      "minutes ago "
                    : ""}
                  on: {news.title}
                </p>
                <p style={{ marginTop: 0 }}>{comment.message}</p>
              </li>
            ))
          )}
        </ol>
      </div>
    </>
  );
}
