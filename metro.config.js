const { getDefaultConfig } = require('expo/metro-config'); // Use expo config if using Expo

const config = getDefaultConfig(__dirname);

// Safely modify resolver
config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs'];
config.resolver.unstable_enablePackageExports = false;

module.exports = config;