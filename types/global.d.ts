import { NextResponse } from "next/server";

export interface Tag {
  _id: string;
  name: string;
}

export interface Author {
  _id: string;
  name: string;
  image: string;
}

export interface Question {
  _id: string;
  title: string;
  tags: Tag[];
  author: Author;
  createdAt: Date;
  upvotes: number;
  answers: number;
  views: number;
}

export type ActionResponse<T = null> = {
  success:boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  },
  status?: number;
};

export type SuccessResponse<T = null> = ActionResponse<T> & { success: true};
export type ErrorResponse = ActionResponse<undefined> & { success: false};

export type APIErrorResponse = NextResponse<ErrorResponse>;
export type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;

declare global {
  type Tag = import("@/types/global").Tag;
  type Author = import("@/types/global").Author;
  type Question = import("@/types/global").Question;
  type ActionResponse<T = null> = import("@/types/global").ActionResponse<T>;
  type SuccessResponse<T = null> = import("@/types/global").SuccessResponse<T>;
  type ErrorResponse = import("@/types/global").ErrorResponse;
  type APIErrorResponse = import("@/types/global").APIErrorResponse;
  type APIResponse<T = null> = import("@/types/global").APIResponse<T>;
}
