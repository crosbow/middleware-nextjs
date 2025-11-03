import { posts } from "@/app/data";
import { redirect } from "next/navigation";

export const GET = async (_request, { params }) => {
  const postId = Number(params.id);

  const post = posts.find((post) => post.id === postId);

  if (!post) {
    redirect("/api/posts");
  }

  return Response.json(post);
};

export const PATCH = async (request, { params }) => {
  const postId = Number(params.id);
  const { title } = await request.json();

  const postIndex = posts.findIndex((post) => post.id === postId);

  console.log(postIndex);

  if (!postIndex < 0) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Post not found",
      }),
      {
        status: 404,
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

  const updatedPost = {
    id: postId,
    title,
  };

  posts[postIndex].title = title;

  return Response.json(updatedPost);
};

export const DELETE = async (_request, { params }) => {
  const id = Number(params.id);

  const findPostIndex = posts.findIndex((post) => post.id === id);

  if (!findPostIndex < 0) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Post not found",
      }),
      {
        status: 404,
      }
    );
  }

  posts.splice(findPostIndex, 1);

  return Response.json({
    deletedId: id,
  });
};
