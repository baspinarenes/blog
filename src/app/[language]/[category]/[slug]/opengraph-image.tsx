import { ImageResponse } from 'next/og'
import React from 'react'
import { SlugPageProps } from '@/models';
import { getPostBySlug } from '@/libraries/api';
import { author, url } from '@/configs';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({ params }: SlugPageProps) {
  const post = await getPostBySlug({
    category: params.category,
    language: params.language,
    slug: params.slug
  });

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
          alignItems: 'center',
          justifyContent: "space-between",
          position: 'absolute',
          padding: "32px 50px",
          left: 0,
          top: 0,
          right: 0,
          color: '#9ca3af',
          fontSize: 32,
        }}>
          <div style={{
            display: 'flex',
          }}>{author.name} {author.surname} - {author.title}</div>
          <div style={{
            display: 'flex',
            textTransform: "capitalize"
          }}>{post.category}</div>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyItems: "center",
          width: '100%',
        }}>
          {post.tag && <img
            height={100}
            width={100}
            alt='Tag logo'
            src={`${url}/logo/${post.tag}.svg`}
            style={{
              justifyContent: "center",
              marginBottom: 30,
              fontSize: 60,
              height: 100,
            }}
          />}
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
            {post.title}
          </div>
          <div style={{
            display: 'flex',
            justifyContent: "center",
            fontSize: 36,
            color: '#9ca3af',
            textAlign: 'center',
            width: '70%',
          }}>
            {post.description}
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



