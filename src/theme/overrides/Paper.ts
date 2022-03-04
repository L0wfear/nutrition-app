export default () => {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0
      },

      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    }
  }
}
