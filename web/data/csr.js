/* Corporate Social Responsibility initiatives.

   Facts, figures and names are carried over from majestiqueproperties.com/csr;
   the copy is tightened for the web so each initiative reads in a breath rather
   than three dense paragraphs. Photographs came from the same page and live in
   public/images/csr/<album>/ so both apps serve them by URL rather than
   importing three dozen files through the bundler. */

export const CSR_INTRO = {
  label: 'Badlaav by Majestique',
  title: 'Change, Carried in Our Own Hands',
  lead:
    'Badlaav is the umbrella our community work sits under — river clean-ups, summer relief, ' +
    'and festivals shared with children. Different causes, one idea: a company that shapes a city ' +
    'owes something back to it.',
}

export const CSR_INITIATIVES = [
  {
    slug: 'beat-the-heat',
    year: '2026',
    label: 'Summer Relief',
    title: 'Beat The Heat',
    body: [
      'A three-day summer relief drive under Badlaav, held across high-footfall locations in Pune. Volunteers reached traffic police personnel, delivery partners, commuters, senior citizens, PMPML staff and everyone working outdoors through the city’s hardest heat.',
      'Over 30,000 bottles of lemonade and kokum juice were handed out, and the response — on the street and on social media — was warmer than we expected.',
    ],
    cover: '/images/csr/beat-the-heat/03.jpg',
    photos: [
      '/images/csr/beat-the-heat/01.jpg',
      '/images/csr/beat-the-heat/02.jpg',
      '/images/csr/beat-the-heat/03.jpg',
      '/images/csr/beat-the-heat/04.jpg',
      '/images/csr/beat-the-heat/05.jpg',
      '/images/csr/beat-the-heat/06.jpg',
      '/images/csr/beat-the-heat/07.jpg',
      '/images/csr/beat-the-heat/08.jpg',
      '/images/csr/beat-the-heat/09.jpg',
      '/images/csr/beat-the-heat/10.jpg',
      '/images/csr/beat-the-heat/11.jpg',
    ],
  },
  {
    slug: 'badlaav',
    year: '2025',
    label: 'River Restoration',
    title: 'Badlaav by Majestique',
    pullQuote: 'From Our Hands to the River’s Heart, We Bring Change.',
    body: [
      'Badlaav is not just an initiative — it is a shared mission to ignite meaningful transformation. In a city that has given us boundless opportunities, it is time we gave something back.',
      'We began with a simple act: cleaning our rivers. Every hand in the water is a step closer to restoring what the city grew up around.',
    ],
    cover: '/images/csr/badlaav/10.jpg',
    photos: [
      '/images/csr/badlaav/01.jpg',
      '/images/csr/badlaav/02.jpg',
      '/images/csr/badlaav/03.jpg',
      '/images/csr/badlaav/04.jpg',
      '/images/csr/badlaav/05.jpg',
      '/images/csr/badlaav/06.jpg',
      '/images/csr/badlaav/07.jpg',
      '/images/csr/badlaav/08.jpg',
      '/images/csr/badlaav/09.jpg',
      '/images/csr/badlaav/10.jpg',
    ],
  },
  {
    slug: 'diwali',
    year: '2023',
    label: 'Spreading Smiles',
    title: 'A Majestique Diwali',
    body: [
      'Diwali fell on Children’s Day, and we could think of no better way to spend it. A special celebration lit up our hearts and the lives of the children at Mahatma Gandhi School, Yerwada.',
    ],
    cover: '/images/csr/diwali/02.jpg',
    photos: [
      '/images/csr/diwali/01.jpg',
      '/images/csr/diwali/02.jpg',
      '/images/csr/diwali/03.jpg',
      '/images/csr/diwali/04.jpg',
      '/images/csr/diwali/05.jpg',
      '/images/csr/diwali/06.jpg',
      '/images/csr/diwali/07.jpg',
      '/images/csr/diwali/08.jpg',
      '/images/csr/diwali/09.jpg',
      '/images/csr/diwali/10.jpg',
      '/images/csr/diwali/11.jpg',
      '/images/csr/diwali/12.jpg',
    ],
  },
]

export const CSR_PHOTO_COUNT = CSR_INITIATIVES.reduce((n, i) => n + i.photos.length, 0)
