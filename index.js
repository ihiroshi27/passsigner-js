const fs = require('fs')

const forge = require('node-forge')

class PassSigner {
  constructor (config) {
    if (typeof config !== 'object') throw new Error('Missing config')
    if (typeof config.appleWWDRCA !== 'string') throw new Error('Missing required config: appleWWDRCA')
    if (typeof config.signCert !== 'string') throw new Error('Missing required config: signCert')

    const appleWWDRCA = forge.pki.certificateFromAsn1(forge.asn1.fromDer(fs.readFileSync(config.appleWWDRCA, 'binary')))

    const p12Asn1 = forge.asn1.fromDer(fs.readFileSync(config.signCert, 'binary'))
    const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, config.password)

    const keyBags = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })
    const keyBag = keyBags[forge.pki.oids.pkcs8ShroudedKeyBag][0]

    const certBags = p12.getBags({ bagType: forge.pki.oids.certBag })
    const certBag = certBags[forge.pki.oids.certBag][0]

    this.appleWWDRCA = appleWWDRCA
    this.signKey = keyBag.key
    this.signCert = certBag.cert
  }

  sign (manifest) {
    if (typeof manifest !== 'string') throw new Error('Invalid parameter: manifest must be string')

    const p7 = forge.pkcs7.createSignedData()
    p7.content = manifest
    p7.addCertificate(this.appleWWDRCA)
    p7.addCertificate(this.signCert)
    p7.addSigner({
      key: this.signKey,
      certificate: this.signCert,
      digestAlgorithm: forge.pki.oids.sha1,
      authenticatedAttributes: [
        {
          type: forge.pki.oids.contentType,
          value: forge.pki.oids.data
        },
        {
          type: forge.pki.oids.messageDigest
        },
        {
          type: forge.pki.oids.signingTime
        }
      ]
    })
    p7.sign({ detached: true })

    return Buffer.from(forge.asn1.toDer(p7.toAsn1()).getBytes(), 'binary')
  }
}

module.exports = PassSigner