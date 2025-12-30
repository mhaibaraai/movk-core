/**
 * 查询参数值类型
 */
export type QueryParamValue = string | number | boolean | null | undefined

/**
 * 查询参数对象类型
 */
export type QueryParams = Record<string, QueryParamValue | QueryParamValue[]>
