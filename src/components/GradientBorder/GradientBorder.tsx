import React, { ReactNode } from 'react';

export const GradientBorder = ({children, className, borderStyle, innerStyle} :{children: ReactNode, className?: string, borderStyle?: React.CSSProperties, innerStyle?: React.CSSProperties}) => (  
  <div className={(className ? className : '' ) + "rounded-xl w-full p-[2px] bg-gradient"}
    style= {borderStyle}
  >
      <div className={(className ? className : '' )+ "flex flex-col justify-between h-full px-4 py-2 bg-background text-primary rounded-xl"}
        style= {innerStyle}
      >
        {
          children
        }
      </div>
  </div>
)
