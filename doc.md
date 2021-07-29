# 网页版微信拍一拍模拟实现

## 特点

纯HTML5原生实现

## 功能

- 支持双击拍一拍并区分用户
- 10秒多次拍一拍提示撤回

## 部署

- `src`目录为`html`、`js`、`css`各自独立文件的源码
- `dist`目录为`js`和`css`压缩后的版本
- `index.dom.html`为`HTML`保留源码格式，用于查看`DOM`基本结构，`js`和`css`为压缩后的版本
- `index.html`用于被`github pages`服务识别为默认可展示的静态文件(没有`readme.md`、`README.md`后会默认读取`index.html`)