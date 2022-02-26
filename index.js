const authPoint = async function () {
  return await authService(1).then((res) => {
    return res;
  });
};

const getEndpoint = async function (currPage, pageName) {
  var currPageInfo = pageActions.gatherPageInfo(currPage);
  var pageInfo = pageActions.gatherPageInfo(pageName);
  var loginPageInfo = pageActions.gatherPageInfo("login");
  var errorPageInfo = pageActions.gatherPageInfo("404");
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
