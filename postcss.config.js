module.exports ={
  plugins:{
    autoprefixer:{},
    "postcss-px-to-viewport":{

        viewportWidth: 320,
        minPixelValue: 1,
        exclude:[/TarBar/],
    }
  }
}
