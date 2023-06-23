module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@realm/babel-plugin',
      '@babel/plugin-transform-flow-strip-types', // Seems to stop realm plugin working so has to go afterwards
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-transform-private-methods', { loose: true }],
      ['nativewind/babel'],
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '@env': './src/core/env.js',
            crypto: 'react-native-quick-crypto',
            stream: 'stream-browserify',
            buffer: '@craftzdog/react-native-buffer',
          },
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
        },
      ],
    ],
  };
};
