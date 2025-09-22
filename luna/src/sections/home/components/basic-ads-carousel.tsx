'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { _jobs } from 'src/_mock/_job-kr';
import { JobImageCard } from 'src/components/cards/JobImageCard';
import { Carousel, CarouselDotButtons, useCarousel } from 'src/components/carousel';

// ----------------------------------------------------------------------

export function BasicAdsCarousel() {
  const carousel = useCarousel({ slideSpacing: '16px', slidesToShow: { xs: 1.2, sm: 3, md: 4 } });

  const covers = [
    '/assets/background/background-3.webp',
    '/assets/background/background-4.jpg',
    '/assets/background/background-5.webp',
    '/assets/background/background-6.webp',
    '/assets/background/background-7.webp',
  ];

  const data = _jobs.slice(0, 12).map((job, idx) => ({
    id: job.id,
    image: covers[idx % covers.length],
    company: job.company?.name ?? '',
    intro: (job.content || '').replace(/<[^>]+>/g, ''),
    salary: job.salary?.negotiable
      ? '급여 협의'
      : `${(job.salary.min || 0).toLocaleString()}만원 ~ ${(job.salary.max || 0).toLocaleString()}만원`,
    location: job.company?.fullAddress || job.locations?.[0] || '',
  }));

  return (
    <Box sx={{ maxWidth: { xs: '100%', sm: 1120 }, mx: 'auto', px: { xs: 2, sm: 0 } }}>
      <Typography variant="h4" sx={{ mb: 1.5 }}>
        베이직 광고
      </Typography>

      <Box sx={{ position: 'relative' }}>
        <Carousel carousel={carousel}>
          {data.map((item) => (
            <JobImageCard
              key={item.id}
              image={item.image}
              companyName={item.company}
              intro={item.intro}
              salary={item.salary}
              location={item.location}
              href="/jobs"
              ratio="4/3"
            />
          ))}
        </Carousel>

        <Box sx={{ position: 'absolute', top: 12, left: 12, color: 'common.white' }}>
          <CarouselDotButtons
            scrollSnaps={carousel.dots.scrollSnaps}
            selectedIndex={carousel.dots.selectedIndex}
            onClickDot={carousel.dots.onClickDot}
            variant="circular"
            gap={6}
            slotProps={{ dot: { size: 8 } }}
          />
        </Box>
      </Box>
    </Box>
  );
}

