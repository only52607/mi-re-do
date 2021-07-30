/*
 * @Author: ooooonly
 * @LastEditors: ooooonly
 * @Description: 其他工具
 * @Date: 2021-01-31 10:25:17
 * @LastEditTime: 2021-02-25 10:51:19
 */
export const sleep = (timeountMS: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeountMS);
  });
