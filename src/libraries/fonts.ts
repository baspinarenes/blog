import { Inter, JetBrains_Mono } from "next/font/google";
import { cache } from 'react'
import { readFile } from 'node:fs/promises'

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
  variable: "--font-text",
});

export const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--font-code",
});

export const getRegularFont = cache(async () => {
  const response = await readFile('src/assets/fonts/Geist-Regular.otf')
  const font = Uint8Array.from(response).buffer

  return font
})

export const getBoldFont = cache(async () => {
  const response = await readFile('src/assets/fonts/Geist-Medium.otf')
  const font = Uint8Array.from(response).buffer
  return font
})