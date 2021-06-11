var Base64 = {
    decode: function (hex) {
        try {
           var str = decodeURIComponent(hex.replace(/(..)/g, '%$1'))
        }
        catch (e) {
            str = hex
            console.log('invalid hex input: ' + hex)
        }
        return str;
    },
    encode: function (str) {
        try {
           var hex = unescape(encodeURIComponent(str))
                .split('').map(function (v) {
                    return v.charCodeAt(0).toString(16)
                }).join('')
        }
        catch (e) {
            hex = str
            console.log('invalid text input: ' + str)
        }
        return hex;
    }
}