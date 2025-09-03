'use client';

import type { IJobItem, IJobFilters } from 'src/types/job';

import { orderBy } from 'es-toolkit';
import { useState, useCallback } from 'react';
import { useBoolean, useSetState } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import {
  _jobs,
  _roles,
  JOB_SORT_OPTIONS,
  JOB_BENEFIT_OPTIONS,
  JOB_EXPERIENCE_OPTIONS,
  JOB_EMPLOYMENT_TYPE_OPTIONS,
} from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { JobList } from '../job-list';
import { JobSort } from '../job-sort';
import { JobSearch } from '../job-search';
import { JobFilters } from '../job-filters';
import { JobFiltersResult } from '../job-filters-result';

// ----------------------------------------------------------------------

export function JobListView() {
  const openFilters = useBoolean();

  const [sortBy, setSortBy] = useState('latest');

  const filters = useSetState<IJobFilters>({
    roles: [],
    locations: [],
    benefits: [],
    experience: 'all',
    employmentTypes: [],
  });
  const { state: currentFilters } = filters;

  const dataFiltered = applyFilter({
    inputData: _jobs,
    filters: currentFilters,
    sortBy,
  });

  const canReset =
    currentFilters.roles.length > 0 ||
    currentFilters.locations.length > 0 ||
    currentFilters.benefits.length > 0 ||
    currentFilters.employmentTypes.length > 0 ||
    currentFilters.experience !== 'all';

  const notFound = !dataFiltered.length && canReset;

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  const renderFilters = () => (
    <Box
      sx={{
        gap: 2,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'center' },
      }}
    >
      <JobSearch redirectPath={(id: string) => paths.dashboard.job.details(id)} />

      <Box sx={{ gap: 1.5, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
        <JobFilters
          filters={filters}
          canReset={canReset}
          open={openFilters.value}
          onOpen={openFilters.onTrue}
          onClose={openFilters.onFalse}
          options={{
            roles: _roles,
            benefits: JOB_BENEFIT_OPTIONS.map((option) => option.label),
            employmentTypes: JOB_EMPLOYMENT_TYPE_OPTIONS.map((option) => option.label),
            experiences: ['all', ...JOB_EXPERIENCE_OPTIONS.map((option) => option.label)],
          }}
        />

        <JobSort sort={sortBy} onSort={handleSortBy} sortOptions={JOB_SORT_OPTIONS} />
      </Box>
    </Box>
  );

  const renderResults = () => (
    <JobFiltersResult filters={filters} totalResults={dataFiltered.length} />
  );

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
        <CustomBreadcrumbs
          heading="채용공고"
          links={[
            { name: '홈', href: '/' },
            { name: '채용공고' },
          ]}
          sx={{ mb: { xs: 3, md: 4 } }}
        />

        <Stack spacing={3} sx={{ mb: { xs: 3, md: 4 } }}>
          {renderFilters()}
          {canReset && renderResults()}
        </Stack>

        {notFound && <EmptyContent filled sx={{ py: 10 }} />}

        <JobList jobs={dataFiltered} />
    </Container>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  sortBy: string;
  filters: IJobFilters;
  inputData: IJobItem[];
};

function applyFilter({ inputData, filters, sortBy }: ApplyFilterProps) {
  const { employmentTypes, experience, roles, locations, benefits } = filters;

  // Sort by
  if (sortBy === 'latest') {
    inputData = orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    inputData = orderBy(inputData, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    inputData = orderBy(inputData, ['totalViews'], ['desc']);
  }

  // Filters
  if (employmentTypes.length) {
    inputData = inputData.filter((job) =>
      job.employmentTypes.some((item) => employmentTypes.includes(item))
    );
  }

  if (experience !== 'all') {
    inputData = inputData.filter((job) => job.experience === experience);
  }

  if (roles.length) {
    inputData = inputData.filter((job) => roles.includes(job.role));
  }

  if (locations.length) {
    inputData = inputData.filter((job) => job.locations.some((item) => locations.includes(item)));
  }

  if (benefits.length) {
    inputData = inputData.filter((job) => job.benefits.some((item) => benefits.includes(item)));
  }

  return inputData;
}
