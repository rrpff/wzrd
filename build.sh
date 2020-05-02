mkdir -p dist
browserify client/index.js -o dist/index.js
browserify client/service-worker.js -o dist/service-worker.js
cp -R public/ dist
echo "> built"
