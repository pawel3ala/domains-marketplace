// src/hooks/usePaginatedDomains.ts

import { useGetDomainsQuery } from '@/services/api';
import { useState } from 'react';

export const usePaginatedDomains = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading } = useGetDomainsQuery(currentPage);

  const domains = data?.data || [];
  const pagination = data?.meta.pagination;

  const nextPage = () => {
    if (pagination?.links.next) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (pagination?.current_page > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return {
    domains,
    pagination,
    error,
    isLoading,
    nextPage,
    prevPage,
    currentPage,
  };
};
