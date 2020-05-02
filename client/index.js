const editor = document.getElementById("editor")
const editor = document.getElementById("editor")

const debounce = (fn, ms) => {
  let timeout
  return (...args) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), ms)
  }
}

const change = () => {
  eval(editor.value)
}

change()
editor.addEventListener("keyup", debounce(change, 500))
