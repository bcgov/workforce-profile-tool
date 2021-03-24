import strictUriEncode from 'strict-uri-encode'
import decodeComponent from 'decode-uri-component'
import FixTypeLater from '../@types/FixTypeLater'

// Had to import this as I was getting errors upon build
// using the 'query-string' package.

function encoderForArrayFormat(options: FixTypeLater) {
  switch (options.arrayFormat) {
    case 'index':
      return (key: FixTypeLater, value: FixTypeLater, index: FixTypeLater) => {
        return value === null
          ? [encode(key, options), '[', index, ']'].join('')
          : [
              encode(key, options),
              '[',
              encode(index, options),
              ']=',
              encode(value, options),
            ].join('')
      }
    case 'bracket':
      return (key: FixTypeLater, value: FixTypeLater) => {
        return value === null
          ? encode(key, options)
          : [encode(key, options), '[]=', encode(value, options)].join('')
      }
    default:
      return (key: FixTypeLater, value: FixTypeLater) => {
        return value === null
          ? encode(key, options)
          : [encode(key, options), '=', encode(value, options)].join('')
      }
  }
}

function parserForArrayFormat(options: FixTypeLater) {
  let result

  switch (options.arrayFormat) {
    case 'index':
      return (
        key: FixTypeLater,
        value: FixTypeLater,
        accumulator: FixTypeLater
      ) => {
        result = /\[(\d*)\]$/.exec(key)

        key = key.replace(/\[\d*\]$/, '')

        if (!result) {
          accumulator[key] = value
          return
        }

        if (accumulator[key] === undefined) {
          accumulator[key] = {}
        }

        accumulator[key][result[1]] = value
      }
    case 'bracket':
      return (
        key: FixTypeLater,
        value: FixTypeLater,
        accumulator: FixTypeLater
      ) => {
        result = /(\[\])$/.exec(key)
        key = key.replace(/\[\]$/, '')

        if (!result) {
          accumulator[key] = value
          return
        }

        if (accumulator[key] === undefined) {
          accumulator[key] = [value]
          return
        }

        accumulator[key] = [].concat(accumulator[key], value)
      }
    default:
      return (
        key: FixTypeLater,
        value: FixTypeLater,
        accumulator: FixTypeLater
      ) => {
        if (accumulator[key] === undefined) {
          accumulator[key] = value
          return
        }

        accumulator[key] = [].concat(accumulator[key], value)
      }
  }
}

function encode(value: FixTypeLater, options: FixTypeLater): FixTypeLater {
  if (options.encode) {
    return options.strict ? strictUriEncode(value) : encodeURIComponent(value)
  }

  return value
}

function keysSorter(input: FixTypeLater): FixTypeLater {
  if (Array.isArray(input)) {
    return input.sort()
  }

  if (typeof input === 'object') {
    return keysSorter(Object.keys(input))
      .sort((a: FixTypeLater, b: FixTypeLater) => Number(a) - Number(b))
      .map((key: FixTypeLater) => input[key])
  }

  return input
}

function extract(input: FixTypeLater) {
  const queryStart = input.indexOf('?')
  if (queryStart === -1) {
    return ''
  }
  return input.slice(queryStart + 1)
}

function parse(input: FixTypeLater, options: FixTypeLater) {
  options = Object.assign({ arrayFormat: 'none' }, options)

  const formatter = parserForArrayFormat(options)

  // Create an object with no prototype
  const ret = Object.create(null)

  if (typeof input !== 'string') {
    return ret
  }

  input = input.trim().replace(/^[?#&]/, '')

  if (!input) {
    return ret
  }

  for (const param of input.split('&')) {
    const splitParam = param.replace(/\+/g, ' ').split('=')

    const key = splitParam[0]
    let value = splitParam[1]

    // Missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    value = value === undefined ? null : decodeComponent(value)

    formatter(decodeComponent(key), value, ret)
  }

  return Object.keys(ret)
    .sort()
    .reduce((result, key) => {
      const value = ret[key]
      if (
        Boolean(value) &&
        typeof value === 'object' &&
        !Array.isArray(value)
      ) {
        // Sort object keys, not values
        result[key] = keysSorter(value)
      } else {
        result[key] = value
      }

      return result
    }, Object.create(null))
}

const qs: FixTypeLater = {}

qs.extract = extract
qs.parse = parse

qs.stringify = (obj: FixTypeLater, options: FixTypeLater) => {
  const defaults = {
    encode: true,
    strict: true,
    arrayFormat: 'none',
  }

  options = Object.assign(defaults, options)

  if (options.sort === false) {
    options.sort = () => ({})
  }

  const formatter = encoderForArrayFormat(options)

  return obj
    ? Object.keys(obj)
        .sort(options.sort)
        .map((key) => {
          const value = obj[key]

          if (value === undefined) {
            return ''
          }

          if (value === null) {
            return encode(key, options)
          }

          if (Array.isArray(value)) {
            const result = []

            for (const value2 of value.slice()) {
              if (value2 === undefined) {
                continue
              }

              result.push(formatter(key, value2, result.length))
            }

            return result.join('&')
          }

          return encode(key, options) + '=' + encode(value, options)
        })
        .filter((x) => x.length > 0)
        .join('&')
    : ''
}

qs.parseUrl = (input: FixTypeLater, options: FixTypeLater) => {
  return {
    url: input.split('?')[0] || '',
    query: parse(extract(input), options),
  }
}

export default qs
