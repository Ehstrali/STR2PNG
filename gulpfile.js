const gulp = require('gulp');
const typescript = require('gulp-typescript');
const tslint = require('gulp-tslint');
const runSequence = require('run-sequence');
const fs = require('fs');

let tsProject = typescript.createProject('tsconfig.json');

function deleteFolder(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file, index) => {
            let curPath = path + "/" + file;

            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolder(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

const paths = {
    dist: 'out',
    distFiles: 'out/**/*',
    srcFiles: 'src/**/*',
    srcTsFiles: 'src/**/*.ts',
}

// Clean the contents of the distribution directory
gulp.task('clean', () => {
    return deleteFolder(paths.dist);
});

// Copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', () => {
    return gulp.src([paths.srcFiles, '!' + paths.srcTsFiles])
        .pipe(gulp.dest(paths.dist))
});

// Lint TS Files
gulp.task('tslint', () => {
    return gulp.src(paths.srcTsFiles)
        .pipe(tslint({
            configuration: './tslint.json',
            formatter: 'stylish'
        }))
        .pipe(tslint.report({
            allowWarnings: true,
            summarizeFailureOutput: true,
            emitError: false,
            reportLimit: 99
        }))
});

// TypeScript compile
gulp.task('compile:typescript', ['clean'], () => {
    return tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('build', callback => {
    runSequence('clean', 'tslint', 'compile:typescript', 'copy:assets', callback);
});

gulp.task('default', ['build']);