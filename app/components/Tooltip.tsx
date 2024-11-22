'use client';

import React from 'react';
import tippy, { Instance, Props } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { useEffect } from 'react';

interface TooltipProps {
  content: string;
  placement?: Props['placement'];
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, placement = 'bottom', children }) => {
  const tooltipRef = React.useRef<Instance | null>(null);

  useEffect(() => {
    tooltipRef.current = tippy('.tooltip', {
      content,
      placement,
      theme: 'custom',
      followCursor: true,

    });
  }, [content, placement]);

  return <div className="tooltip">{children}</div>;
};

export default Tooltip;