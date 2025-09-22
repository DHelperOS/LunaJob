'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

//

import { _jobs } from 'src/_mock/_job-kr';
import { Carousel, useCarousel, CarouselDotButtons, CarouselThumbs, CarouselThumb } from 'src/components/carousel';
import { JobImageCard } from 'src/components/cards/JobImageCard';

// ----------------------------------------------------------------------

export function JobThumbsXCarousel() {
  const carousel = useCarousel({
    slideSpacing: '16px',
    slidesToShow: { xs: 1.1, sm: 2, md: 3 },
    thumbs: { slidesToShow: 'auto' },
  });

  // Build data: cover image + labels from jobs
  const covers = [
    '/assets/background/background-3.webp',
    '/assets/background/background-4.jpg',
    '/assets/background/background-5.webp',
    '/assets/background/background-6.webp',
    '/assets/background/background-7.webp',
  ];

  const data = _jobs.slice(0, 8).map((job, idx) => ({
    id: job.id,
    title: job.title,
    description: (job.content || '').replace(/<[^>]+>/g, ''),
    coverUrl: covers[idx % covers.length],
    company: job.company?.name ?? '',
    salary: job.salary?.negotiable
      ? '급여 협의'
      : `${(job.salary.min || 0).toLocaleString()}만원 ~ ${(job.salary.max || 0).toLocaleString()}만원`,
    location: job.company?.fullAddress || job.locations?.[0] || '',
  }));

  return (
    <Box sx={{ maxWidth: { xs: '100%', sm: 960, md: 1120 }, mx: 'auto', px: { xs: 2, sm: 0 } }}>
      <Typography variant="h3" sx={{ mb: 1.5 }}>
        프리미엄 광고
      </Typography>
      <Box sx={{ mb: 2.5, position: 'relative' }}>
        <Carousel carousel={carousel}>
          {data.map((item) => (
            <JobImageCard
              key={item.id}
              image={item.coverUrl}
              companyName={item.company}
              intro={item.description}
              salary={item.salary}
              location={item.location}
              href="/jobs"
              ratio="16/9"
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
      {/* Thumbs-x: Bottom horizontal thumbnails */}
      <CarouselThumbs ref={carousel.thumbs.thumbsRef} options={carousel.options?.thumbs} sx={{ width: { xs: 1, sm: 420 }, mx: 'auto' }}>
        {data.map((item, index) => (
          <CarouselThumb
            key={item.id}
            index={index}
            src={item.coverUrl}
            selected={index === carousel.thumbs.selectedIndex}
            onClick={() => carousel.thumbs.onClickThumb(index)}
            sx={{ width: { xs: 48, sm: 64 }, height: { xs: 48, sm: 64 } }}
          />
        ))}
      </CarouselThumbs>
    </Box>
  );
}

// ----------------------------------------------------------------------
