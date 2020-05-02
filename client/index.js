const detective = require("detective")

const output = document.getElementById("output")
const editor = document.getElementById("editor")
const dependencies = document.getElementById("dependencies")

const debounce = (fn, ms) => {
  let timeout
  return (...args) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), ms)
  }
}

const html = scripts => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <style>html, body { padding: 0; margin: 0; height: 100%; display: block; }</style>
  </head>
  <body>
    ${scripts.map(script => `<script type="text/javascript">${script}</script>`).join("\n")}
  </body>
  </html>
  `
}

const renderDependencies = (deps) => {
  dependencies.innerHTML = ""
  deps.forEach(dep => {
    const li = document.createElement("li")
    li.innerText = dep
    dependencies.appendChild(li)
  })
}

const execute = async (code, dependencies) => {
  const bundles = await Promise.all(dependencies.map(async d => {
    const res = await fetch(`https://wzrd.in/bundle/${d}@latest`)
    return await res.text()
  }))

  const scripts = [...bundles, code]

  const iframe = document.createElement("iframe")
  iframe.src = "about:blank"
  iframe.frameBorder = "0"

  output.innerHTML = ""
  output.appendChild(iframe)

  iframe.contentWindow.document.open()
  iframe.contentWindow.document.write(html(scripts))
  iframe.contentWindow.document.close()
}

const change = () => {
  const dependencies = detective(editor.value)

  execute(editor.value, dependencies)
  renderDependencies(dependencies)
}

change()
editor.addEventListener("keyup", debounce(change, 500))

if ("serviceWorker" in navigator)
  navigator.serviceWorker.register("/service-worker.js")
