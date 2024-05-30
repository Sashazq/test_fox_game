// src/mocks/handlers.js
import { http, HttpResponse, rest } from "msw";
import funnyIndex from "../src/assets/foxes/img1.jpg";

export const handlers = [
  http.get("https://randomfox.ca/api/v1/getfoxes", () => {
    return HttpResponse.json({
      images: [
        "http://images.com/foxes/img1.jpg",
        "http://images.com/foxes/img2.jpg",
        "http://images.com/foxes/img3.jpg",
      ],
    });
  }),
  http.get("https://api.thecatapi.com/v1/images/search", () => {
    return HttpResponse.json([
      { url: "http://images.com/cats/img1.jpg" },
      { url: "http://images.com/cats/img2.jpg" },
      { url: "http://images.com/cats/img3.jpg" },
      { url: "http://images.com/cats/img4.jpg" },
      { url: "http://images.com/cats/img5.jpg" },
      { url: "http://images.com/cats/img6.jpg" },
    ]);
  }),
  http.get("https://api.thedogapi.com/v1/images/search", () => {
    return HttpResponse.json([
      { url: "http://images.com/dogs/img1.jpg" },
      { url: "http://images.com/dogs/img2.jpg" },
      { url: "http://images.com/dogs/img3.jpg" },
      { url: "http://images.com/dogs/img4.jpg" },
      { url: "http://images.com/dogs/img5.jpg" },
      { url: "http://images.com/dogs/img6.jpg" },
    ]);
  }),

  // http.get(, async (req, res, ctx) => {
  //   // const image = await fetch(funnyIndex).then((res) => res.arrayBuffer());
  //   // Construct the image URL from request parameters

  //   // const { category, imageName } = req.params;
  //   // const imageUrl = `/assets/${category}/${imageName}`;

  //   // // Simulate successful image load
  //   return res(
  //     ctx.status(200),
  //     ctx.set("Content-Type", "image/jpeg"),
  //     ctx.body(""), // Empty body just to simulate successful load
  //   );
  // }),
  http.get("/:category/:imageName", async ({ params }) => {
    console.log("Loading local asset");
    // The easiest way to obtain a buffer in the browser
    // is to fetch the resource you need and read its body
    // as "response.arrayBuffer()".
    const buffer = await fetch(funnyIndex).then((response) => response.arrayBuffer());

    // Use the "HttpResponse.arrayBuffer()" shorthand method
    // to automatically infer the response body buffer's length.
    return HttpResponse.arrayBuffer(buffer, {
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
  }),
];
