import { getNews } from "~/models/news.server";
import { Link, useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import Header from "../header";
import Comments from "~/models/comments.server";
import { getUsers } from "~/models/user.server";
import { userPrefs } from "~/cookie";
import { getSession } from "~/sessions";

type LoaderData = {
  // this is a handy way to say: "posts is whatever type getPosts resolves to"
  News: Awaited<ReturnType<typeof getNews>>;
  showBanner: any;
};

export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    // Redirect to the home page if they are already signed in.
    return redirect("http://localhost:3000/");
  }
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPrefs.parse(cookieHeader)) || {};

  return json<LoaderData>({
    News: await getNews(),
    showBanner: "cookie.showBanner",
  });
}

export default function New() {
  let { News } = useLoaderData<LoaderData>();
  //console.log(News);
  // const d = new Date(News[0].date)
  // console.log(News[0].comment_id);
  const current = new Date();
  // console.log(useLoaderData<LoaderData>());
  //console.log("try me");

  // // let min_dif = News[0].date.getTime() - current.getTime();
  // // let min = 0;
  for (var i = 0; i < News.length - 1; i++) {
    //insertion sort
    const di = new Date(News[i].date);
    for (var j = i + 1; j < News.length; j++) {
      const dj = new Date(News[j].date);
      if (dj.getTime() - di.getTime() > 0) {
        let temp = News[i];
        News[i] = News[j];
        News[j] = temp;
      }
    }
  }

  return (
    <main>
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
    </main>
  );
}
