export default class Router {
  constructor(data) {
    this.config = { ...data };
    this.name = 'katharos-router';
  }

  preRoute(object) {
    this.preroute = object;
  }

  errorRoute(object) {
    this.errorroute = object;
  }

  async get(currPage, pageName) {
    this.current = {};
    let { accessToken, route, ...rest } = await this.preroute(pageName);
    let authentication = { accessToken: accessToken, route, ...rest };

    Object.assign(this.current, { authentication: authentication });

    try {
      if (this.config['404']) await this.errorroute(pageName);
    } catch (e) {
      let erroroute = JSON.parse(e.message);
      Object.assign(this.current, { route: erroroute?.endpoint, sourceRouteInformation: currPage, routeInformation: erroroute });
      return this.current;
    }

    let routerRoute = !accessToken ? route.endpoint : pageName?.endpoint != route ? route : pageName?.endpoint;
    let routerRouteInformation = !accessToken ? route : pageName?.endpoint != route ? rest.view : pageName;

    let destination = { route: routerRoute, sourceRouteInformation: currPage, routeInformation: routerRouteInformation };
    Object.assign(this.current, destination);
    return this.current;
  }
}
