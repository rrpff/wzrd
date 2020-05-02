mkdir -p public
browserify client/index.js -o public/index.js
browserify client/service-worker.js -o public/service-worker.js
cp -R static/ public
echo "> built"
