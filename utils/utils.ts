"use server";

import { cookies } from "next/headers";

export const getCookie = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  return token;
};

export const deleteCookie = async () => {
  cookies().delete("token");
};
