const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

// const get_user_config = require("../../website.config");
const user_config = require("../../website.config")();

/** @type {import('@docusaurus/types').DocusaurusConfig} */
// module.exports = async function configCreatorAsync() {
module.exports = {
  //   const user_config = await get_user_config();
  //   return {
  title: user_config.title,
  url: `https://${user_config.github_account.toLowerCase()}.github.io/`,
  baseUrl: `/${user_config.repo}/`,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: user_config.github_account,
  projectName: user_config.repo,
  themeConfig: {
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
          items: [
            {
              label: "Math for Art and Computer Graphics",
              to: "https://julesfouchy.github.io/Learn--Math-for-Art-and-Computer-Graphics",
            },
            {
              label: "C++ and Dev Practices",
              to: "https://julesfouchy.github.io/Learn--Cpp-And-Dev-Practices/",
            },
          ],
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
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: user_config.path_to_docs || "../../docs",
          routeBasePath: "docs",
          sidebarPath: require.resolve("./sidebars.js"),
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  ...user_config.docusaurus_config,
};
// };
