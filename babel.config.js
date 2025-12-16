// module.exports = function (api) {
//   api.cache(true);

//   // Resolve optional module-resolver gracefully so bundling doesn't fail
//   let moduleResolverPath = null;
//   try {
//     moduleResolverPath = require.resolve('babel-plugin-module-resolver');
//   } catch (e) {
//     // Optional: keep silent in CI; Expo fast resolver or tsconfig may handle aliases
//   }

//   const plugins = [require.resolve('expo-router/babel')];

//   if (moduleResolverPath) {
//     plugins.push([
//       moduleResolverPath,
//       {
//         root: ['./'],
//         alias: { '@': './' },
//         extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
//       },
//     ]);
//   }

//   return {
//     presets: [
//       [
//         'babel-preset-expo',
//         { unstable_transformImportMeta: true },
//       ],
//     ],
//     plugins,
//   };
// };
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { unstable_transformImportMeta: true }]],
    plugins: ["react-native-reanimated/plugin"],
  };
};