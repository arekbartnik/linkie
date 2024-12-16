import { createClient } from "jsr:@supabase/supabase-js@2";
import { getOGTags } from "https://deno.land/x/opengraph@v1.0.0/mod.ts";

interface PreviewRequest {
  url: string;
}

Deno.serve(async (req) => {
  try {
    // Validate request method
    if (req.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    // Parse request body
    const payload = await req.json();
    const { id, url } = payload.record;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    );

    const ogTags = await getOGTags(url);

    console.log(JSON.stringify(ogTags, null, 2));

    await supabase.from("links").update({
      preview_image: (typeof ogTags.image === "object"
        ? ogTags.image.content
        : ogTags.image) || "default",
    }).eq("id", id);

    // // return success response
    // return new Response(JSON.stringify({ success: true }), {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    return new Response("ok");
  } catch (error) {
    console.error("Error getting og tags:", error);
    return new Response(
      JSON.stringify({ error: "Failed to get OpenGraph tags" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
});
