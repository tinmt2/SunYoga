module.exports = function(api) {
  api.cache(true);
  const t = api.types || require('@babel/types');
  
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Transform import.meta to work in all environments
      function() {
        return {
          visitor: {
            MetaProperty(path) {
              if (
                path.node.meta &&
                path.node.meta.name === 'import' &&
                path.node.property &&
                path.node.property.name === 'meta'
              ) {
                // Replace import.meta with an empty object literal
                const types = require('@babel/types');
                path.replaceWith(types.objectExpression([]));
              }
            },
          },
        };
      },
    ],
  };
};

