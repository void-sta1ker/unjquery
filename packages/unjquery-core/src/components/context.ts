export interface Context {
  noConflict: boolean; // compile time
  readyException: () => void; // runtime
}

export default {};
