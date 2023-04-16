export function myError({ error }: any) {
  return alert(error.response.data.error);
}
