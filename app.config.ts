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
    title: "Ἔρως Author",
    titleTemplate: ":title - Ἔρως",
    description: "Official website for author Ἔρως - bold adult-fantasy stories",
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
