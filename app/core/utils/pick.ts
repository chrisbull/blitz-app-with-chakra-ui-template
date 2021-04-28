function pick<T>(obj: T, keys: (keyof T)[]): Pick<T, keyof T> {
  const ret = {} as Pick<T, keyof T>
  keys.forEach((key) => {
    ret[key] = obj[key]
  })
  return ret
}

export default pick
