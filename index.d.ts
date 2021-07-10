declare class PassSigner {
  constructor (config: {
    appleWWDRCA: string | Buffer,
    signCert: string | Buffer,
    password?: string
  })
  sign (manifest: string): Buffer
}

export default PassSigner