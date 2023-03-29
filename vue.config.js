module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3300',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    configureWebpack: {
        externals:  {
            "BMapLib": "BMapLib"
          }
      },
    chainWebpack(config) {
        config.externals({ './cptable': 'var cptable' })
    }
}