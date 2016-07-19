# 简介
Converter.js 是一个适用于低版本的浏览器编码/解码库。提供 Base16/Base32/Base64/MD5/SHA-1 这几个
编码/解码以及哈希计算的函数。

**支持中文编码和解码！**

# 引用
- 直接引用： `<script src="./converter.js"></script>`
- 通过 AMD 加载器引用：`require(["converter"], function( converter ) { "your code here!" })` 
- 通过 npm 安装： `npm install guless-converter`
- 通过 bower 安装：`bower install guless-converter`

# 示例用法
- **Base16** 编码/解码: `encode(jsString, "base16")` / `decode(base16String, "base16")`
- **Base32** 编码/解码: `encode(jsString, "base32")` / `decode(base32String, "base32")`
- **Base64** 编码/解码: `encode(jsString, "base64")` / `decode(base64String, "base64")`
- **md5** 消息摘要：`md5(jsString)`
- **sha1** 安全哈希值：`sha1(jsString)`

# API Reference
### encode( string, codec )
将给定的字符串编码成指定格式的数据。

**Params:**
- {String} string 指定需要编码的字符串。
- {String} codec 指定编码类型，可以是以下常量中的一个（不区分大小写）：
  * `base16` | `hex`
  * `base32`
  * `base32-hex` | `base32hex`
  * `base64`
  * `base64-urlsafe` | `base64urlsafe` | `base64-url` | `base64url`

**Returns:**
- {String} 返回编码后的数据的字符串表示形式。

### decode( string, codec )
将给定的字符串解码成指定格式的数据。

**Params:**
- {String} string 指定需要解码的字符串。
- {String} codec 指定编码类型，可以是以下常量中的一个（不区分大小写）：
  * `base16` | `hex`
  * `base32`
  * `base32-hex` | `base32hex`
  * `base64`
  * `base64-urlsafe` | `base64urlsafe` | `base64-url` | `base64url`

**Returns:**
- {String} 返回解码后的数据的字符串表示形式。


### md5( string )
计算给定字符串的 MD5 哈希值。

**Params:**
- {String} string 指定需要计算哈希值的字符串。

**Returns:**
- {String} 返回 base16(hex) 编码过的 MD5 哈希值。

### sha1( string )

**Params:**
- {String} string 指定需要计算哈希值的字符串。

**Returns:**
- {String} 返回 base16(hex) 编码过的 SHA-1 哈希值。