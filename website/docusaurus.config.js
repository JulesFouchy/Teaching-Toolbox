const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

const user_config = require('../../website.config')

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  url: `https://${user_config.github_account}.github.io/`,
  baseUrl: `/${user_config.repo}/`,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: user_config.github_account,
  projectName: user_config.repo,
  themeConfig: {
    navbar: {
      title: '',
      logo: {
        alt: 'Site Logo',
        src: 'img/favicon-32x32.png',
      },
      items: [
        ...user_config.navbar_items,
        {
          href: `https://github.com/${user_config.github_account}/${
              user_config.repo}/issues`,
          position: 'right',
          className: 'header-issues-link',
          'aria-label': 'GitHub issues',
        },
        {
          href:
              'https://github.com/JulesFouchy/Learn--Math-for-Art-and-Computer-Graphics',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Other classes',
          items: [
            {
              label: 'Math for Art and Computer Graphics',
              to: 'https://julesfouchy.github.io/Learn--Math-for-Art-and-Computer-Graphics',
            },
            {
              label: 'C++ and Dev Practices',
              to: 'https://julesfouchy.github.io/Learn--Cpp-And-Dev-Practices/',
            },
          ],
        },
        {
          title: 'Raise an issue!',
          items: [
            {
              label: 'Ask a question',
              to: 'https://github.com/JulesFouchy/Learn--Math-for-Art-and-Computer-Graphics/issues',
            },
            {
              label: 'Report a mistake',
              to: 'https://github.com/JulesFouchy/Learn--Math-for-Art-and-Computer-Graphics/issues',
            },
            {
              label: 'Give me feedback',
              to: 'https://github.com/JulesFouchy/Learn--Math-for-Art-and-Computer-Graphics/issues',
            },
          ],
        },
        {
          title: 'Contact Me',
          items: [
            {
              label: 'Discord',
              to: 'https://discord.com/users/372812330742054914',
            },
            {
              label: 'E-Mail',
              to: 'mailto:jules.fouchy@ntymail.com',
            },
            {
              label: 'GitHub',
              to: 'https://github.com/JulesFouchy',
            },
          ],
        },
      ],
      copyright: `Copyright © ${
          new Date()
              .getFullYear()}. Built with <a href="https://docusaurus.io/">Docusaurus</a>.
              <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
              `,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      //   additionalLanguages: ['typescript'],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../../docs',
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  ...user_config.docusaurus_settings
};
