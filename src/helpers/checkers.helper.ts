

function checkURL (url: string): boolean {
  if(url.includes('/api/users')) return true;
  return false;
}

export {checkURL}