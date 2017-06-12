var
  gulp = require("gulp"),
  fei = require("./fei.config.js"),
  browserSync = require("browser-sync").create(),
  less = require("gulp-less"),
  sequence = require('gulp-sequence'),
  del = require('del'),
  cssmini = require('gulp-clean-css'),
  watchPath = require('gulp-watch-path'),
  webpack = require('webpack-stream'),
  named = require('vinyl-named'),
  through = require('through2'),
  webpackconfig = require('./webpack.config.js'),
  rev = require('gulp-rev'),
  revCollector = require('gulp-rev-collector')

function getPostfix(str) {
  return str.substr(str.lastIndexOf(".")).toLowerCase()
}

var
  dev_path_public = fei.dev.dir + fei.dev.map.public,
  dev_path_views = fei.dev.dir + fei.dev.map.views,
  dev_path_componets = fei.dev.dir + fei.dev.map.components,
  dev_path_componet_modules = fei.dev.dir + fei.dev.map.component_modules,
  release_path_views = fei.release.dir + fei.release.map.views + fei.version + '/',
  release_path_componets = fei.release.dir + fei.release.map.components + fei.version + '/',
  release_path_static = fei.release.dir + fei.release.map.static + fei.version + '/'

gulp.task("browserSync-dev", function () {
  browserSync.init({
    server: {
      baseDir: dev_path_views
    }
  })
  gulp.watch([dev_path_views + "**/*", dev_path_public + "**/*"]).on("change", browserSync.reload)
})

function dev_less2css() {
  gulp.src(dev_path_views + "**/*.less")
    .pipe(less())
    .pipe(gulp.dest(dev_path_views))
}

gulp.task("dev-init", function () {
  dev_less2css()
  dev_webpack()
  dev_template2html()
})

function dev_webpack() {
  var m_relative;
  gulp.src(dev_path_views + "**/index.js")
    .pipe(through.obj(function (file, enc, cb) {
      m_relative = file.relative;
      this.push(file)
      cb();
    }))
    .pipe(named(function (file) {
      return m_relative.substring(0, m_relative.lastIndexOf('\\')) + "/bundle"
    }))
    .pipe(webpack(webpackconfig))
    .pipe(gulp.dest(dev_path_views))
}
gulp.task("dev-watch", function () {

  gulp.watch(dev_path_views + "**/*", function (e) {
    var postfix = getPostfix(e.path);
    switch (postfix) {
      case ".less":
        dev_less2css()
        break
      case ".css":
        dev_less2css()
        break
      default:
        console.log(e)
        break
    }
  })
  gulp.watch(dev_path_componets + "**/*", function (e) {
    var postfix = getPostfix(e.path);
    // var paths = watchPath(e, "./componets/", "./r_dev/componets/");
    switch (postfix) {
      case ".less":
        dev_less2css()
        break
      case ".css":
        dev_less2css()
        break
      case ".js":
        dev_webpack()
        break
      case ".html":
        dev_template2html()
        break
      default:
        browserSync.reload()
        break
    }
  })
  gulp.watch(dev_path_componet_modules + "**/*", function (e) {
    var postfix = getPostfix(e.path);
    switch (postfix) {
      case ".less":
        less2css()
        break
      case ".css":
        less2css()
        break
      case ".js":
        dev_webpack()
        break
      case ".html":
        dev_template2html()
        break
      default:
        browserSync.reload()
        break
    }
  })
})

function dev_template2html() {

}

gulp.task("release-clean", function () {
  // del must use sync！
  del.sync([
    fei.release.dir + fei.release.static + fei.version + "/",
    fei.release.dir + fei.release.views + fei.version + "/"
  ]);
})

gulp.task("release-out", function () {
  gulp.src(dev_path_views + "**/*.html")
    .pipe(gulp.dest(release_path_views))

  gulp.src(dev_path_views+'**/*.css')
    .pipe(cssmini())
    .pipe(rev())
    .pipe(gulp.dest(release_path_static))
    .pipe(rev.manifest())
    .pipe(gulp.dest(fei.release.dir+'./rev/'))
})

gulp.task('rev', function() {
    gulp.src(release_path_views+'**/*')
        .pipe(revCollector({manifest: fei.release.dir+'/rev/rev-mainfest.json'}))
        .pipe(gulp.dest(release_path_views))
});

gulp.task("dev", sequence("dev-watch", ['dev-init', "browserSync-dev"]))
gulp.task("release", sequence("release-clean", "release-out",'rev'))