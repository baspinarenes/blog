import { ImageResponse } from 'next/og'
import React from 'react'
import { author, description, url } from '@/configs';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage() {
  const geistRegular = fetch(
    new URL('./fonts/Geist-Regular.otf', url)
  ).then((res) => res.arrayBuffer())
  const geistMedium = fetch(
    new URL('./fonts/Geist-Medium.otf', url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div style={{
        background: 'white',
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: 64,
        flexDirection: 'column',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          paddingBottom: 32,
        }}>
          <div style={{
            display: 'flex',
            justifyContent: "center",
            fontSize: 60,
            width: '82%',
            textAlign: 'center',
            lineHeight: 1,
            fontWeight: 800,
            marginBottom: 30,
          }}>
            {author.name} {author.surname}'s Blog
          </div>
          <div style={{
            display: 'flex',
            justifyContent: "center",
            fontSize: 36,
            color: '#9ca3af',
            textAlign: 'center',
            width: '80%',
          }}>
            {description}
          </div>
        </div>
        <img
          width="280"
          height="280"
          alt='Scream'
          src={`${url}/scream.svg`}
          style={{
            justifyContent: "center",
            position: "absolute",
            left: -40,
            bottom: -50,
            transform: "rotate(12deg)",
          }}
        />
      </div >
    ),
    // ImageResponse options
    {
      ...size,
      fonts: [
        {
          name: 'Geist',
          data: await geistRegular,
          weight: 400
        },
        {
          name: 'Geist',
          data: await geistMedium,
          weight: 500,
        },
      ]
    }
  )
}



