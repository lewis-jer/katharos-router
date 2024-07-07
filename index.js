export default class Router {
  constructor(data) {
    this.config = { ...data };
    this.name = 'katharos-router';
  }

  _SSR_gather(object) {
    this._SSR_gather = object;
  }

  authentication(object) {
    this.authentication = object;
  }

  preRoute(object) {
    this.preroute = object;
  }

  errorRoute(object) {
    this.errorroute = object;
  }

  async get(currPage, pageName) {
    this.source = currPage;
    this.destination = pageName;

    this.current = {};
    let { accessToken, authenicatedView, sourceView, route, ...rest } = await this.preroute(pageName);
    let authentication = { accessToken: accessToken, route, ...rest };

    Object.assign(this.current, { authentication: authentication });

    try {
      if (this.config['404']) await this.errorroute(authenicatedView);
    } catch (e) {
      let erroroute = JSON.parse(e.message);
      Object.assign(this.current, { route: erroroute?.endpoint, sourceRouteInformation: sourceView, routeInformation: erroroute });
      return this.current;
    }

    let routerRoute = !accessToken ? route.endpoint : authenicatedView?.endpoint != route ? route : authenicatedView?.endpoint;
    let routerRouteInformation = !accessToken ? route : authenicatedView?.endpoint != route ? rest.view : authenicatedView;

    let destination = { route: routerRoute, sourceRouteInformation: sourceView, routeInformation: routerRouteInformation };
    Object.assign(this.current, destination);
    return this.current;
  }

  use(module) {
    let __info = module.whoami();
    this.config[__info.name] = module;
  }
}
