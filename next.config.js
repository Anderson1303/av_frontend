module.exports = {
    serverRuntimeConfig: {
        secret: '5grw4gsd4a56c4ad5s4DSF4DS56'
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'https://5lhh1.sse.codesandbox.io/api' // development api
            : 'https://5lhh1.sse.codesandbox.io/api' // production api
    },
    reactStrictMode: false
}