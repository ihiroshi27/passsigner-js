# signer

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

const signature = passsigner.sign(manifest, {
  appleWWDRCA: './AppleWWDRCA.cer',
  signCert: './Certificates.p12'
})
```
