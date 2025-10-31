/**
 * 目标：基于 ECMAScript 标准语法，"命名"导入，工具属性和方法使用
 */
// 命名导入
import { baseURL, getArraySum } from "./utils.js";
const result = getArraySum([20, 20, 30])
console.log(result);
console.log(baseURL);

