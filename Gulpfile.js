"use strict";

const gulp     = require("gulp"),
      path     = require("path"),
      svgmin   = require("gulp-svgmin"),
      rename   = require("gulp-rename"),
      inject   = require("gulp-inject"),
      svgstore = require("gulp-svgstore");


gulp.task("svg", () => {
    let svgs = gulp
        .src("./src/assets/themes/base/images/icons/*.svg")
        .pipe(svgmin(function (file) {
            let prefix = path.basename(file.relative, path.extname(file.relative));

            return {
                plugins: [
                    {
                        removeTitle: true
                    },
                    {
                        removeAttrs: {
                            attrs: "(fill|stroke)"
                        }
                    },
                    {
                        removeStyleElement: true
                    },
                    {
                        cleanupIDs: {
                            prefix: prefix + "-",
                            minify: true
                        }
                    }
                ]
            }
        }))
        .pipe(rename({prefix: "icon-"}))
        .pipe(svgstore({inlineSvg: true}));

    function fileContents(filePath, file) {
        return file.contents.toString();
    }

    return gulp
        .src("./src/index.html")
        .pipe(inject(svgs, {transform: fileContents}))
        .pipe(gulp.dest("src"));
});



/*HELPERS*/
process.on("uncaughtException", (err) => {
    console.error(err.message, err.stack, err.errors);
    process.exit(255);
})
;

gulp.on("err", (gulpErr) => {
    if(gulpErr.err) {
        console.error("Gulp error details", [gulpErr.err.message, gulpErr.err.stack, gulpErr.err.errors].filter(Boolean));
    }
});

