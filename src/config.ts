import {Config} from './types'
import {logger} from './util/logger'

let config: Config = {
  fuzzyMatch: true,
  keywordsRegex: /[\w-_$]{2,}/gi,
  noTrace: false,
  timeout: 300,
  sources: ['buffer', 'dictionary', 'path'],
}

export function setConfig(opts: {[index: string]: any}):void {
  let keys = ['fuzzyMatch', 'noTrace']
  for (let key of keys) {
    let val = opts[key]
    if (val != null) {
      config[key] = !!val
    }
  }
  if (opts.timeout) {
    config.timeout = parseInt(opts.timeout, 10)
  }
  let regex = opts.keywordsRegex
  if (regex && typeof regex === 'string') {
    config.keywordsRegex = new RegExp(regex, 'gi')
  }
  if (opts.sources && Array.isArray(opts.sources)) {
    config.sources = opts.sources
  }
  logger.debug(`config:${JSON.stringify(opts)}`)
}

export function getConfig(name: string):any {
  return config[name]
}
