export function readFile(file) {
  return new Promise((resolve) => {
    const fr = new FileReader();
    fr.addEventListener('loadend', () => resolve(fr.result));
    fr.readAsText(file);
  })
}
