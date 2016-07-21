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
 * 计算给定字符串的 SHA-1 哈希值。
 * 
 * @param {String} string - 指定需要计算哈希值的字符串。
 * @returns {String} - 返回指定编码的 SHA-1 哈希值。
 */
function sha1( string ) {
    var digest = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];
    var length = [0, 0];
    var bytes  = utf8(string);
    var remain = bytes.length % 64;
    
    SHA1_AC(length, bytes.length);
    SHA1_transfrom(bytes, digest);
    
    for ( var i = 0; i < P.length; ++i ) {
        P[i] = (i < remain ? bytes[bytes.length - remain + i] : i == remain ? 0x80 : 0);
    }
    
    if ( remain < 56 ) {
        P[56] = (length[0] >>> 24) & 0xFF;
        P[57] = (length[0] >>> 16) & 0xFF;
        P[58] = (length[0] >>>  8) & 0xFF;
        P[59] = (length[0]       ) & 0xFF;
        P[60] = (length[1] >>> 24) & 0xFF;
        P[61] = (length[1] >>> 16) & 0xFF;
        P[62] = (length[1] >>>  8) & 0xFF;
        P[63] = (length[1]       ) & 0xFF;
        
        SHA1_transfrom(P, digest);
    }
    
    else {
        A[56] = (length[0] >>> 24) & 0xFF;
        A[57] = (length[0] >>> 16) & 0xFF;
        A[58] = (length[0] >>>  8) & 0xFF;
        A[59] = (length[0]       ) & 0xFF;
        A[60] = (length[1] >>> 24) & 0xFF;
        A[61] = (length[1] >>> 16) & 0xFF;
        A[62] = (length[1] >>>  8) & 0xFF;
        A[63] = (length[1]       ) & 0xFF;
        
        SHA1_transfrom(P, digest);
        SHA1_transfrom(A, digest);
    }
    
    for ( var k = 0, hex = ""; k < digest.length; ++k ) {
        hex += ("00000000" + (digest[k] >>> 0).toString(16)).slice(-8);
    }
    
    return hex;
}

var W = new Array(80);
var P = new Array(64);
var A = new Array(64);

function SHA1_AC( w, s ) { var t = s << 3 >>> 0; w[1] += t; w[0] += (s >>> 29) + (w[1] < t); }

function SHA1_transfrom( bytes, digest ) {
    for ( var start = 0; start + 64 <= bytes.length; start += 64 ) {
        for ( var t = 0, k = start; t < 16; ++t, k += 4 ) {
            W[t] = (bytes[k] << 24) | (bytes[k + 1] << 16) | (bytes[k + 2] << 8) | (bytes[k + 3]);
        }
        
        for ( var t = 16; t < 80; ++t ) {
            W[t] = W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16];
            W[t] = ((W[t] << 1) | (W[t] >>> 31));
        }
        
        var T = 0;
        var A = digest[0];
        var B = digest[1];
        var C = digest[2];
        var D = digest[3];
        var E = digest[4];
        
        for ( var t = 0; t < 20; ++t ) {
            T = ((A << 5) | (A >>> 27)) + ((B & C) | ((~B) & D)) + E + W[t] + 0x5A827999;
            E = D;
            D = C;
            C = ((B << 30) | (B >>> 2));
            B = A;
            A = T;
        }

        for ( var t = 20; t < 40; ++t ) {
            T = ((A << 5) | (A >>> 27)) + (B ^ C ^ D) + E + W[t] + 0x6ED9EBA1;
            E = D;
            D = C;
            C = ((B << 30) | (B >>> 2));
            B = A;
            A = T;
        }
        
        for ( var t = 40; t < 60; ++t ) {
            T = ((A << 5) | (A >>> 27)) + ((B & C) | (B & D) | (C & D)) + E + W[t] + 0x8F1BBCDC;
            E = D;
            D = C;
            C = ((B << 30) | (B >>> 2));
            B = A;
            A = T;
        }
        
        for ( var t = 60; t < 80; ++t ) {
            T = ((A << 5) | (A >>> 27)) + (B ^ C ^ D) + E + W[t] + 0xCA62C1D6;
            E = D;
            D = C;
            C = ((B << 30) | (B >>> 2));
            B = A;
            A = T;
        }
        
        digest[0] = (digest[0] + A) & 0xFFFFFFFF;
        digest[1] = (digest[1] + B) & 0xFFFFFFFF;
        digest[2] = (digest[2] + C) & 0xFFFFFFFF;
        digest[3] = (digest[3] + D) & 0xFFFFFFFF;
        digest[4] = (digest[4] + E) & 0xFFFFFFFF;
    }
}

/// ==============================================================================
/// 注册全局对象。
/// ==============================================================================
if ( typeof define == "function" && define.amd ) {
    /// AMD Modules
    define(function() { return sha1; });
}

else if ( typeof exports != "undefined" && typeof module != "undefined" ) {
    /// CMD Modules(NodeJS)
    module.exports = sha1;
}

else {
    domain.sha1 = sha1;
}

/// ==============================================================================
/*< END >*/}(typeof window == "undefined" ? this : window));
/// ==============================================================================