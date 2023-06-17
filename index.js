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
    let { accessToken, route, ...rest } = await this.preroute();
    Object.assign(this.current, { authentication: { accessToken: accessToken, ...rest } });

    try {
      if (this.config['404']) await this.errorroute(pageName);
    } catch (e) {
      let erroroute = JSON.parse(e.message);
      Object.assign(this.current, { route: erroroute?.endpoint, sourceRouteInformation: currPage, routeInformation: erroroute });
      return this.current;
    }

    Object.assign(this.current, { route: pageName?.endpoint, sourceRouteInformation: currPage, routeInformation: !accessToken ? route : pageName });
    return this.current;
  }
}
