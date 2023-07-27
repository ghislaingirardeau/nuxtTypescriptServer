export function* useFibonacci(): Generator {
  let prem = 0;
  let sec = 1;
  yield prem;

  while (true) {
    let newvalue = prem + sec;
    yield newvalue;
    prem = sec;
    sec = newvalue;
  }
}

export async function* useAsyncGenerator() {
  var i = 0;
  while (i < 5) {
    yield i++;
  }
}

export function* generator() {
  yield "INIT";
  yield "START";
  yield "STOP";
}
