/// <reference path="./validation.ts" />
export namespace ValidationModule {
  const lettersRegexp = /^[A-Za-z]+$/;
  // @ts-ignore: Unreachable code error
  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s);
    }
  }
}

// namespace permet de communiquer entre les fichiers ts sans avoir besoin d'export
// je dois passer le chemin de référence au fichier

// ICI export, car je veux utiliser dans le fichier vue typescript lorsque j'ai terminé le namespace
