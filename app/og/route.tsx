import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const revalidate = 3600 // 1 hour

export function GET(request: Request) {
  let title = 'Jayesh Chotaliya | Embedded Software Engineer'

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full items-center justify-center bg-neutral-950">
        <div tw="flex flex-col w-full py-12 px-12 items-start justify-center">
          <h2 tw="flex flex-col text-5xl font-bold tracking-tight text-white mb-4">
            {title}
          </h2>
          <p tw="text-2xl text-neutral-400">
            Embedded Software Engineer @ ABB | IoT & Cloud Connectivity
          </p>
          <div tw="flex mt-8 text-xl text-blue-400">
            jayeshchotaliya.in
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
