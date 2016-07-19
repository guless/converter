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
/// 定义编码表和解码表。
var BASE16_ENCODE_TABLE = [ 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 
    101, 102];
var BASE16_DECODE_TABLE = [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 
    8, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
    -1, 10, 11, 12, 13, 14, 15, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
var BASE32_ENCODE_TABLE = [ 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 
    79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 50, 51, 52, 53, 54, 55];
var BASE32_DECODE_TABLE = [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 
    30, 31, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, 
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
var BASE32_HEX_ENCODE_TABLE = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 
    68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86];
var BASE32_HEX_DECODE_TABLE = [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 
    6, 7, 8, 9, -1, -1, -1, -1, -1, -1, -1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, -1, -1, -1, -1, -1, -1, -1, -1, 
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
var BASE64_ENCODE_TABLE = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 
    79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 
    104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 
    120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47];
var BASE64_DECODE_TABLE = [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 
    58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, 
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 
    45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];
var BASE64_URL_ENCODE_TABLE = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 
    78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 
    103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 
    119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 45, 95];
var BASE64_URL_DECODE_TABLE = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, 52, 53, 54, 55, 56, 
    57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, 
    63, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 
    44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];
    
/// 定义 BASE32/BASE64 的补位字符。
var PADCHAR = 61;
var TAILPAD = /=+$/;

/// Base16 数据编码。
function base16( input, table ) {
    var output = new Array(input.length << 1 >>> 0);

    for ( var start = 0, offset = 0; start < input.length; ++start ) {
        output[offset++] = table[input[start] >>> 4 & 0x0F];
        output[offset++] = table[input[start] & 0x0F];
    }
    
    return output;
}

/// Base16 数据解码。
function debase16( bytes, table ) {
    if ( bytes.length & 1 ) {
        throw new Error("Wrong size of base16 final chunk.");
    }
    
    var output = new Array(bytes.length >>> 1);
    
    for ( var start = 0, offset = 0; start + 2 <= bytes.length; start += 2 ) {
        var a = table[bytes.charCodeAt(start) & 0x7F];
        var b = table[bytes.charCodeAt(start + 1) & 0x7F];
        
        if ( a < 0 || b < 0 ) { 
            throw new Error("Out of base16 character range. [offset=" + start + "]");
        }
        
        output[offset++] = a << 4 | b;
    }
    
    return output;
}

/// Base32 数据编码。
function base32( input, table ) {
    var output = new Array((Math.ceil(input.length / 5) << 3) >>> 0);
    
    for ( var start = 0, offset = 0; start + 5 <= input.length; start += 5 ) {
        var a = input[start    ];
        var b = input[start + 1];
        var c = input[start + 2];
        var d = input[start + 3];
        var e = input[start + 4];
        
        output[offset++] = table[(a >>> 3) & 0x1F];
        output[offset++] = table[((a & 0x07) << 2) | ((b >>> 6) & 0x03)];
        output[offset++] = table[(b >>> 1) & 0x1F];
        output[offset++] = table[((b & 0x01) << 4) | ((c >>> 4) & 0x0F)];
        
        output[offset++] = table[((c & 0x0F) << 1) | ((d >>> 7) & 0x01)];
        output[offset++] = table[(d >>> 2) & 0x1F];
        output[offset++] = table[((d & 0x03) << 3) | ((e >>> 5) & 0x07)];
        output[offset++] = table[e & 0x1F];
    }

    if ( input.length - start != 0 ) {
        switch( input.length - start ) {
            case (1):
                output[offset++] = table[(input[start    ] >>> 3) & 0x1F];
                output[offset++] = table[(input[start    ] & 0x07) << 2];
                break;
                
            case (2):
                output[offset++] = table[(input[start    ] >>> 3) & 0x1F];
                output[offset++] = table[((input[start    ] & 0x07) << 2) | ((input[start + 1] >>> 6) & 0x03)];
                output[offset++] = table[(input[start + 1] >>> 1) & 0x1F];
                output[offset++] = table[(input[start + 1] & 0x01) << 4];
                break;
                
            case (3):
                output[offset++] = table[(input[start    ] >>> 3) & 0x1F];
                output[offset++] = table[((input[start    ] & 0x07) << 2) | ((input[start + 1] >>> 6) & 0x03)];
                output[offset++] = table[(input[start + 1] >>> 1) & 0x1F];
                output[offset++] = table[((input[start + 1] & 0x01) << 4) | ((input[start + 2] >>> 4) & 0x0F)];
                output[offset++] = table[(input[start + 2] & 0x0F) << 1];
                break;
                
            case (4):
                output[offset++] = table[(input[start    ] >>> 3) & 0x1F];
                output[offset++] = table[((input[start    ] & 0x07) << 2) | ((input[start + 1] >>> 6) & 0x03)];
                output[offset++] = table[(input[start + 1] >>> 1) & 0x1F];
                output[offset++] = table[((input[start + 1] & 0x01) << 4) | ((input[start + 2] >>> 4) & 0x0F)];
                output[offset++] = table[((input[start + 2] & 0x0F) << 1) | ((input[start + 3] >>> 7) & 0x01)];
                output[offset++] = table[(input[start + 3] >>> 2) & 0x1F];
                output[offset++] = table[(input[start + 3] & 0x03) << 3];
                break;
                
            default:
                throw new Error("Wrong size of base32 final chunk.");
        }
        
        for ( var i = offset; i < output.length; ++i ) {
            output[i] = PADCHAR;
        }
    }
    
    return output;
}

/// Base32 数据解码。
function debase32( bytes, table ) {
    var output = new Array((bytes.length >>> 3) * 5);
    
    for ( var start = 0, offset = 0; start + 8 <= bytes.length; start += 8) {
        var a = table[bytes.charCodeAt(start    ) & 0x7F];
        var b = table[bytes.charCodeAt(start + 1) & 0x7F];
        var c = table[bytes.charCodeAt(start + 2) & 0x7F];
        var d = table[bytes.charCodeAt(start + 3) & 0x7F];
        var e = table[bytes.charCodeAt(start + 4) & 0x7F];
        var f = table[bytes.charCodeAt(start + 5) & 0x7F];
        var g = table[bytes.charCodeAt(start + 6) & 0x7F];
        var h = table[bytes.charCodeAt(start + 7) & 0x7F];
        
        if ( a < 0 || b < 0 || c < 0 || d < 0 || e < 0 || f < 0 || g < 0 || h < 0 ) {
            throw new Error("Out of base32 character range. [offset=" + start + "]");
        }
        
        output[offset++] = (a << 3) | (b >>> 2);
        output[offset++] = ((b & 0x03) << 6) | (c << 1) | (d >>> 4);
        output[offset++] = ((d & 0x0F) << 4) | (e >>> 1);
        output[offset++] = ((e & 0x01) << 7) | (f << 2) | (g >>> 3);
        output[offset++] = ((g & 0x07) << 5) | h;
    }
    
    if ( bytes.length - start != 0 ) {
        switch( bytes.length - start ) {
            case (2):
                a = table[bytes.charCodeAt(start    ) & 0x7F];
                b = table[bytes.charCodeAt(start + 1) & 0x7F];
                
                if ( a < 0 || b < 0 ) {
                    throw new Error("Out of base32 character range. [offset=" + (bytes.length - start) + "]");
                }
                
                output[offset++] = (a << 3) | (b >>> 2);
                break;
                
            case (4):
                a = table[bytes.charCodeAt(start    ) & 0x7F];
                b = table[bytes.charCodeAt(start + 1) & 0x7F];
                c = table[bytes.charCodeAt(start + 2) & 0x7F];
                d = table[bytes.charCodeAt(start + 3) & 0x7F];
                
                if ( a < 0 || b < 0 || c < 0 || d < 0 ) {
                    throw new Error("Out of base32 character range. [offset=" + (bytes.length - start) + "]");
                }
                
                output[offset++] = (a << 3) | (b >>> 2);;
                output[offset++] = ((b & 0x03) << 6) | (c << 1) | (d >>> 4);
                break;
                
            case (5):
                a = table[bytes.charCodeAt(start    ) & 0x7F];
                b = table[bytes.charCodeAt(start + 1) & 0x7F];
                c = table[bytes.charCodeAt(start + 2) & 0x7F];
                d = table[bytes.charCodeAt(start + 3) & 0x7F];
                e = table[bytes.charCodeAt(start + 4) & 0x7F];
                
                if ( a < 0 || b < 0 || c < 0 || d < 0 || e < 0 ) {
                    throw new Error("Out of base32 character range. [offset=" + (bytes.length - start) + "]");
                }
                
                output[offset++] = (a << 3) | (b >>> 2);;
                output[offset++] = ((b & 0x03) << 6) | (c << 1) | (d >>> 4);
                output[offset++] = ((d & 0x0F) << 4) | (e >>> 1);
                break;
                
            case (7):
                a = table[bytes.charCodeAt(start    ) & 0x7F];
                b = table[bytes.charCodeAt(start + 1) & 0x7F];
                c = table[bytes.charCodeAt(start + 2) & 0x7F];
                d = table[bytes.charCodeAt(start + 3) & 0x7F];
                e = table[bytes.charCodeAt(start + 4) & 0x7F];
                f = table[bytes.charCodeAt(start + 5) & 0x7F];
                g = table[bytes.charCodeAt(start + 6) & 0x7F];
            
                if ( a < 0 || b < 0 || c < 0 || d < 0 || e < 0 || f < 0 || g < 0 ) {
                    throw new Error("Out of base32 character range. [offset=" + (bytes.length - start) + "]");
                }
            
                output[offset++] = (a << 3) | (b >>> 2);;
                output[offset++] = ((b & 0x03) << 6) | (c << 1) | (d >>> 4);
                output[offset++] = ((d & 0x0F) << 4) | (e >>> 1);
                output[offset++] = ((e & 0x01) << 7) | (f << 2) | (g >>> 3);
                break;
                
            default:
                throw new Error("Wrong size of base32 final chunk.");
        }
    }
    
    return output;
}

/// Base64 数据编码。
function base64( input, table ) {
    var output = new Array((Math.ceil(input.length / 3) << 2) >>> 0);
    
    for ( var start = 0, offset = 0; start + 3 <= input.length; start += 3 ) {
        var a = input[start    ];
        var b = input[start + 1];
        var c = input[start + 2];
        
        output[offset++] = table[(a >>> 2) & 0x3F];
        output[offset++] = table[((a & 0x03) << 4) | ((b >>> 4) & 0x0F)];
        output[offset++] = table[((b & 0x0F) << 2) | ((c >>> 6) & 0x03)];
        output[offset++] = table[c & 0x3F];
    }
    
    if ( input.length - start != 0 ) {
        switch( input.length - start ) {
            case (1):
                output[offset++] = table[(input[start    ] >>> 2) & 0x3F];
                output[offset++] = table[(input[start    ] & 0x03) << 4];
                break;
                
            case (2):
                output[offset++] = table[((input[start    ] >>> 2) & 0x3F)];
                output[offset++] = table[((input[start    ] & 0x03) << 4) | ((input[start + 1] >>> 4) & 0x0F)];
                output[offset++] = table[((input[start + 1] & 0x0F) << 2)];
                break;
                
            default:
                throw new Error("Wrong size of base64 final chunk.");
        }
        
        for ( var i = offset; i < output.length; ++i ) {
            output[i] = PADCHAR;
        }
    }

    return output;
}

/// Base64 数据解码。
function debase64( bytes, table ) {
    var output = new Array((bytes.length >>> 2) * 3);
    
    for ( var start = 0, offset = 0; start + 4 <= bytes.length; start += 4 ) {
        var a = table[bytes.charCodeAt(start    ) & 0x7F];
        var b = table[bytes.charCodeAt(start + 1) & 0x7F];
        var c = table[bytes.charCodeAt(start + 2) & 0x7F];
        var d = table[bytes.charCodeAt(start + 3) & 0x7F];
        
        if ( a < 0 || b < 0 || c < 0 || d < 0 ) {
            throw new Error("Out of base64 character range. [offset=" + start + "]");
        }
        
        output[offset++] = (a << 2) | (b >>> 4);
        output[offset++] = ((b & 0x0F) << 4) | (c >>> 2);
        output[offset++] = ((c & 0x03) << 6) | d;
    }
    
    if ( bytes.length - start != 0 ) {
        switch( bytes.length - start ) {
            case (2):
                a = table[bytes.charCodeAt(start    ) & 0x7F];
                b = table[bytes.charCodeAt(start + 1) & 0x7F];
            
                if ( a < 0 || b < 1 ) {
                    throw new Error("Out of base64 character range. [offset=" + (bytes.length - start) + "]");
                }
            
                output[offset++] = (a << 2) | (b >>> 4);
                break;
                
            case (3):
                a = table[bytes.charCodeAt(start    ) & 0x7F];
                b = table[bytes.charCodeAt(start + 1) & 0x7F];
                c = table[bytes.charCodeAt(start + 2) & 0x7F];

                if ( a < 0 || b < 0 || c < 0 ) {
                    throw new Error("Out of base64 character range. [offset=" + (bytes.length - start) + "]");
                }

                output[offset++] = (a << 2) | (b >>> 4);
                output[offset++] = ((b & 0x0F) << 4) | (c >>> 2);
                break;
            
            default:
                throw new Error("Wrong size of base64 final chunk.");
        }
    }
    
    return output;
}

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

/// UTF-8 数据解码。
function deutf8( bytes ) {
    /// 提前计算用于保存解码结果所需的数组长度。
    var size = 0;
    var char = 0;
    
    for ( var start = 0; start < bytes.length; ++start ) {
        char  = bytes[start];
        size += (char <= 0x7F ? 1 : 
                (char & 0xF0) == 0xF0 ? ((start += 3) >= bytes.length ? 0 : 2) :
                (char & 0xE0) == 0xE0 ? ((start += 2) >= bytes.length ? 0 : 1) :
                (char & 0xC0) == 0xC0 ? ((start += 1) >= bytes.length ? 0 : 1) : 0);
    }
    
    var output = new Array(size);
    var offset = 0;
    
    for ( var start = 0, total = 0; start < bytes.length; ++start ) {
        char  = bytes[start];
        
        if ( char >= 0x80 ) {
            if ( (char < 0xC2) || (char > 0xF4) ) { 
                throw new Error("Invaild utf-8 character. [offset=${start}, char=" + char + "]");
            }
            
            if ( (char & 0xF0) == 0xF0 ) {
                total = start + 3;
                char  = char & 0x07;
            }
            
            else if ( (char & 0xE0) == 0xE0 ) {
                total = start + 2;
                char  = char & 0x0F;
            }
            
            else if ( (char & 0xC0) == 0xC0 ) {
                total = start + 1;
                char  = char & 0x1F;
            }
            
            else {
                throw new Error("Invaild utf-8 character. [offset=" + start + ", char=" + char + "]");
            }
            
            if ( total >= input.length ) {
                throw new Error("Encounter an unpaired surrogate. [char=" + char + "]");
            }
            
            while ( (start + 1) <= total ) {
                var tail = bytes[++start];
                
                if ( (tail < 0x80) || (tail > 0xBF) ) {
                    throw new Error("Invaild utf-8 trialing character. [offset=" + start + ", char=" + char + "]");
                }
                
                char = ((char << 6) | (tail & 0x3F));
            }
        }
        
        if ( (char >= 0xD800) && (char <= 0xDFFF) ) {
            throw new Error("Encounter an unpaired surrogate. [char=" + char + "]");
        }
        
        if ( char >= 0x10000 ) {
            output[offset++] = (char >> 10) + 0xD7C0;
            output[offset++] = (char & 0x3FF) + 0xDC00;
        }
        
        else {
            output[offset++] = char;
        }
    }
    
    return output;
}

/// 数组转字符串。
function arr2str( bytes ) {
    return String.fromCharCode.apply(null, bytes);
}

/// 删除字符串末尾的补位字符("=")。
function trimRight( bytes ) {
    return bytes.replace(TAILPAD, "");
}

/**
 * 将给定的字符串编码成指定格式的数据。
 * 
 * @param {String} string - 指定需要编码的字符串。
 * @param {String} codec - 指定编码类型，可以是以下常量中的一个（不区分大小写）：
 * 
 *     - "base16" | "hex"
 *     - "base32"
 *     - "base32-hex" | "base32hex"
 *     - "base64"
 *     - "base64-urlsafe" | "base64urlsafe" | "base64-url" | "base64url"
 * 
 * @returns {String} - 返回编码后的数据的字符串表示形式。
 */
function encode( string, codec ) {
    switch( codec.toLowerCase() ) {
        case "hex"       :
        case "base16"    : return arr2str(base16(utf8(string), BASE16_ENCODE_TABLE));
        case "base32"    : return arr2str(base32(utf8(string), BASE32_ENCODE_TABLE));
        case "base32hex" :
        case "base32-hex": return arr2str(base32(utf8(string), BASE32_HEX_ENCODE_TABLE));
        case "base64"    : return arr2str(base64(utf8(string), BASE64_ENCODE_TABLE));
        case "base64-urlsafe":
        case "base64urlsafe" :
        case "base64-url":
        case "base64url" : return arr2str(base64(utf8(string), BASE64_URL_ENCODE_TABLE));
            
        default:
            throw new Error("Unknow codec algorithms.");
    }
}

/**
 * 将给定的字符串解码成指定格式的数据。
 * 
 * @param {String} string - 指定需要解码的字符串。
 * @param {String} codec - 指定解码类型，可以是以下常量中的一个（不区分大小写）：
 * 
 *     - "base16" | "hex"
 *     - "base32"
 *     - "base32-hex" | "base32hex"
 *     - "base64"
 *     - "base64-urlsafe" | "base64urlsafe" | "base64-url" | "base64url"
 * 
 * @returns {String} - 返回解码后的数据的字符串表示形式。
 */
function decode( string, codec ) {
    switch( codec.toLowerCase() ) {
        case "hex"       :
        case "base16"    : return arr2str(deutf8(debase16(string, BASE16_DECODE_TABLE)));
        case "base32"    : return arr2str(deutf8(debase32(trimRight(string), BASE32_DECODE_TABLE)));
        case "base32hex" :
        case "base32-hex": return arr2str(deutf8(debase32(trimRight(string), BASE32_HEX_DECODE_TABLE)));
        case "base64"    : return arr2str(deutf8(debase64(trimRight(string), BASE64_DECODE_TABLE)));
        case "base64-urlsafe":
        case "base64urlsafe" :
        case "base64-url":
        case "base64url" : return arr2str(deutf8(debase64(trimRight(string), BASE64_URL_DECODE_TABLE)));
            
        default:
            throw new Error("Unknow codec algorithms.");
    }
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

var W = new Array(80);
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
    define(function() {
        return { encode: encode, decode: decode, md5: md5, sha1: sha1 };
    });
}

else if ( typeof exports != "undefined" ) {
    /// CMD Modules(NodeJS)
    exports.encode = encode;
    exports.decode = decode;
    exports.md5    = md5;
    exports.sha1   = sha1;
}

else {
    domain.encode = encode;
    domain.decode = decode;
    domain.md5    = md5;
    domain.sha1   = sha1;
}

/// ==============================================================================
/*< END >*/}(typeof window == "undefined" ? this : window));
/// ==============================================================================