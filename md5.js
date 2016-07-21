/// #!/usr/bin/env node
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2016 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 1.0.0 | http://apidev.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
///                                              }|
///                                              }|
///                                              }|     　 へ　　　 ／|    
///      _______     _______         ______      }|      /　│　　 ／ ／
///     /  ___  |   |_   __ \      .' ____ '.    }|     │　Z ＿,＜　／　　 /`ヽ
///    |  (__ \_|     | |__) |     | (____) |    }|     │　　　　　ヽ　　 /　　〉
///     '.___`-.      |  __ /      '_.____. |    }|      Y　　　　　`　 /　　/
///    |`\____) |    _| |  \ \_    | \____| |    }|    ｲ●　､　●　　⊂⊃〈　　/
///    |_______.'   |____| |___|    \______,'    }|    ()　 v　　　　|　＼〈
///    |=========================================\|    　>ｰ ､_　 ィ　 │ ／／
///    |> LESS IS MORE                           ||     / へ　　 /　ﾉ＜|＼＼
///    `=========================================/|    ヽ_ﾉ　　(_／　 │／／
///                                              }|     7　　　　　　  |／
///                                              }|     ＞―r￣￣`ｰ―＿`
///                                              }|
///                                              }|
/// Permission is hereby granted, free of charge, to any person obtaining a copy
/// of this software and associated documentation files (the "Software"), to deal
/// in the Software without restriction, including without limitation the rights
/// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
/// copies of the Software, and to permit persons to whom the Software is
/// furnished to do so, subject to the following conditions:
///
/// The above copyright notice and this permission notice shall be included in all
/// copies or substantial portions of the Software.
///
/// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
/// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
/// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
/// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
/// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
/// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
/// THE SOFTWARE.
/// ==============================================================================
/*< ENTRY >*/ (function( domain, undefined ) { "use strict";
/// ==============================================================================
/// UTF-8 数据编码。
function utf8( input ) {
    /// 提前计算用于保存编码结果所需的数组长度。
    var size = 0;
    var char = 0;
    
    for ( var start = 0; start < input.length; ++start ) {
        char  = input.charCodeAt(start);
        size += (char >= 0xD800)  && (char <= 0xDBFF) ? (++start >= input.length ? 0 : 4) : (char <= 0x7F) ? 1 : (char <= 0x7FF ? 2 : 3);
    }
    
    /// 开始编码 UTF-8 字符串。
    var output = new Array(size);
    for ( var start = 0, offset = 0; start < input.length; ++start ) {
        char  = input.charCodeAt(start);
        
        if ( (char >= 0xDC00) && (char <= 0xDFFF) ) {
            throw new Error("Encounter an unpaired surrogate. [char=" + char + "]");
        }
        
        if ( (char >= 0xD800) && (char <= 0xDBFF) ) {
            if ( ++start >= input.length ) {
                throw new Error("Encounter an unpaired surrogate. [char=" + char + "]");
            }
            
            var tail = input.charCodeAt(start);
            
            if ( (tail < 0xDC00) || (tail > 0xDFFF) ) {
                throw new Error("Encounter an unpaired surrogate. [char=" + char + ", tail=" + tail + "]");
            }
            
            char = ((char & 0x3FF) << 10 | (tail & 0x3FF)) + 0x10000;
        }
        
        if ( char <= 0x7F ) {
            output[offset++] = (char);
        }

        else if ( char <= 0x7FF ) {
            output[offset++] = ((char >>>  6) + 0xC0);
            output[offset++] = ((char & 0x3F) + 0x80);
        }

        else if ( char <= 0xFFFF ) {
            output[offset++] = ((char  >>> 12) + 0xE0);
            output[offset++] = (((char >>>  6) & 0x3F) + 0x80);
            output[offset++] = ((char  & 0x3F) + 0x80);
        }

        else {
            output[offset++] = ((char  >>> 18) + 0xF0);
            output[offset++] = (((char >>> 12) & 0x3F) + 0x80);
            output[offset++] = (((char >>>  6) & 0x3F) + 0x80);
            output[offset++] = ((char  & 0x3F) + 0x80);
        }
    }
    
    return output;
}

/**
 * 计算给定字符串的 MD5 哈希值。
 * 
 * @param {String} string - 指定需要计算哈希值的字符串。
 * @returns {String} - 返回指定编码的 MD5 哈希值。
 */
function md5( string ) {
    var digest = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476];
    var length = [0, 0];
    var bytes  = utf8(string);
    var remain = bytes.length % 64;
    
    MD5_AC(length, bytes.length);
    MD5_transfrom(bytes, digest);
    
    for ( var i = 0; i < P.length; ++i ) {
        P[i] = (i < remain ? bytes[bytes.length - remain + i] : i == remain ? 0x80 : 0);
    }
    
    if ( remain < 56 ) {
        P[56] = (length[0]       ) & 0xFF;
        P[57] = (length[0] >>>  8) & 0xFF;
        P[58] = (length[0] >>> 16) & 0xFF;
        P[59] = (length[0] >>> 24) & 0xFF;
        P[60] = (length[1]       ) & 0xFF;
        P[61] = (length[1] >>>  8) & 0xFF;
        P[62] = (length[1] >>> 16) & 0xFF;
        P[63] = (length[1] >>> 24) & 0xFF;
        
        MD5_transfrom(P, digest);
    }
    
    else {
        A[56] = (length[0]       ) & 0xFF;
        A[57] = (length[0] >>>  8) & 0xFF;
        A[58] = (length[0] >>> 16) & 0xFF;
        A[59] = (length[0] >>> 24) & 0xFF;
        A[60] = (length[1]       ) & 0xFF;
        A[61] = (length[1] >>>  8) & 0xFF;
        A[62] = (length[1] >>> 16) & 0xFF;
        A[63] = (length[1] >>> 24) & 0xFF;
        
        MD5_transfrom(P, digest);
        MD5_transfrom(A, digest);
    }
    
    for ( var k = 0; k < digest.length; ++k ) {
        digest[k] = ((digest[k] << 8 | digest[k] >>> 24) & 0x00FF00FF) | ((digest[k] << 24 | digest[k] >>> 8) & 0xFF00FF00); 
    }
    
    for ( var k = 0, hex = ""; k < digest.length; ++k ) {
        hex += ("00000000" + (digest[k] >>> 0).toString(16)).slice(-8);
    }
    
    return hex;
}

var W = new Array(16);
var P = new Array(64);
var A = new Array(64);

function MD5_AC( w, s ) { var t = s << 3 >>> 0; w[0] += t; w[1] += (s >>> 29) + (w[0] < t); }
function MD5_FF( a, b, c, d, x, s, ac ) { a += ((b & c) | ((~b) & d)) + x + ac; a = ((a << s) | (a >>> (32 - s))); return a + b; }
function MD5_GG( a, b, c, d, x, s, ac ) { a += ((b & d) | (c & (~d))) + x + ac; a = ((a << s) | (a >>> (32 - s))); return a + b; }
function MD5_HH( a, b, c, d, x, s, ac ) { a += (b ^ c ^ d) + x + ac; a = ((a << s) | (a >>> (32 - s))); return a + b; }
function MD5_II( a, b, c, d, x, s, ac ) { a += (c ^ (b | (~d))) + x + ac; a = ((a << s) | (a >>> (32 - s))); return a + b; }

function MD5_transfrom( bytes, digest ) {
    for ( var start = 0; start + 64 <= bytes.length; start += 64 ) {
        var a = digest[0];
        var b = digest[1];
        var c = digest[2];
        var d = digest[3];
        
        for ( var t = 0, k = start; t < 16; ++t, k += 4 ) {
            W[t] = (bytes[k]) | (bytes[k + 1] << 8) | (bytes[k + 2] << 16) | (bytes[k + 3] << 24);
        }
        
        /* Round 1 */
        a = MD5_FF(a, b, c, d, W[ 0],  7, 0xd76aa478);
        d = MD5_FF(d, a, b, c, W[ 1], 12, 0xe8c7b756);
        c = MD5_FF(c, d, a, b, W[ 2], 17, 0x242070db);
        b = MD5_FF(b, c, d, a, W[ 3], 22, 0xc1bdceee);
        a = MD5_FF(a, b, c, d, W[ 4],  7, 0xf57c0faf);
        d = MD5_FF(d, a, b, c, W[ 5], 12, 0x4787c62a);
        c = MD5_FF(c, d, a, b, W[ 6], 17, 0xa8304613);
        b = MD5_FF(b, c, d, a, W[ 7], 22, 0xfd469501);
        a = MD5_FF(a, b, c, d, W[ 8],  7, 0x698098d8);
        d = MD5_FF(d, a, b, c, W[ 9], 12, 0x8b44f7af);
        c = MD5_FF(c, d, a, b, W[10], 17, 0xffff5bb1);
        b = MD5_FF(b, c, d, a, W[11], 22, 0x895cd7be);
        a = MD5_FF(a, b, c, d, W[12],  7, 0x6b901122);
        d = MD5_FF(d, a, b, c, W[13], 12, 0xfd987193);
        c = MD5_FF(c, d, a, b, W[14], 17, 0xa679438e);
        b = MD5_FF(b, c, d, a, W[15], 22, 0x49b40821);

        /* Round 2 */
        a = MD5_GG(a, b, c, d, W[ 1],  5, 0xf61e2562);
        d = MD5_GG(d, a, b, c, W[ 6],  9, 0xc040b340);
        c = MD5_GG(c, d, a, b, W[11], 14, 0x265e5a51);
        b = MD5_GG(b, c, d, a, W[ 0], 20, 0xe9b6c7aa);
        a = MD5_GG(a, b, c, d, W[ 5],  5, 0xd62f105d);
        d = MD5_GG(d, a, b, c, W[10],  9, 0x02441453);
        c = MD5_GG(c, d, a, b, W[15], 14, 0xd8a1e681);
        b = MD5_GG(b, c, d, a, W[ 4], 20, 0xe7d3fbc8);
        a = MD5_GG(a, b, c, d, W[ 9],  5, 0x21e1cde6);
        d = MD5_GG(d, a, b, c, W[14],  9, 0xc33707d6);
        c = MD5_GG(c, d, a, b, W[ 3], 14, 0xf4d50d87);
        b = MD5_GG(b, c, d, a, W[ 8], 20, 0x455a14ed);
        a = MD5_GG(a, b, c, d, W[13],  5, 0xa9e3e905);
        d = MD5_GG(d, a, b, c, W[ 2],  9, 0xfcefa3f8);
        c = MD5_GG(c, d, a, b, W[ 7], 14, 0x676f02d9);
        b = MD5_GG(b, c, d, a, W[12], 20, 0x8d2a4c8a);

        /* Round 3 */
        a = MD5_HH(a, b, c, d, W[ 5],  4, 0xfffa3942);
        d = MD5_HH(d, a, b, c, W[ 8], 11, 0x8771f681);
        c = MD5_HH(c, d, a, b, W[11], 16, 0x6d9d6122);
        b = MD5_HH(b, c, d, a, W[14], 23, 0xfde5380c);
        a = MD5_HH(a, b, c, d, W[ 1],  4, 0xa4beea44);
        d = MD5_HH(d, a, b, c, W[ 4], 11, 0x4bdecfa9);
        c = MD5_HH(c, d, a, b, W[ 7], 16, 0xf6bb4b60);
        b = MD5_HH(b, c, d, a, W[10], 23, 0xbebfbc70);
        a = MD5_HH(a, b, c, d, W[13],  4, 0x289b7ec6);
        d = MD5_HH(d, a, b, c, W[ 0], 11, 0xeaa127fa);
        c = MD5_HH(c, d, a, b, W[ 3], 16, 0xd4ef3085);
        b = MD5_HH(b, c, d, a, W[ 6], 23, 0x04881d05);
        a = MD5_HH(a, b, c, d, W[ 9],  4, 0xd9d4d039);
        d = MD5_HH(d, a, b, c, W[12], 11, 0xe6db99e5);
        c = MD5_HH(c, d, a, b, W[15], 16, 0x1fa27cf8);
        b = MD5_HH(b, c, d, a, W[ 2], 23, 0xc4ac5665);

        /* Round 4 */
        a = MD5_II(a, b, c, d, W[ 0],  6, 0xf4292244);
        d = MD5_II(d, a, b, c, W[ 7], 10, 0x432aff97);
        c = MD5_II(c, d, a, b, W[14], 15, 0xab9423a7);
        b = MD5_II(b, c, d, a, W[ 5], 21, 0xfc93a039);
        a = MD5_II(a, b, c, d, W[12],  6, 0x655b59c3);
        d = MD5_II(d, a, b, c, W[ 3], 10, 0x8f0ccc92);
        c = MD5_II(c, d, a, b, W[10], 15, 0xffeff47d);
        b = MD5_II(b, c, d, a, W[ 1], 21, 0x85845dd1);
        a = MD5_II(a, b, c, d, W[ 8],  6, 0x6fa87e4f);
        d = MD5_II(d, a, b, c, W[15], 10, 0xfe2ce6e0);
        c = MD5_II(c, d, a, b, W[ 6], 15, 0xa3014314);
        b = MD5_II(b, c, d, a, W[13], 21, 0x4e0811a1);
        a = MD5_II(a, b, c, d, W[ 4],  6, 0xf7537e82);
        d = MD5_II(d, a, b, c, W[11], 10, 0xbd3af235);
        c = MD5_II(c, d, a, b, W[ 2], 15, 0x2ad7d2bb);
        b = MD5_II(b, c, d, a, W[ 9], 21, 0xeb86d391);
        
        digest[0] = (digest[0] + a) & 0xFFFFFFFF;
        digest[1] = (digest[1] + b) & 0xFFFFFFFF;
        digest[2] = (digest[2] + c) & 0xFFFFFFFF;
        digest[3] = (digest[3] + d) & 0xFFFFFFFF;
    }
}

/// ==============================================================================
/// 注册全局对象。
/// ==============================================================================
if ( typeof define == "function" && define.amd ) {
    /// AMD Modules
    define(function() { return md5; });
}

else if ( typeof exports != "undefined" && typeof module != "undefined" ) {
    /// CMD Modules(NodeJS)
    module.exports = md5;
}

else {
    domain.md5 = md5;
}

/// ==============================================================================
/*< END >*/}(typeof window == "undefined" ? this : window));
/// ==============================================================================