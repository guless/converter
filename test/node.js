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
var encode = require("..").encode;
var decode = require("..").decode;
var md5    = require("..").md5;
var sha1   = require("..").sha1;

function assert( result, expect ) {
    if ( result === expect ) return;
    throw new Error("Assert Exception: value does not equals.\n\tresult: \"" + result + "\"\n\texpect: \"" + expect + "\"");
}

/// Base16 测试用例
var data1 = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\u0008\u0009\u000a\u000b\u000c\u000d\u000e\u000f";
assert(encode("", "base16"), "");
assert(encode(data1, "base16"), "000102030405060708090a0b0c0d0e0f");
assert(decode("", "base16"), "");
assert(decode("000102030405060708090a0b0c0d0e0f", "base16"), data1);

/// Base32 测试用例
assert(encode(""      , "base32"), "");
assert(encode("f"     , "base32"), "MY======");
assert(encode("fo"    , "base32"), "MZXQ====");
assert(encode("foo"   , "base32"), "MZXW6===");
assert(encode("foob"  , "base32"), "MZXW6YQ=");
assert(encode("fooba" , "base32"), "MZXW6YTB");
assert(encode("foobar", "base32"), "MZXW6YTBOI======");

assert(decode(""                , "base32"), "");
assert(decode("MY======"        , "base32"), "f");
assert(decode("MZXQ===="        , "base32"), "fo");
assert(decode("MZXW6==="        , "base32"), "foo");
assert(decode("MZXW6YQ="        , "base32"), "foob");
assert(decode("MZXW6YTB"        , "base32"), "fooba");
assert(decode("MZXW6YTBOI======", "base32"), "foobar");

/// Base64 测试用例
assert(encode(""      , "base64"), "");
assert(encode("f"     , "base64"), "Zg==");
assert(encode("fo"    , "base64"), "Zm8=");
assert(encode("foo"   , "base64"), "Zm9v");
assert(encode("foob"  , "base64"), "Zm9vYg==");
assert(encode("fooba" , "base64"), "Zm9vYmE=");
assert(encode("foobar", "base64"), "Zm9vYmFy");

assert(decode(""        , "base64"), "");
assert(decode("Zg=="    , "base64"), "f");
assert(decode("Zm8="    , "base64"), "fo");
assert(decode("Zm9v"    , "base64"), "foo");
assert(decode("Zm9vYg==", "base64"), "foob");
assert(decode("Zm9vYmE=", "base64"), "fooba");
assert(decode("Zm9vYmFy", "base64"), "foobar");

/// MD5 测试用例
assert(md5(""), "d41d8cd98f00b204e9800998ecf8427e");
assert(md5("a"), "0cc175b9c0f1b6a831c399e269772661");
assert(md5("abc"), "900150983cd24fb0d6963f7d28e17f72");
assert(md5("message digest"), "f96b697d7cb7938d525a2f31aaf161d0");
assert(md5("abcdefghijklmnopqrstuvwxyz"), "c3fcd3d76192e4007dfb496cca67e13b");
assert(md5("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"), "d174ab98d277d9f5a5611c2c9f419d9f");
assert(md5("12345678901234567890123456789012345678901234567890123456789012345678901234567890"), "57edf4a22be3c955ac49da2e2107b67a");

/// SHA-1 测试用例
assert(sha1(""), "da39a3ee5e6b4b0d3255bfef95601890afd80709");
assert(sha1("a"), "86f7e437faa5a7fce15d1ddcb9eaeaea377667b8");
assert(sha1("abc"), "a9993e364706816aba3e25717850c26c9cd0d89d");
assert(sha1("Secure Hash Algorithm"), "d3517cbe39e304a3988dc773fa6f1e71f6ff965e");
assert(sha1("abcdefghijklmnopqrstuvwxyz"), "32d10c7b8cf96570ca04ce37f2a19d84240d3a89");
assert(sha1("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"), "761c457bf73b14d27e9e9265c46f4b4dda11f940");
assert(sha1("12345678901234567890123456789012345678901234567890123456789012345678901234567890"), "50abf5706a150990a08b2c5ea40fa0e585554732");