'use client'
import { FileViewer } from '@/components/FileViewer'
import { SEO } from '@/components/SEO'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

export default function ViewerPage() {
  const pathname = usePathname()
  const params = useParams()

  const filename = params.filename
  const description = params.description
  
  return(
    <React.Fragment>
        <SEO
            description={description?.toString()}
            image="https://bipshow.com/bannerPrincipal.svg"
            nome={`BipShow - ${filename?.toString()}`}
            imageTwo="https://bipshow.com/bannerPrincipal.svg"
        />
        <FileViewer isAppView={true} filename={filename?.toString()!} title={description?.toString()!} />
    </React.Fragment>
  )

}