// @ts-check

const lightCodeTheme = require("prism-react-renderer/themes/github")
const darkCodeTheme = require("prism-react-renderer/themes/dracula")
const math = require("remark-math")
const katex = require("rehype-katex")
const sidebarItemsGenerator = require("./sidebarItemsGenerator")

module.exports = async () => {
  const user_config = await require("../../website.config")()
  /** @type {import('@docusaurus/types').Config} */
  const config = {
    title: user_config.title,
    url: `https://${user_config.github_account.toLowerCase()}.github.io/`,
    baseUrl: `/${user_config.repo}/`,
    trailingSlash: true,
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "throw",
    favicon: "img/favicon.ico",
    organizationName: user_config.github_account,
    projectName: user_config.repo,
    staticDirectories: ["static", "../../static"],
    customFields: {
      main_page_link: user_config.main_page_link,
      lessons_allowed_tags: user_config.lessons_allowed_tags,
    },

    presets: [
      [
        "classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            path: "../../content",
            routeBasePath: "/",
            sidebarPath: require.resolve("../../sidebars.js"),
            sidebarItemsGenerator: user_config.should_sort_lessons_by_priority
              ? sidebarItemsGenerator
              : undefined,
            remarkPlugins: [math],
            rehypePlugins: [katex],
          },
          theme: {
            customCss: require.resolve("./src/css/custom.css"),
          },
          pages: {
            path: "../../standalone-pages",
          },
        }),
      ],
    ],

    stylesheets: [
      {
        href: "https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css",
        integrity:
          "sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc",
        crossorigin: "anonymous",
      },
    ],

    plugins: [
      "./plugin--lessons-list",
      "./plugin--all-students",
      "@docusaurus/plugin-ideal-image",
      "docusaurus-plugin-includes",
      [
        require.resolve("docusaurus-lunr-search"),
        {
          excludeRoutes: [
            "../../content/lessons/img/**/*",
            "../../content/assignment/img/**/*",
          ],
        },
      ],
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        navbar: {
          title: "",
          logo: {
            alt: "Site Logo",
            src: "img/favicon-32x32.png",
          },
          items: [
            ...user_config.navbar_items,
            {
              href: `https://github.com/${user_config.github_account}/${user_config.repo}/issues/new/choose`,
              position: "right",
              className: "header-issues-link",
              "aria-label": "GitHub issues",
              title: "Ask a question",
            },
          ],
        },
        footer: user_config.footer || {
          style: "dark",
          links: [
            {
              title: "Other classes",
              items: user_config.classes
                .filter((c) => c.name !== user_config.title)
                .map((c) => ({
                  label: c.name,
                  to: c.url,
                })),
            },
            {
              title: "Raise an issue!",
              items: [
                {
                  label: "Ask a question",
                  to: `https://github.com/${user_config.github_account}/${user_config.repo}/issues/new/choose`,
                },
                {
                  label: "Report a mistake",
                  to: `https://github.com/${user_config.github_account}/${user_config.repo}/issues/new/choose`,
                },
                {
                  label: "Give me feedback",
                  to: `https://github.com/${user_config.github_account}/${user_config.repo}/issues/new/choose`,
                },
              ],
            },
            {
              title: "Contact Me",
              items: user_config.contact_info,
            },
          ],
          copyright:
            (user_config.copyright_before || "") +
            `Copyright © ${new Date().getFullYear()}. Built with <a href="https://docusaurus.io/">Docusaurus</a>.` +
            (user_config.copyright_after || ""),
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
          additionalLanguages: user_config.syntax_highlight_for || [],
        },
      }),

    ...user_config.docusaurus_config,
  }
  return config
}
