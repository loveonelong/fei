var fei = {
  projectname:"",
  version: "1.0.0",
  dev: {
    dir: "./",
    map: {
      lib: "lib/",
      components: "componets/",
      component_modules: "component_modules/",
      static: "views/",
      views: "views/"
    }
  },
  release: {
    dir: "./release/",
    map: {
      lib: "",
      components: "static/c/",
      component_modules: "static/c_m/",
      static: "static/v/",
      views: "views/"
    },
    cdn:{
      lib: "",
      components: "static/",
      component_modules: "static/",
      static: "static/",
    }
  }
}
module.exports = fei;