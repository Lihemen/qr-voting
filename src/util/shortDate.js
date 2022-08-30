const shortDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-UK', {
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
  });
};

export { shortDate };
