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

  async get(object) {
    this.get = object;
  }

  use(module) {
    let __info = module.whoami();
    this.config[__info.name] = module;
  }
}
