mkdir -p dist
browserify client/index.js -p tinyify -o dist/index.js
cp -R public/ dist
echo "> built"
