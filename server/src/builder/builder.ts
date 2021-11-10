interface ConstructorType<T> {
  new (): T;
}
export class BuilderCommon<T> {
  public object: T;
  constructor(ctor: ConstructorType<T>) {
    this.object = new ctor();
  }
  build(): T {
    return this.object;
  }
}
