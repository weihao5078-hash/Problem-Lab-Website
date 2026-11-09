'use client';

import React from 'react';

interface ZigZagWaveProps {
  className?: string;
  color?: string;
  secondaryColor?: string;
  variant?: 'double' | 'single' | 'circuit';
  width?: number;
  height?: number;
}

export default function ZigZagWave({
  className = '',
  color = '#223d71',
  secondaryColor = '#7f9af4',
  variant = 'double',
  width = 180,
  height = 48,
}: ZigZagWaveProps) {
  if (variant === 'single') {
    return (
      <svg
        viewBox="0 0 160 40"
        className={`inline-block ${className}`}
        style={{ width: `${width}px`, height: `${height}px` }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M6 20 L24 8 L42 32 L60 8 L78 32 L96 8 L114 32 L132 8 L154 20"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === 'circuit') {
    return (
      <svg
        viewBox="0 0 200 60"
        className={`inline-block ${className}`}
        style={{ width: `${width}px`, height: `${height}px` }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M10 30 L40 30 L55 12 L75 48 L95 12 L115 48 L130 30 L190 30"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="30" r="4" fill={secondaryColor} />
        <circle cx="190" cy="30" r="4" fill={secondaryColor} />
      </svg>
    );
  }

  // Double zig-zag matching sketch exactly (wavy teeth with filled hollow inside)
  return (
    <svg
      viewBox="0 0 180 50"
      className={`inline-block drop-shadow-xs ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Top zigzag line */}
      <path
        d="M8 25 L22 10 L38 30 L54 10 L70 30 L86 10 L102 30 L118 10 L134 30 L150 10 L172 25"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bottom parallel zigzag line */}
      <path
        d="M8 35 L22 20 L38 40 L54 20 L70 40 L86 20 L102 40 L118 20 L134 40 L150 20 L172 35"
        stroke={secondaryColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
}
