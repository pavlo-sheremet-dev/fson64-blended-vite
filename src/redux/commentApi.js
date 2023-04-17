import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_ENDPOINT = "/comments";
const BASE_URL = "https://6393b5f2ab513e12c514f63c.mockapi.io/api";

export const commentApi = createApi({
  reducerPath: "comments",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => ({
        url: "/comments",
      }),
      providesTags: ["comments"],
    }),
    postComment: builder.mutation({
      query: (body) => ({
        url: "/comments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["comments"],
    }),
    updateComment: builder.mutation({
      query: (comment) => ({
        url: `/comments/${comment.id}`,
        method: "PUT",
        body: comment,
      }),
      invalidatesTags: ["comments"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  usePostCommentMutation,
  useUpdateCommentMutation,
} = commentApi;
