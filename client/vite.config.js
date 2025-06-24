import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        about: resolve(__dirname, "contact.html"),
        about: resolve(__dirname, "home.html"),
        about: resolve(__dirname, "login.html"),
      },
    },
  },
});
