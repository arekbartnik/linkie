"use server";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import mql from "@microlink/mql";
import { revalidateTag } from "next/cache";
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  }

  return encodedRedirect(
    "success",
    "/sign-up",
    "Thanks for signing up! Please check your email for a verification link.",
  );
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/links");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

const schema = z.object({
  url: z.string().url(),
  name: z.string(),
});

export const addLinkAction = async (
  { url, name }: { url: string; name: string },
) => {
  const supabase = await createClient();
  const currentUser = await supabase.auth.getUser();

  const { status, data } = await mql(url, {
    meta: true,
    screenshot: true,
  });

  if (!data.screenshot?.url) {
    return encodedRedirect("error", "/links", "No screenshot URL available");
  }

  try {
    const { data: insertData } = await supabase.from("links").insert({
      url,
      name: data.title ?? name,
      preview_image: data.screenshot?.url ?? null,
      created_by: currentUser.data.user?.id,
      data,
    }).select();

    const getScreenshot = await fetch(data.screenshot.url);
    const screenshot = await getScreenshot.blob();
    const fileName = `screenshot-${insertData?.[0].id}.png`;

    const { error: uploadError } = await supabase.storage
      .from("linkie")
      .upload(fileName, screenshot);

    if (uploadError) {
      console.error("Error uploading screenshot:", uploadError);
      return;
    }
  } catch (error) {
    console.error("Error processing link:", error);
  }

  return redirect("/links");
};

export const removeLinkAction = async (
  { id }: { id: number },
) => {
  const supabase = await createClient();

  try {
    const response = await supabase.from("links").delete().eq("id", id);
  } catch (error) {
    console.error("Error deleting link:", error);
  }

  return revalidateTag("links");
};

export async function getLinks() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("links")
    .select("id, name, url, preview_image, tags (id, name)")
    .order("id", { ascending: false });

  return data?.map((link) => {
    const isScreenshot = link.id === 65;

    if (isScreenshot) {
      const { data: screenshotUrl } = supabase.storage.from("linkie")
        .getPublicUrl("screenshot-65.png", {
          transform: {
            width: 600,
            height: 600,
            quality: 90,
          },
        });

      return {
        ...link,
        preview_image: screenshotUrl.publicUrl,
      };
    }

    return {
      ...link,
    };
  });
}
