mkdir -p dist
browserify client/index.js -o dist/index.js
cp -R public/ dist
echo "> built"
