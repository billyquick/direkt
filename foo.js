const g = function () {
  throw new Error('foo');
}

function f () {
  throw new Error('bar');
}
f()


