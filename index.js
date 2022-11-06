import { System } from "./class.js";

const system = new System({
  name: "system-reserved",
});

const getEndpoint = async function (_api, currPage, pageName) {
  var currPageInfo = _api.gatherPageInfo(currPage);
  var pageInfo = _api.gatherPageInfo(pageName);
  var loginPageInfo = _api.gatherPageInfo("login");
  var errorPageInfo = _api.gatherPageInfo("404");
  let userAuth = await _api.system.data.authentication(1);
  let excludes = ["eula", "account_verify", "forgot_password"];

  if (typeof pageInfo == "undefined") {
    return {
      route: "404",
      routeInformation: errorPageInfo,
      sourceRouteInformation: typeof currPageInfo != "undefined" ? currPageInfo : errorPageInfo,
      authentication: userAuth,
    };
  }

  if (excludes.includes(pageName)) {
    return {
      route: pageName,
      routeInformation: pageInfo,
      sourceRouteInformation: currPageInfo,
      authentication: userAuth,
    };
  }

  if (localStorage.getItem("user") == null) {
    return {
      route: "login",
      routeInformation: loginPageInfo,
      sourceRouteInformation: currPageInfo,
      authentication: userAuth,
    };
  }

  if (localStorage.getItem("user") != null && userAuth.accessToken == false) {
    _api.system.logout(1);
    return {
      route: "login",
      routeInformation: loginPageInfo,
      sourceRouteInformation: currPageInfo,
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
