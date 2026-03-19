"use client";

import { useState, useEffect } from 'react';

/**
 * Returns true only after the component has mounted on the client.
 * Use this to prevent hydration mismatches for browser-only logic
 * (e.g. random values, window references, etc.)
 */
export function useHasMounted(): boolean {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}
