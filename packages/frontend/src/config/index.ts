/**
 * @description 3个子配置，通用配置|主题配置|网络配置，建议在当前目录下修改config.js修改配置，会覆盖默认配置，也可以直接修改默认配置
 */
//默认配置
import { general, theme, network } from './default'
//自定义配置
import customize from './customize.config'
//导出配置（以自定义配置为主）
export default Object.assign({}, general, theme, network, customize)