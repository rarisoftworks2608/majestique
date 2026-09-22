/* Employee engagement albums. The photographs live in
   public/images/engagement/<album>/ so both apps serve them by URL rather
   than importing several dozen files through the bundler. */
export const ENGAGEMENT_ALBUMS = [
  {
    slug: 'ganpati-2025',
    title: "Ganpati Celebrations",
    year: '2025',
    photos: [
      '/images/engagement/ganpati-2025/01.jpg',
      '/images/engagement/ganpati-2025/02.jpg',
      '/images/engagement/ganpati-2025/03.jpg',
      '/images/engagement/ganpati-2025/04.jpg',
      '/images/engagement/ganpati-2025/05.jpg',
      '/images/engagement/ganpati-2025/06.jpg',
    ],
  },
  {
    slug: 'ganpati-2024',
    title: "Ganpati Celebrations",
    year: '2024',
    photos: [
      '/images/engagement/ganpati-2024/01.jpg',
      '/images/engagement/ganpati-2024/02.jpg',
      '/images/engagement/ganpati-2024/03.jpg',
      '/images/engagement/ganpati-2024/04.jpg',
      '/images/engagement/ganpati-2024/05.jpg',
      '/images/engagement/ganpati-2024/06.jpg',
    ],
  },
  {
    slug: 'mpl-2025',
    title: "MPL",
    year: '2025',
    photos: [
      '/images/engagement/mpl-2025/01.jpg',
      '/images/engagement/mpl-2025/02.jpg',
      '/images/engagement/mpl-2025/03.jpg',
      '/images/engagement/mpl-2025/04.jpg',
      '/images/engagement/mpl-2025/05.jpg',
      '/images/engagement/mpl-2025/06.jpg',
      '/images/engagement/mpl-2025/07.jpg',
      '/images/engagement/mpl-2025/08.jpg',
      '/images/engagement/mpl-2025/09.jpg',
      '/images/engagement/mpl-2025/10.jpg',
    ],
  },
  {
    slug: 'mpl-2024',
    title: "MPL",
    year: '2024',
    photos: [
      '/images/engagement/mpl-2024/01.jpg',
      '/images/engagement/mpl-2024/02.jpg',
      '/images/engagement/mpl-2024/03.jpg',
      '/images/engagement/mpl-2024/04.jpg',
      '/images/engagement/mpl-2024/05.jpg',
      '/images/engagement/mpl-2024/06.jpg',
      '/images/engagement/mpl-2024/07.jpg',
      '/images/engagement/mpl-2024/08.jpg',
      '/images/engagement/mpl-2024/09.jpg',
      '/images/engagement/mpl-2024/10.jpg',
      '/images/engagement/mpl-2024/11.jpg',
    ],
  },
  {
    slug: 'womens-day-2026',
    title: "Women's Day",
    year: '2026',
    photos: [
      '/images/engagement/womens-day-2026/01.jpg',
      '/images/engagement/womens-day-2026/02.jpg',
      '/images/engagement/womens-day-2026/03.jpg',
      '/images/engagement/womens-day-2026/04.jpg',
    ],
  },
  {
    slug: 'womens-day-2025',
    title: "Women's Day",
    year: '2025',
    photos: [
      '/images/engagement/womens-day-2025/01.jpg',
      '/images/engagement/womens-day-2025/02.jpg',
      '/images/engagement/womens-day-2025/03.jpg',
      '/images/engagement/womens-day-2025/04.jpg',
      '/images/engagement/womens-day-2025/05.jpg',
      '/images/engagement/womens-day-2025/06.jpg',
      '/images/engagement/womens-day-2025/07.jpg',
      '/images/engagement/womens-day-2025/08.jpg',
      '/images/engagement/womens-day-2025/09.jpg',
      '/images/engagement/womens-day-2025/10.jpg',
      '/images/engagement/womens-day-2025/11.jpg',
    ],
  },
]

export const ENGAGEMENT_PHOTO_COUNT = ENGAGEMENT_ALBUMS.reduce((n, a) => n + a.photos.length, 0)
