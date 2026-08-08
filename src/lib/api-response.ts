import { NextResponse } from "next/server";

type SuccessBody<T> = { status: "success"; data: T } | { status: "success"; message: string };
type ErrorBody = { status: "error"; message: string };

export function ok<T>(data: T, init?: number): NextResponse<SuccessBody<T>> {
  return NextResponse.json({ status: "success", data }, { status: init ?? 200 });
}

export function okMessage(message: string, init?: number): NextResponse<SuccessBody<never>> {
  return NextResponse.json({ status: "success", message }, { status: init ?? 200 });
}

export function fail(
  message: string,
  init: number,
  headers?: HeadersInit
): NextResponse<ErrorBody> {
  return NextResponse.json({ status: "error", message }, { status: init, headers });
}
