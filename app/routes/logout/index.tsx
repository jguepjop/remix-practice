import { ActionFunction, redirect } from "@remix-run/node";
import { getSession, destroySession } from "~/sessions";

export const loader: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  //await destroySession(session);
  return redirect("/login", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
};
