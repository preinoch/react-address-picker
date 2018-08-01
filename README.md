# react-address-picker

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

基于react的地址选择器

## 演示地址

## props

- getChildren - 获取下一级地址数据的方法，应该返回一个promise，resolve的值是地址信息数组。
- active - 指定一个布尔值控制是否打开选择器
- address - 指定一个数组为所选的地址
- onAddressChange - 订阅一个地址变更事件


## 位置数据来源

[腾讯位置服务](URL 'http://lbs.qq.com/webservice_v1/index.html')

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
