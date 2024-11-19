export default function hasValuesFromArray(set, array) {
  return array.every((Element) => set.has(Element));
}
