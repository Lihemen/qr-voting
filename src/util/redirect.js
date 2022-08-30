import { history } from './history';

function delayedRedirect(delay, path) {
  return setTimeout(() => {
    history.push(path);
    history.go(0);
  }, 3000);
}

export { delayedRedirect };
