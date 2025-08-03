module.exports = {
  title: 'Elparadisogonzalo ETH Wiki',
  tagline: 'Your Ethereum and Web3 knowledge base',
  url: 'https://elparadisogonzalo.github.io',
  baseUrl: '/',
  favicon: 'favicon_io/favicon-32x32.png', // Point to favicon

  themeConfig: {
    image: 'social/og-image.png', // Default image for SEO/social cards
    metadata: [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Elparadisogonzalo' },
      { name: 'twitter:description', content: 'Explore the decentralized world of Elparadisogonzalo.' },
      { name: 'twitter:image', content: '/social/twitter-card.png' },
      { property: 'og:title', content: 'Elparadisogonzalo' },
      { property: 'og:description', content: 'Explore the decentralized world of Elparadisogonzalo.' },
      { property: 'og:image', content: '/social/og-image.png' },
      { property: 'og:url', content: 'https://elparadisogonzalo.com' },
      { name: 'theme-color', content: '#ffffff' },
    ],
    navbar: {
      title: 'ETH Wiki',
      logo: {
        alt: 'ETH Wiki Logo',
        src: 'img/logo.svg',
      },
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [{ label: 'Introduction', to: '/docs/intro' }],
        },
        {
          title: 'Community',
          items: [{ label: 'GitHub', href: 'https://github.com/Elparadisogonzalo' }],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Elparadisogonzalo.`,
    },
  },
};
