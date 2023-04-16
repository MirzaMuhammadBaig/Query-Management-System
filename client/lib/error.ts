export function myError({ error }: any) {
  if (error.response.status === 400) return alert(error.response.data.msg)
  if (error.response.status === 500) return alert(error.response.data.error)
}
