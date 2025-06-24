import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about/index.html"),
        contact: resolve(__dirname, "contact/index.html"),
        home: resolve(__dirname, "home/index.html"),
        login: resolve(__dirname, "login/index.html"),
        signup: resolve(__dirname, "signup/index.html"),
      },
    },
  },
});
