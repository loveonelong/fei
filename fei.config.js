var fei = {
  projectname:"",
  version: "1.0.0",
  dev: {
    dir: "./",
    map: {
      public: "public/",
      components: "componets/",
      component_modules: "component_modules/",
      static: "views/",
      views: "views/"
    }
  },
  release: {
    dir: "./release/",
    map: {
      public: "",
      components: "static/c/",
      component_modules: "static/c_m/",
      static: "static/v/",
      views: "views/"
    }
  }
}
module.exports = fei;