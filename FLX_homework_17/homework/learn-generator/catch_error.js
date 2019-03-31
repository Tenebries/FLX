function *upper (items) {
  for (let i = 0; i < items.length; i++) {
    if (typeof items[i] !== 'string') {
      yield null;
    } else {
      yield items[i].toUpperCase();
    }
  }
// good
//  for (var item of items) {
//         try {
//           yield item.toUpperCase();
//         } catch (e) {
//           yield null;
//         }
//       }
}

var bad_items = ['a', 'B', 1, 'c'];

for (var item of upper(bad_items)) {
  console.log(item);
}
