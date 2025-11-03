import { posts } from "@/app/data";
import { cookies, headers } from "next/headers";

export const GET = (request) => {
  const searchParams = request.nextUrl.searchParams;

  const query = searchParams.get("query");

  if (query) {
    const result = posts.filter(({ title }) => {
      return title.toLowerCase().includes(query);
    });

    return Response.json(result);
  }

  return Response.json(posts);
};

// Secured Route
const TOKEN = "SUUU";
export const POST = async (request) => {
  const { title } = await request.json();

  const requestHeader = headers();

  const token =
    requestHeader.get("Authorization")?.replace("Bearer", "") ||
    cookies().get("token").value;

  // console.log(cookies().get("token"));

  if (token !== TOKEN) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Invalid auth token",
      }),
      {
        status: 400,
      }
    );
  }

  if (!title) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Title is required",
      }),
      {
        status: 400,
      }
    );
  }

  const newPost = {
    id: posts.length + 1,
    title,
  };

  posts.push(newPost);

  cookies().set("token", TOKEN);

  return new Response(
    JSON.stringify({
      success: true,
      message: "New post created",
      newPost,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
      status: 201,
    }
  );
};
