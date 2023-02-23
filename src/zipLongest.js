function* zipLongest(...iterables) {
  const fillValue = '';
  const iterators = iterables.map(iterable => iterable[Symbol.iterator]());
  while (true) {
    const nextValues = iterators.map(iterator => iterator.next());
    if (nextValues.every(({ done }) => done)) {
      break;
    }
    const zippedValues = nextValues.map(({ value, done }) =>
      done ? fillValue : value
    );
    yield zippedValues;
  }
}

module.exports = zipLongest
