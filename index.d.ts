declare class PassSigner {
  constructor (config: { appleWWDRCA: string, signCert: string, password?: string })
  sign (manifest: string): Buffer
}

export default PassSigner