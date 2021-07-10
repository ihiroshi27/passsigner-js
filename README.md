<img src="https://docs-assets.developer.apple.com/published/c104c9bff0/841b02dd-b78c-4cad-8da4-700761d34e14.png" width="50" height="50" alt="Apple Wallet Logo" align="left" />

# PassSigner
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-downloads-url]

Apple Pass Signer for Node.js

## Install
```
$ npm install passsigner-js
```

## Get Started
### Apple's WWDR Certificate
Apple’s World Wide Developer Relations (WWDR) certificate is available from Apple at [http://developer.apple.com/certificationauthority/AppleWWDRCA.cer](http://developer.apple.com/certificationauthority/AppleWWDRCA.cer).

### Pass Signing Certificate
To download your pass signing certificate, do the following:

1. Log into your [Apple Developer Console][apple-developer-console].
2. In Certificates, Identifiers & Profiles, select Identifiers.
3. Under Identifiers, select Pass Type IDs.
4. Click the plus (+) button.
5. Enter the description and pass type identifier, and click Submit.
6. Select the pass type identifier, then click Edit.
7. Click the Create Certificate button, then follow the instructions to create a pass signing certificate.
8. Download your new certificate. Double click to add this certificate to your Keychain.
9. Right-click on your certificate, then click Export.

## Options
| Name        | Type             | Required | Description                                   |
|-------------|------------------|----------|-----------------------------------------------|
| appleWWDRCA | Buffer \| String | Required | Buffer or Path of Apple's WWDR Certificate.   |
| signCert    | Buffer \| String | Required | Buffer or Path of Pass Signing Certificate.   |
| password    | String           | Optional | The Password of the Pass Signing Certificate. |

## Usage
```js
const PassSigner = require("passsigner-js")

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

[npm-image]: https://img.shields.io/npm/v/passsigner-js.svg
[npm-url]: https://npmjs.org/package/passsigner-js
[npm-downloads-image]: https://img.shields.io/npm/dm/passsigner-js.svg
[npm-downloads-url]: https://npmcharts.com/compare/passsigner-js?minimal=true
[apple-developer-console]: https://developer.apple.com/account
