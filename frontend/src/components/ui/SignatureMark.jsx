// Geometric SVG signature mark — abstract "N" formed by a folded triangle
// with a teal accent dot. Stroke-only on hover for crispness at any size.
import React from 'react';

export default function SignatureMark({ size = 28, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      aria-label="Nibras signature mark"
      role="img"
    >
      <path
        d="M8 22 L8 10 L16 10 L24 22 Z"
        fill="none"
        stroke="#00c9a7"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="10" r="1.8" fill="#00c9a7" />
    </svg>
  );
}
