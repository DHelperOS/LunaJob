'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { _jobs } from 'src/_mock/_job-kr';

import { Carousel, CarouselThumb, CarouselThumbs, CarouselArrowFloatButtons, useCarousel } from 'src/components/carousel';
import { JobImageCard } from 'src/components/cards/JobImageCard';

// ----------------------------------------------------------------------

// Thumbs-y layout: vertical thumbs next to a main carousel.
export function JobThumbsYCarousel() {
  // Configure thumbs with vertical axis and show ~5 thumbs
  const carousel = useCarousel({
    slideSpacing: '16px',
    thumbs: { axis: 'y', slidesToShow: 5, slideSpacing: '8px' },
  });

  // Use a handful of mock jobs for now
  const jobs = _jobs.slice(0, 8);

  const bg = [
    '/assets/background/background-3.webp',
    '/assets/background/background-4.jpg',
    '/assets/background/background-5.webp',
    '/assets/background/background-6.webp',
    '/assets/background/background-7.webp',
  ];

  return (
    <Box
      sx={{
        gap: 2,
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 160px' },
        alignItems: { md: 'stretch' },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Carousel carousel={carousel} slotProps={{ container: { alignItems: 'stretch' } }}>
          {jobs.map((job, idx) => {
            const salaryText = job.salary.negotiable
              ? '급여 협의'
              : `${job.salary.min?.toLocaleString()}만원 ~ ${job.salary.max?.toLocaleString()}만원`;
            const locationText = job.company.fullAddress || job.locations?.[0] || '';
            const intro = (job.content || '').replace(/<[^>]+>/g, '').slice(0, 80);
            const image = bg[idx % bg.length];
            return (
              <JobImageCard
                key={job.id}
                image={image}
                companyName={job.company.name}
                intro={intro}
                salary={salaryText}
                location={locationText}
                href="/jobs"
                ratio="16/9"
              />
            );
          })}
        </Carousel>

        <CarouselArrowFloatButtons
          {...carousel.arrows}
          options={carousel.options}
          sx={{ display: { xs: 'none', sm: 'block' } }}
          slotProps={{
            prevBtn: { sx: { left: 0 } },
            nextBtn: { sx: { right: 0 } },
          }}
        />
      </Box>

      <Stack sx={{ display: { xs: 'none', md: 'flex' } }}>
        <CarouselThumbs
          ref={carousel.thumbs.thumbsRef}
          options={carousel.options?.thumbs}
          sx={{ height: '100%' }}
        >
          {jobs.map((job, index) => (
            <CarouselThumb
              key={job.id}
              index={index}
              src={job.company.logo}
              selected={index === carousel.thumbs.selectedIndex}
              onClick={() => carousel.thumbs.onClickThumb(index)}
              sx={{ borderRadius: 1.25 }}
            />
          ))}
        </CarouselThumbs>
      </Stack>
    </Box>
  );
}

// no-op
