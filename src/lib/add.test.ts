import { add } from "./add"


test('test add', () => {
  const got = add(1, 1)
  expect(got).toBe(2)
})