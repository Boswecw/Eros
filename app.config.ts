import { defineConfig } from "@solidjs/start/config";
import { withSolidBase } from "@kobalte/solidbase/config";

export default defineConfig(withSolidBase(
  // SolidStart config
  {
    server: {
      prerender: {
        crawlLinks: true
      }
    }
  },
  // SolidBase config
  {
    title: "Eros Author — Charles Boswell",
    titleTemplate: ":title - Eros Author",
    description: "Official site for the Eros author imprint by Charles Boswell",
    themeConfig: {
      sidebar: {
        "/": [
          {
            title: "Overview",
            collapsed: false,
            items: [
              {
                title: "Home",
                link: "/"
              },
              {
                title: "About",
                link: "/about"
              }
            ]
          }
        ]
      }
    }
  }
));
