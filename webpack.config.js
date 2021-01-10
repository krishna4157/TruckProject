const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path')

module.exports = async function(env, argv) {
    const config = await createExpoWebpackConfigAsync(env, argv);
    config.module.rules.forEach(r => {
        if (r.oneOf) {
            r.oneOf.forEach(o => {
                if (o.use && o.use.loader && o.use.loader.includes('babel-loader')) {
                    o.include = [
                        path.resolve('.'),
                        path.resolve('node_modules/react-stompjs/*'),
                        path.resolve('node_modules/react-native-toast-message/*'),
                    ]

                }
            })
        }
    })
    return config;
};


module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync({
        ...env,
        babel: {
            dangerouslyAddModulePathsToTranspile: ['@codler/react-native-keyboard-aware-scroll-view']
        }
    }, argv);
    return config;
};