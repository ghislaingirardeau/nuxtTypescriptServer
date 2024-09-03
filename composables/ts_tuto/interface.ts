// -----------------
// INTERFACE
// -----------------

// Basic usage
interface User {
  lastName: string;
  id?: number; // id est alors facultatif
}
interface User {
  age: number;
}
// OU avec EXTEND
interface UserExtend extends User {
  firstName: string;
}

export function interfaceMerge() {
  let user: User = {
    lastName: "Simpson",
    age: 45,
  };
  console.log(user);

  let userExtend: UserExtend = {
    firstName: "Homer",
    lastName: "Simpson",
    age: 45,
  };
  console.log(userExtend);
}

// Définir une methode dans une interface
interface Cloner {
  clone(animal: String): String;
}

export function interfaceMethod() {
  let animal: Cloner = {
    clone(s) {
      return s;
    },
  };
  console.log(animal.clone("cat"));
}

// DYNAMIC TYPE INSIDE INTERFACE

interface Backpack<Type> {
  name: Type;
  list: Type[];
  add: (obj: Type) => void;
  get: () => Type;
}

export function interfaceDynamic() {
  const backpack: Backpack<string> = {
    name: "millet",
    list: [],
    add(obj) {
      this.list.push(obj);
    },
    get() {
      return "dans le sac " + this.name + " , j'ai une " + this.list[0]; // return string
    },
  };
  console.log(backpack.add("chaussure"));
  console.log(backpack.get());
}
