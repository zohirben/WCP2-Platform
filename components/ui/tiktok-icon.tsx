import React from "react";

// TikTok icon component
export const TikTok = ({ size = 24, ...props }: { size?: number; [key: string]: any }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.6,5.82c-1.5-1.02-2.5-2.73-2.5-4.67h-3.56v16.2c0,1.85-1.51,3.35-3.36,3.35c-1.85,0-3.35-1.5-3.35-3.35 c0-1.85,1.5-3.35,3.35-3.35c0.18,0,0.36,0.03,0.53,0.06v-3.6C7.2,10.44,6.74,10.38,6.25,10.38c-3.45,0-6.25,2.8-6.25,6.25 s2.8,6.25,6.25,6.25s6.25-2.8,6.25-6.25v-8.92c1.87,1.37,4.16,2.18,6.65,2.18v-3.57C18.23,6.31,17.42,6.14,16.6,5.82z"
        fill="currentColor"
      />
    </svg>
  );
};

export default TikTok;
