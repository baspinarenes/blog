import { SlugPageProps } from '@/models'
import { ImageResponse } from 'next/og'
import { url } from '@/configs'
import { getRegularFont, getBoldFont } from '@/libraries/fonts'
import { getPostBySlug } from '@/libraries/api'

// export const runtime = 'edge'

export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }: SlugPageProps) {
  const [regularFontData, boldFontData] = await Promise.all([getRegularFont(), getBoldFont()])

  const post = await getPostBySlug({
    category: params.category,
    language: params.language,
    slug: params.slug
  });

  console.log("post", post)

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: 'white',
          display: 'flex',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          padding: 64,
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          paddingBottom: 32,
        }}>
          <img
            height={120}
            src={post.logo}
            style={{
              justifyContent: "center",
              marginBottom: 30,
            }}
          />
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
            fontSize: 32,
            color: '#a2a2a2',
            textAlign: 'center',
            width: '70%',
          }}>
            {post.description}
          </div>
        </div>
        <img
          width="280"
          height="280"
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
          name: 'Geist Sans',
          data: regularFontData,
          style: 'normal',
          weight: 400
        },
        {
          name: 'Geist Sans',
          data: boldFontData,
          style: 'normal',
          weight: 500
        }
      ]
    }
  )
}