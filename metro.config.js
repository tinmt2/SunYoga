// Learn more: https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Use Expo's defaults for native. Do not override package exports
// resolution because React Native 0.75 relies on it for TurboModules.
// If you need web-only tweaks, keep them in webpack.config.js instead.
module.exports = config;
