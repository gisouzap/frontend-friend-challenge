'use client';

import { useCallback } from 'react';
import { toaster } from '@/components/ui/toaster';

const useToaster = () => {
  const showToaster = useCallback((description, type = 'success') => {
    toaster.create({
      description,
      type,
    });
  }, []);

  return showToaster;
};

export default useToaster;
