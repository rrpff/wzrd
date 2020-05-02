const detective = require("detective")

const output = document.getElementById("output")
const editor = document.getElementById("editor")
const dependencies = document.getElementById("dependencies")

const browserify = async code => {
  const dependencies = detective(code)
  const bundles = await Promise.all(dependencies.map(async d => {
    const res = await fetch(`https://wzrd.in/bundle/${d}@latest`)
    return await res.text()
  }))

  const scripts = [...bundles, code]
  const bundle = scripts.join("\n;")

  return {
    bundle,
    dependencies
  }
}

const debounce = (fn, ms) => {
  let timeout
  return (...args) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), ms)
  }
}

const html = script => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <style>html, body { padding: 0; margin: 0; height: 100%; display: block; }</style>
  </head>
  <body>
    <script type="text/javascript">${script}</script>
  </body>
  </html>
  `
}

const renderDependencies = deps => {
  dependencies.innerHTML = ""
  deps.forEach(dep => {
    const li = document.createElement("li")
    li.innerText = dep
    dependencies.appendChild(li)
  })
}

const renderOutput = async script => {
  const iframe = document.createElement("iframe")
  iframe.src = "about:blank"
  iframe.frameBorder = "0"

  output.innerHTML = ""
  output.appendChild(iframe)

  iframe.contentWindow.document.open()
  iframe.contentWindow.document.write(html(script))
  iframe.contentWindow.document.close()
}

const change = async () => {
  const { bundle, dependencies } = await browserify(editor.value)

  renderOutput(bundle)
  renderDependencies(dependencies)
}

change()
editor.addEventListener("keyup", debounce(change, 500))

if ("serviceWorker" in navigator)
  navigator.serviceWorker.register("/service-worker.js")
