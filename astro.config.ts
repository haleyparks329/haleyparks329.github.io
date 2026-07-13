import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://haleyparks329.github.io",
  devToolbar: {
    enabled: false,
  },
  integrations: [sitemap()],
});
