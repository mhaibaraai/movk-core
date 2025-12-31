import { describe, expect, it } from 'vitest'
import {
  camelCase,
  capitalize,
  kebabCase,
  lowerCase,
  lowerFirst,
  pascalCase,
  snakeCase,
  startCase,
  upperCase,
  upperFirst,
} from '../../../src/transformers/string'

describe('大小写转换', () => {
  it('startCase 转换', () => {
    expect(startCase('firstName')).toBe('First Name')
    expect(startCase('first_name')).toBe('First Name')
    expect(startCase('first-name')).toBe('First Name')
    expect(startCase('first name')).toBe('First Name')
    expect(startCase('XMLHttpRequest')).toBe('XML Http Request')
    expect(startCase('')).toBe('')
  })

  it('camelCase 转换', () => {
    expect(camelCase('First Name')).toBe('firstName')
    expect(camelCase('first_name')).toBe('firstName')
    expect(camelCase('first-name')).toBe('firstName')
    expect(camelCase('XMLHttpRequest')).toBe('xmlHttpRequest')
    expect(camelCase('')).toBe('')
  })

  it('kebabCase 转换', () => {
    expect(kebabCase('firstName')).toBe('first-name')
    expect(kebabCase('First Name')).toBe('first-name')
    expect(kebabCase('first_name')).toBe('first-name')
    expect(kebabCase('XMLHttpRequest')).toBe('xml-http-request')
    expect(kebabCase('')).toBe('')
  })

  it('snakeCase 转换', () => {
    expect(snakeCase('firstName')).toBe('first_name')
    expect(snakeCase('First Name')).toBe('first_name')
    expect(snakeCase('first-name')).toBe('first_name')
    expect(snakeCase('XMLHttpRequest')).toBe('xml_http_request')
    expect(snakeCase('')).toBe('')
  })

  it('pascalCase 转换', () => {
    expect(pascalCase('firstName')).toBe('FirstName')
    expect(pascalCase('first_name')).toBe('FirstName')
    expect(pascalCase('first-name')).toBe('FirstName')
    expect(pascalCase('XMLHttpRequest')).toBe('XmlHttpRequest')
    expect(pascalCase('')).toBe('')
  })

  it('capitalize 转换', () => {
    expect(capitalize('hello')).toBe('Hello')
    expect(capitalize('HELLO')).toBe('Hello')
    expect(capitalize('hello world')).toBe('Hello world')
    expect(capitalize('')).toBe('')
  })

  it('upperFirst 转换', () => {
    expect(upperFirst('hello')).toBe('Hello')
    expect(upperFirst('hELLO')).toBe('HELLO')
    expect(upperFirst('hello world')).toBe('Hello world')
    expect(upperFirst('')).toBe('')
  })

  it('lowerFirst 转换', () => {
    expect(lowerFirst('Hello')).toBe('hello')
    expect(lowerFirst('HELLO')).toBe('hELLO')
    expect(lowerFirst('Hello World')).toBe('hello World')
    expect(lowerFirst('')).toBe('')
  })

  it('upperCase 转换', () => {
    expect(upperCase('firstName')).toBe('FIRST NAME')
    expect(upperCase('first_name')).toBe('FIRST NAME')
    expect(upperCase('first-name')).toBe('FIRST NAME')
    expect(upperCase('XMLHttpRequest')).toBe('XML HTTP REQUEST')
    expect(upperCase('')).toBe('')
  })

  it('lowerCase 转换', () => {
    expect(lowerCase('firstName')).toBe('first name')
    expect(lowerCase('First_Name')).toBe('first name')
    expect(lowerCase('FIRST-NAME')).toBe('first name')
    expect(lowerCase('XMLHttpRequest')).toBe('xml http request')
    expect(lowerCase('')).toBe('')
  })
})
