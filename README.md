<img src="https://docs-assets.developer.apple.com/published/c104c9bff0/841b02dd-b78c-4cad-8da4-700761d34e14.png" width="50" height="50" alt="Apple Wallet Logo" align="left" />

# PassSigner

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

Apple Pass Signer for NodeJS

## Install

```
$ npm install passsigner
```

## Usage

```js
const PassSigner = require("passsigner")

const manifest = {
  "icon.png": "a05b6df8cdc27338f296856e367116b09d5bd63c",
  "icon@2x.png": "e4fda792e9e2f0b043e16006cfea70fffe610e51",
  "logo.png": "284d8cca28de0ebb2ca28ebdf5a8dc11c9e7543c",
  "logo@2x.png": "3343ada60b6b504c9b65a601e8b89a0566d5ca00",
  "pass.json": "6923eaca29e9ef3f97dacf9d0a0880efc368df28",
}

const passSigner = new PassSigner({
  appleWWDRCA: './AppleWWDRCA.cer',
  signCert: './Certificates.p12'
})
const signature = passSigner.sign(JSON.stringify(manifest))
```

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/passsigner.svg
[npm-url]: https://npmjs.org/package/passsigner
[downloads-image]: https://img.shields.io/npm/dm/passsigner.svg
[downloads-url]: https://npmcharts.com/compare/passsigner?minimal=true
