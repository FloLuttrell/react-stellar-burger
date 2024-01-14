export const request = async (url, options) => {
  const resp = await fetch(url, options)
  if (!resp.ok) {
    throw new Error(`Ошибка ${resp.status}`)
  }
  return resp.json()
}