async function response(req) {
  const res = await req;
  if (!res) {
    throw new Error('unable to perform the request');
  }

  const data = res.data;
  if (!data) {
    throw new Error('the request returned a bad response');
  }
  if (data.error) {
    throw new Error(data.error);
  }

  return data.data;
}

export { response };
