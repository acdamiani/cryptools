export type TupleToObject<T extends any[]> = {
  [K in keyof T as Exclude<K, keyof any[]>]: T[K];
};

export type TupleToObjectWithProps<
  T extends any[],
  N extends Record<keyof TupleToObject<T>, PropertyKey>,
> = { [K in keyof TupleToObject<T> as N[K]]: T[K] };

export type NamedConstructorParameters<
  T extends abstract new (...args: any) => any,
  N extends Record<keyof TupleToObject<ConstructorParameters<T>>, PropertyKey>,
> = TupleToObjectWithProps<ConstructorParameters<T>, N>;

export default class TestUtil {
  static preview(message: string): string {
    if (message === ``) {
      return `<empty string>`;
    }

    return message.length > 32 ? message.substring(0, 32) + `...` : message;
  }
}
