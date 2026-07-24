type AnyFn = (...args: any[]) => any

/**
 * 从左到右组合函数：前一个的返回值作为后一个的入参
 *
 * 首个函数可接收多个参数，其后逐个单参串联。超过 8 个函数时类型退化为同签名
 * 变参形态，运行时行为不变；未传入任何函数时返回恒等函数。
 *
 * @category Function
 * @param fn1 起始函数，其后每个函数依次接收上一个的返回值
 * @returns 组合后的函数
 * @example
 * ```ts
 * const parse = pipe(
 *   (v: string) => v.trim(),
 *   (v: string) => Number(v),
 *   (v: number) => Math.round(v),
 * )
 * parse('  4.6 ') // 5
 * ```
 * @example
 * ```ts
 * // 同签名场景：把多个互不相干的 reducer 合成一条链
 * const chained = pipe(highlight, fade, filter)
 * chained(attrs)
 * ```
 */
export function pipe<A extends readonly unknown[], R1>(
  fn1: (...args: A) => R1,
): (...args: A) => R1
export function pipe<A extends readonly unknown[], R1, R2>(
  fn1: (...args: A) => R1,
  fn2: (value: R1) => R2,
): (...args: A) => R2
export function pipe<A extends readonly unknown[], R1, R2, R3>(
  fn1: (...args: A) => R1,
  fn2: (value: R1) => R2,
  fn3: (value: R2) => R3,
): (...args: A) => R3
export function pipe<A extends readonly unknown[], R1, R2, R3, R4>(
  fn1: (...args: A) => R1,
  fn2: (value: R1) => R2,
  fn3: (value: R2) => R3,
  fn4: (value: R3) => R4,
): (...args: A) => R4
export function pipe<A extends readonly unknown[], R1, R2, R3, R4, R5>(
  fn1: (...args: A) => R1,
  fn2: (value: R1) => R2,
  fn3: (value: R2) => R3,
  fn4: (value: R3) => R4,
  fn5: (value: R4) => R5,
): (...args: A) => R5
export function pipe<A extends readonly unknown[], R1, R2, R3, R4, R5, R6>(
  fn1: (...args: A) => R1,
  fn2: (value: R1) => R2,
  fn3: (value: R2) => R3,
  fn4: (value: R3) => R4,
  fn5: (value: R4) => R5,
  fn6: (value: R5) => R6,
): (...args: A) => R6
export function pipe<A extends readonly unknown[], R1, R2, R3, R4, R5, R6, R7>(
  fn1: (...args: A) => R1,
  fn2: (value: R1) => R2,
  fn3: (value: R2) => R3,
  fn4: (value: R3) => R4,
  fn5: (value: R4) => R5,
  fn6: (value: R5) => R6,
  fn7: (value: R6) => R7,
): (...args: A) => R7
export function pipe<A extends readonly unknown[], R1, R2, R3, R4, R5, R6, R7, R8>(
  fn1: (...args: A) => R1,
  fn2: (value: R1) => R2,
  fn3: (value: R2) => R3,
  fn4: (value: R3) => R4,
  fn5: (value: R4) => R5,
  fn6: (value: R5) => R6,
  fn7: (value: R6) => R7,
  fn8: (value: R7) => R8,
): (...args: A) => R8
export function pipe(): <T>(value: T) => T
export function pipe<T>(...fns: Array<(value: T) => T>): (value: T) => T
export function pipe(...fns: AnyFn[]): AnyFn {
  return (...args: any[]) => {
    const [first, ...rest] = fns
    if (!first) return args[0]
    return rest.reduce((value, fn) => fn(value), first(...args))
  }
}
