// @ts-check

const lightCodeTheme = require("prism-react-renderer/themes/github")
const darkCodeTheme = require("prism-react-renderer/themes/dracula")
const math = require("remark-math")
const katex = require("rehype-katex")

const user_config = require("../../website.config")()

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: user_config.title,
  url: `https://${user_config.github_account.toLowerCase()}.github.io/`,
  baseUrl: `/${user_config.repo}/`,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: user_config.github_account,
  projectName: user_config.repo,
  staticDirectories: ["static", "../../static"],
  customFields: {
    main_page_link: user_config.main_page_link,
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: user_config.path_to_content || "../../content",
          routeBasePath: "/",
          sidebarPath: require.resolve("../../sidebars.js"),
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
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

  plugins: [require.resolve("docusaurus-lunr-search")],

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
            href: `https://github.com/${user_config.github_account}/${user_config.repo}/issues`,
            position: "right",
            className: "header-issues-link",
            "aria-label": "GitHub issues",
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
                to: `https://github.com/${user_config.github_account}/${user_config.repo}/issues`,
              },
              {
                label: "Report a mistake",
                to: `https://github.com/${user_config.github_account}/${user_config.repo}/issues`,
              },
              {
                label: "Give me feedback",
                to: `https://github.com/${user_config.github_account}/${user_config.repo}/issues`,
              },
            ],
          },
          {
            title: "Contact Me",
            items: user_config.contact_info,
          },
        ],
        copyright:
          `Copyright © ${new Date().getFullYear()}. Built with <a href="https://docusaurus.io/">Docusaurus</a>.` +
            user_config.extra_copyright || "",
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: user_config.syntax_highlight_for || [],
      },
    }),

  ...user_config.docusaurus_config,
}

module.exports = config
