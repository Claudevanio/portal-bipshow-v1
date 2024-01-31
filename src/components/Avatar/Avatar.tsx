'use client'
import Image from 'next/image'
import React from 'react'
import { GradientBorder } from '..'

export const Avatar = ({src, size="small", className = ''}:{src?: string, size?:"medium" | "small" | "normal", className?: string }) => {
  return(
      <Image
        className={(size=="small" ? 'w-12 h-12 rounded-full bg-background p-2 border-2 border-gray' : size=="medium"? "w-40 h-40 rounded-full bg-background p-2" :'w-60 h-60 rounded-full bg-background p-2') + className }
        src={src ?? '/Person.svg'}
        alt="Avatar"
        width={size=="small"? 20 : size=="medium"? 160 :  240}
        height={size=="small"? 20 : size=="medium"? 160 :  240}
      />
  )
}