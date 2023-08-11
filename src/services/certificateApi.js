
export async function getCertificate(token) {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/certificate`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return response;
}
