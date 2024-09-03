namespace ValidationModule {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
}
