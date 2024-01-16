/* eslint-disable no-console */

// import { register } from "register-service-worker";

// if (process.env.NODE_ENV === "production") {
//   register(`${process.env.BASE_URL}service-worker.js`, {
//     ready() {
//       console.log(
//         "App is being served from cache by a service worker.\n" +
//           "For more details, visit https://goo.gl/AFskqB"
//       );
//     },
//     registered() {
//       console.log("Service worker has been registered.");
//     },
//     cached() {
//       console.log("Content has been cached for offline use.");
//     },
//     updatefound() {
//       console.log("New content is downloading.");
//     },
//     updated() {
//       console.log("New content is available; please refresh.");
//     },
//     offline() {
//       console.log(
//         "No internet connection found. App is running in offline mode."
//       );
//     },
//     error(error) {
//       console.error("Error during service worker registration:", error);
//     },
//   });
// }
/* eslint-disable no-console */

import { register } from "register-service-worker";
import { precacheAndRoute } from "workbox-precaching";
import { setDefaultHandler } from "workbox-routing";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    async ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    async registered() {
      console.log("Service worker has been registered.");

      // Specify revision information for precached resources
      const precacheEntries = [
        { url: "/", revision: "12345" },
        {
          url: "https://media-tracker.netlify.app/service-worker.js",
          revision: "abcde",
        },
      ];

      // Remove the problematic resource from the precache list
      const filteredPrecacheEntries = precacheEntries.filter(
        (entry) => entry.url !== `${process.env.BASE_URL}_redirects`
      );

      // Update the precache with the filtered entries
      await precacheAndRoute(filteredPrecacheEntries);

      console.log("Problematic resource removed from precache.");
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.");
    },
    async updated(registration) {
      console.log("New content is available; please refresh.");

      // Send a message to the page to trigger a refresh
      if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
      }
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    },
  });

  // Handle 404 responses gracefully
  setDefaultHandler(({ event }) => {
    // If a precached resource is not found, return a custom response or handle it as needed.
    return fetch(event.request).catch(() => {
      return new Response("Resource not found", {
        status: 404,
        statusText: "Not Found",
      });
    });
  });
}
