import { System } from './class';

const system = new System({
  name: 'system-reserved'
});


const authPoint = async function () {
  return await authService(1).then((res) => {
    return res;
  });
};

const getEndpoint = async function (_api, currPage, pageName) {
  var currPageInfo = _api.gatherPageInfo(currPage);
  var pageInfo = _api.gatherPageInfo(pageName);
  var loginPageInfo = _api.gatherPageInfo("login");
  var errorPageInfo = _api.gatherPageInfo("404");
  let userAuth = await authPoint();

  if (localStorage.getItem("user") == null) {
    return {
      route: "login",
      routeInformation: loginPageInfo,
      sourceRouteInformation: currPageInfo,
      authentication: userAuth,
    };
  }

  if (localStorage.getItem("user") != null && userAuth.accessToken == false) {
    store.logout(1);
    return {
      route: "login",
      routeInformation: loginPageInfo,
      sourceRouteInformation: currPageInfo,
      authentication: userAuth,
    };
  }

  if (typeof pageInfo == "undefined") {
    return {
      route: "404",
      routeInformation: errorPageInfo,
      sourceRouteInformation:
        typeof currPageInfo != "undefined" ? currPageInfo : errorPageInfo,
      authentication: userAuth,
    };
  }

  if (localStorage.getItem("user") != null && userAuth.accessToken != false) {
    return {
      route: pageName,
      routeInformation: pageInfo,
      sourceRouteInformation: currPageInfo,
      authentication: userAuth,
    };
  }
};

export { getEndpoint };
