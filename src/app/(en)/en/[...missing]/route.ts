import { notFoundResponse } from "@/lib/not-found-response";

export function GET(request: Request) {
  return notFoundResponse("en", request.method);
}
