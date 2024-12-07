declare global {
  namespace NodeJS {
    interface Global {
      mongoose?: { conn: null | any; promise: null | Promise<any> };
    }
  }
}

export {};
