module.exports = {
  assetPrefix:
    process.env.NODE_ENV === 'production'
      ? 'https://opal2020.github.io/keyboard'
      : '',
  images: {
    loader: 'akamai',
    path:
      process.env.NODE_ENV === 'production'
        ? 'https://opal2020.github.io/keyboard'
        : '',
  },
};
