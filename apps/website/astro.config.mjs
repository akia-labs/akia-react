import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://akia-react.example.com",
  integrations: [
    react(),
    starlight({
      title: "akia-react",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/your-org/akia-react"
        }
      ],
      sidebar: [
        {
          label: "Guide",
          items: [{ label: "Introduction", link: "/" }]
        },
        {
          label: "Packages",
          items: [
            { label: "akia-react-livecode", link: "/packages/livecode/" },
            { label: "akia-react-ai-markdown", link: "/packages/ai-markdown/" }
          ]
        }
      ]
    })
  ]
});
