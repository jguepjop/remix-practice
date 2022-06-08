import type Comments from "./comments.server";

type News = {
  id: string;
  title: string;
  author: string;
  points: number;
  date: Date;
  comment_id: Array<Comments>;
};

export async function getNews(): Promise<Array<News>> {
  return [
    {
      id: "ssklash_IEAP_6_2_2022_9_20_1",
      title: "Is Ethical Advertising Possible?",
      author: "ssklash",
      points: 1,
      date: new Date("June 3, 2022 03:19:00"),
      comment_id: [
        {
          id: "jacquesm_ssklash_IEAP",
          message:
            "The best explanation that I've seen so far is that he was a Democrat only because it boosted Tesla's sales.",
          author: "ssklash",
          date: new Date("June 3, 2022 03:25:00"),
          news_id: "ssklash_IEAP_6_2_2022_9_20_1",
        },
      ],
    },
    {
      id: "aard_CMP_6_2_2022_9_15_2",
      title: "CannotMeasureProductivity",
      author: "aard",
      points: 2,
      date: new Date("June 3, 2022 03:20:00"),
      comment_id: [
        {
          id: "ajross_aard_CMP",
          message: "FWIW, that wasn't the implication I got from this:",
          author: "ssklash",
          date: new Date("June 3, 2022 03:28:00"),
          news_id: "aard_CMP_6_2_2022_9_15_2",
        },
      ],
    },
  ];
}

export async function addNews(t: string) {
  return (await getNews()).push({
    id: "getauth" + new Date().toString,
    title: t,
    author: "getauth",
    points: 1,
    date: new Date(),
    comment_id: [],
  });
}
