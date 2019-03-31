function *flat (arr) {
  if(Array.isArray(arr)){
    for (let item of arr){
      yield *flat(item);
    }
  } else {
    yield arr;
  }
}

let A = [1, [2, [3, 4], 5], 6];
for (let f of flat(A)) {
  console.log(f);
}
