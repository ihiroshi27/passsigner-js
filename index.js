const fs = require('fs')

const forge = require('node-forge')

exports.sign = (manifest, config) => {
  if (typeof manifest !== 'string') throw new Error('Invalid parameter: manifest must be string')
  if (config && typeof config.appleWWDRCA !== 'string') throw new Error('Missing required config: appleWWDRCA')
  if (config && typeof config.signCert !== 'string') throw new Error('Missing required config: signCert')

  const appleWWDRCA = forge.pki.certificateFromAsn1(forge.asn1.fromDer(fs.readFileSync(config.appleWWDRCA, 'binary')))

  const p12Asn1 = forge.asn1.fromDer(fs.readFileSync(config.signCert, 'binary'))
  const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1)

  const keyBags = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })
  const keyBag = keyBags[forge.pki.oids.pkcs8ShroudedKeyBag][0]

  const certBags = p12.getBags({ bagType: forge.pki.oids.certBag })
  const certBag = certBags[forge.pki.oids.certBag][0]

  const p7 = forge.pkcs7.createSignedData()
  p7.content = manifest
  p7.addCertificate(appleWWDRCA)
  p7.addCertificate(certBag.cert)
  p7.addSigner({
    key: keyBag.key,
    certificate: certBag.cert,
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
