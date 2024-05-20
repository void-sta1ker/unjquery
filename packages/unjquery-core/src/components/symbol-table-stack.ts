interface ISymbolTable<K, V extends Record<string, V[keyof V]>> {
  allocate: () => void;
  free: () => void;
  lookup: (symbol: K) => V | undefined;
  insert: (symbol: K, value: V) => V | undefined;

  getAttribute: (symbol: K, attribute: keyof V) => V[keyof V] | undefined;
  setAttribute: (
    symbol: K,
    attribute: keyof V,
    value: V[keyof V],
  ) => V[keyof V] | undefined;
}

type Key = string; // symbol?
type Value = { type: "symbol" | "jquery-instance"; value: string };

class SymbolTableStack<K = Key, V extends Record<string, V[keyof V]> = Value>
  implements ISymbolTable<K, V>
{
  private table: Map<K, V>;
  private stack: [Map<K, V>, ...Array<Map<K, V>>];

  constructor() {
    this.table = new Map<K, V>();
    this.stack = [this.table];
  }

  allocate() {
    this.stack.push(new Map<K, V>());
  }

  free() {
    if (this.stack.length > 1) {
      this.stack.pop();
    }
  }

  lookup(symbol: K) {
    return findRight(this.stack, (table) => table.has(symbol))?.get(symbol);
  }

  insert(symbol: K, value: V) {
    this.stack.at(-1)?.set(symbol, value);
    return this.stack.at(-1)?.get(symbol);
  }

  setAttribute(symbol: K, attribute: keyof V, value: V[keyof V]) {
    const entry = findRight(this.stack, (table) => table.has(symbol))?.get(
      symbol,
    );

    if (entry) {
      entry[attribute] = value;
      return value;
    }
  }

  getAttribute(symbol: K, attribute: keyof V) {
    const entry = findRight(this.stack, (table) => table.has(symbol))?.get(
      symbol,
    );

    if (entry) {
      return entry[attribute];
    }
  }
}

export default SymbolTableStack;

function findRight<T>(arr: T[], predicate: (item: T) => boolean) {
  let item;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i])) {
      item = arr[i];
    }
  }

  return item;
}
