export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.style.display = 'none'
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}
