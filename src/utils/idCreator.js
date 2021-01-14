/**
 * 生成有序的 ID
 */
import Hashids from 'hashids'

const factor = 1000

const hashids = new Hashids()
/*
 * ID 生成
 *
 * 以秒毫为单位, 13 位 + 1000以内的随机数
 */
export function createId() {
  return new Date() * factor + Math.floor(Math.random() * factor * factor)
}

/*
 * ID 编码
 *
 * 把数字 ID 编码为字符类型
 */
export function encodeId(id) {
  return hashids.encode(id)
}

/*
 * ID 解码
 *
 * 把字符串解码为数字 ID
 */
export function decodeId(code) {
  return hashids.decode(code)
}
