module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'reactAddressSelector',
      externals: {
        react: 'React'
      }
    }
  }
}
