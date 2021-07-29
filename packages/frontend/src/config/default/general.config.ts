/**
 * @description 导出默认通用配置
 */
export const general = {
  baseURL: import.meta.env.NODE_ENV === 'development' ? 'mock-server' : 'mock-server',
  title: 'LOGO',
  shortTitle: 'LOGO',
  titleSeparator: ' - ',
  titleReverse: false,
  version: import.meta.env.VUE_APP_VERSION,
  copyright: 'copyright',
}