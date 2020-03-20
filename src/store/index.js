import { decorate } from "mobx";

class Store {
  constructor() {}
}
decorate(Store, {});

export const appStore = new Store();
