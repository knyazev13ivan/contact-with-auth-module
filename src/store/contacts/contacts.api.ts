import { baseApi } from "../base.api";

export interface IContact {
  id: string;
  name: string;
  phone: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getContacts: build.query<IContact[], string>({
      query: () => ({
        url: "/660/contacts",
      }),
      providesTags: () => ["contacts"],
    }),
    getContactById: build.query<IContact, string>({
      query: (id) => ({
        url: `/660/contacts/${id}`,
      }),
    }),
    createContact: build.mutation<IContact, IContact>({
      query: (params) => ({
        url: `/660/contacts`,
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["contacts"],
    }),
    updateContact: build.mutation<IContact, IContact>({
      query: (params) => ({
        url: `/660/contacts/${params.id}`,
        method: "PATCH",
        body: params,
      }),
      invalidatesTags: ["contacts"],
    }),
    deleteContact: build.mutation<IContact, string>({
      query: (id) => ({
        url: `/660/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contacts"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetContactsQuery,
  useGetContactByIdQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = authApi;
