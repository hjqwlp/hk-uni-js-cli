/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: huangli
 * @Date: 2022-02-14 14:13:36
 * @LastEditors: huangli
 * @LastEditTime: 2022-02-15 10:02:37
 */
module.exports = {
  printWidth: 80, // 每行代码长度（默认80）
  tabWidth: 2, // 每个tab相当于多少个空格（默认2）
  useTabs: false, // 是否使用tab进行缩进（默认false）
  singleQuote: true, // 使用单引号（默认false）
  semi: true, // 声明结尾使用分号(默认true)
  trailingComma: 'all', // none - 无尾逗号 es5 - 添加es5中被支持的尾逗号 all - 所有可能的地方都被添加尾逗号 (默认es5)
  bracketSpacing: true, // 对象字面量的大括号间使用空格（默认true）
  jsxBracketSameLine: false, // 多行JSX中的>放置在最后一行的结尾，而不是另起一行（默认false）
  arrowParens: 'always', //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号（默认avoid）
  htmlWhitespaceSensitivity: 'ignore', // 为 HTML 文件定义全局空格敏感度
  endOfLine: 'auto',

  vueIndentScriptAndStyle: true, // true - 缩进Vue文件中的脚本和样式标签 （默认false ）
  quoteProps: 'as-needed', // “as-needed” - 仅在需要时在对象属性周围添加引号  （默认as-needed ）
  insertPragma: false, // 在文件的顶部插入一个 @format的特殊注释，以表明改文件已经被Prettier格式化过了(默认false ）
  requirePragma: false, // 严格按照文件顶部的一些特殊的注释格式化代码(默认false ）
  proseWrap: 'never', // never " - 不折行 " perserve " - 按照文件原样折行 （v1.9.0+） (默认perserve  ）
  overrides: [
    {
      files: '*.md',
      options: {
        tabWidth: 2,
      },
    },
  ],
};
