// -----------------
// TYPE
// -----------------

// ALIAS TO DEFINE SO CAN BE RESUSE
type User1 = { name: string; age: number; date?: number }; // date on optionnal

type LockStates = "locked" | "unlocked";
const lockStates: LockStates = "unlocked";

type NumberArray = Array<string>;
const arr3: NumberArray = ["test", "3"];

const arr1: string[] = ["test", "3"];
