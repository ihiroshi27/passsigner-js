<img src="https://docs-assets.developer.apple.com/published/c104c9bff0/841b02dd-b78c-4cad-8da4-700761d34e14.png" width="50" height="50" alt="Apple Wallet Logo" align="left" />

# Pass Signer

Apple Pass Signer for NodeJS

## Install

```
$ npm install passsigner
```

## Usage

```js
const passsigner = require("passsigner")

const manifest = {
  "icon.png": "a05b6df8cdc27338f296856e367116b09d5bd63c",
  "icon@2x.png": "e4fda792e9e2f0b043e16006cfea70fffe610e51",
  "logo.png": "284d8cca28de0ebb2ca28ebdf5a8dc11c9e7543c",
  "logo@2x.png": "3343ada60b6b504c9b65a601e8b89a0566d5ca00",
  "pass.json": "6923eaca29e9ef3f97dacf9d0a0880efc368df28",
}

const signature = passsigner.sign(JSON.stringify(manifest), {
  appleWWDRCA: './AppleWWDRCA.cer',
  signCert: './Certificates.p12'
})
```
