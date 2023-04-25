import { System } from './class.js';

const system = new System({ name: 'system-reserved' });

const getEndpoint = async function (_api, currPage, pageName) {
  var current = _api.gatherPageInfo(currPage);
  var pageInfo = _api.gatherPageInfo(pageName);
  var loginPage = _api.gatherPageInfo('login');
  var errorPage = _api.gatherPageInfo('404');
  let excludes = _api.system.getExclusion('public');
  let userAuth = await _api.system.data.authentication(1);

  let errorCheck = typeof current != 'undefined' ? current : errorPage;
  let route = { route: pageName, routeInformation: pageInfo, sourceRouteInformation: current, authentication: userAuth };
  let errorRoute = { route: '404', routeInformation: errorPage, sourceRouteInformation: errorCheck, authentication: userAuth };
  let loginRoute = { route: 'login', routeInformation: loginPage, sourceRouteInformation: current, authentication: userAuth };

  console.log('router userAuth', userAuth);

  if (typeof pageInfo == 'undefined') return errorRoute;
  if (excludes.includes(pageName)) return route;
  if (localStorage.getItem('user') == null) return loginRoute;
  if (localStorage.getItem('user') != null && userAuth.accessToken == false) {
    _api.system.logout(1);
    return loginRoute;
  }
  if (localStorage.getItem('user') != null && userAuth.accessToken != false) return route;
};

export { getEndpoint };
