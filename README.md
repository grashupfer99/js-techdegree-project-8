## Using Gulp to Build a Front End Website

*Install all dependencies*
```
npm install
```

*Create map, concatenate,minify,copy all files into all.min.js, then copy to dist/scripts*
```
gulp scripts
```

*Create map, compile SCSS into CSS, concatenate and minify files into all.min.css, then copy to dist/styles*
```
gulp styles
```

*Optimize images and copy them into dist/content*
```
gulp images
```

*Delete all of the files and folders in the dist folder*
```
gulp clean
```

*Run tasks: 'clean', 'scripts', 'styles', 'images'*
```
gulp build
```

*Run 'build', serve the project using a local webserver and watch .scss files*
```
gulp
```
or
```
npm start
```

