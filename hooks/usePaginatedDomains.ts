import { DomainStatus, useGetDomainsQuery } from '@/services/api';
import { useState } from 'react';

export const usePaginatedDomains = (status: DomainStatus) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useGetDomainsQuery({page: currentPage, status});

  const domains = data?.data || [];
  const pagination = data?.meta.pagination;

  const nextPage = () => {
    if (pagination?.links.next) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return {
    domains,
    pagination,
    error,
    isLoading,
    nextPage,
    currentPage,
  };
};
