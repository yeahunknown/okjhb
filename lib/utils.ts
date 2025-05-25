import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generates a random Solana address (base58, 32 bytes)
export function randomSolanaAddress() {
  // Use browser crypto for secure random bytes
  const bytes = new Uint8Array(32)
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(bytes)
  } else {
    // fallback for SSR (not cryptographically secure)
    for (let i = 0; i < 32; i++) bytes[i] = Math.floor(Math.random() * 256)
  }
  // Base58 alphabet
  const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
  let num = BigInt('0x' + Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join(''))
  let out = ''
  while (num > 0) {
    const rem = num % 58n
    num = num / 58n
    out = alphabet[Number(rem)] + out
  }
  // Pad with leading 1s for zeros
  for (let i = 0; i < bytes.length && bytes[i] === 0; i++) out = '1' + out
  // Solana addresses are always 32 bytes, so pad if needed
  return out.padStart(32, '1')
}
