import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'ProductTrack',
  tagline: 'Gestión integral de Inventario',
  favicon: 'img/loguito.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://mari0724.github.io',
  baseUrl: '/producttrack/',
  organizationName: 'Mari0724',
  projectName: 'producttrack',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/Mari0724/producttrack',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/Mari0724/producttrack',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/loguito.png',
    navbar: {
      title: 'ProductTrack',
      logo: {
        alt: 'ProductTrack Logo',
        src: 'img/loguito.png',
      },
      items: [
        { to: '/docs/intro', label: 'Sobre el proyecto', position: 'left' },
        { to: '/docs/backend', label: 'Backend', position: 'left' },
        { to: '/docs/frontend', label: 'Frontend', position: 'left' },
        {
          href: 'https://github.com/Mari0724/producttrack.git',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Secciones',
          items: [
            { label: 'Backend', to: '/docs/backend' },
            { label: 'Frontend', to: '/docs/frontend' },
          ],
        },
        {
          title: 'Más',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Mari0724/producttrack.git',
            },
          ],
        },
        {
          title: 'General',
          items: [
            {
              label: 'Sobre ProductTrack',
              to: '/docs/intro'
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ProductTrack.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
