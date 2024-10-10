"use server";
import { revalidatePath } from "next/cache";
import { config } from "./config";
import { getCookie } from "./utils";

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await fetch(`${config.server}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log("error:", error);
  }
};

export const signup = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${config.server}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log("error:", error);
  }
};

export const getProducts = async () => {
  try {
    const response = await fetch(`${config.server}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log("error:", error);
  }
};

export const getProduct = async (id: string) => {
  try {
    const response = await fetch(`${config.server}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log("error:", error);
  }
};

export const addProduct = async (data: {
  name: string;
  description: string;
  price: number;
  stock: number;
}) => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log("error:", error);
  } finally {
    revalidatePath("/");
  }
};

export const updateProduct = async (id: string, data: any) => {
  const token = await getCookie();
  console.log(id, data);
  try {
    const response = await fetch(`${config.server}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log("error:", error);
  } finally {
    revalidatePath("/");
  }
};

export const deleteProduct = async (id: string) => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log("error:", error);
  } finally {
    revalidatePath("/");
  }
};
