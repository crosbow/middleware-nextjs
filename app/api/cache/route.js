export const dynamic = "force-dynamic";

export const GET = async (_request) => {
  return Response.json(new Date().toLocaleTimeString());
};
