import img27Grand      from '../assets/project_spolights/27GrandRecidencies.jpg'
import img38Park       from '../assets/project_spolights/38park.webp'
import imgAravali      from '../assets/project_spolights/Aravali.jpg'
import imgCrown        from '../assets/project_spolights/Crown.jpg'
import imgEvolvus      from '../assets/project_spolights/evolvus-by-majestique-landmarks.webp'
import imgKrutarth     from '../assets/project_spolights/Krutharth.jpg'
import imgMarbella     from '../assets/project_spolights/Majestique_marbella.jpg'
import imgMemories     from '../assets/project_spolights/Majestique_Memories.jpg'
import imgMrugavarsha  from '../assets/project_spolights/Majestique_mrugavarsha.jpg'
import imgNewFriends   from '../assets/project_spolights/New_Friends_kothrud.webp'
import imgOrnate       from '../assets/project_spolights/Majestique_ornet.jpg'
import imgRhythmCounty from '../assets/project_spolights/Rythem_county.webp'
import imgSignature    from '../assets/project_spolights/Signature-Towers-Pune.jpg'
import imgSwapnangan   from '../assets/project_spolights/Majestique_Swapnangan.jpg'
import imgTowers       from '../assets/project_spolights/Majestique_Towers_Kharadi.webp'
import imgTwilight     from '../assets/project_spolights/twilight.webp'
import imgEphelia      from '../assets/project_spolights/Majestique-Ephelia.jpg'
import imgKothrudMall  from '../assets/project_spolights/Kothrud_central_mall.jpg'

export const CATEGORIES = ['All', 'Residential', 'Commercial']

/* ── Ongoing projects — residential ones link out to their own project microsite;
   commercial ones (no microsite yet) route to the general enquiry form ──────── */
export const ONGOING_PROJECTS = [
  {
    id: 'op-1',
    title: '27 Grand Residences',
    location: 'Patil Nagar, Balewadi, Pune',
    tagline: 'Elevated Living Beyond the Ordinary',
    config: '2 & 3 BHK',
    category: 'Residential',
    image: img27Grand,
    url: 'https://27grand-residences.majestiquelandmarks.com',
  },
  {
    id: 'op-2',
    title: '38 Park',
    location: 'Undri, Pune',
    tagline: 'Where Nature, Connectivity & Comfort Come Together',
    config: '2 & 3 BHK',
    category: 'Residential',
    image: img38Park,
    url: 'https://38park.majestiquelandmarks.com/',
  },
  {
    id: 'op-3',
    title: 'Majestique Aravali',
    location: 'Warje, Pune',
    tagline: 'Where Nature Inspires Luxury Living',
    config: '2 & 3 BHK',
    category: 'Residential',
    image: imgAravali,
    url: 'https://aravali.majestiquelandmarks.com/',
  },
  {
    id: 'op-4',
    title: 'The Crown by Majestique',
    location: 'Gultekdi, Pune',
    tagline: 'An Address Reserved for the Extraordinary',
    config: '3 & 4 BHK',
    category: 'Residential',
    image: imgCrown,
    url: 'https://the-crown.majestiquelandmarks.com/',
  },
  {
    id: 'op-5',
    title: 'Evolvus by Majestique',
    location: 'Kharadi, Pune',
    tagline: 'Evolving Spaces. Enduring Luxury.',
    config: '2, 3 & 4 BHK',
    category: 'Residential',
    image: imgEvolvus,
    url: 'https://evolvus.majestiquelandmarks.com/',
  },
  {
    id: 'op-6',
    title: 'Krutarth by Majestique',
    location: 'Market Yard, Pune',
    tagline: 'Where Prestige Meets the Heart of Pune',
    config: '3 & 4 BHK',
    category: 'Residential',
    image: imgKrutarth,
    url: 'https://krutarth.majestiquelandmarks.com/',
  },
  {
    id: 'op-7',
    title: 'Majestique Marbella',
    location: 'Kharadi, Pune',
    tagline: 'The Address Where Life Finds Its Perfect Balance',
    config: '2 & 3 BHK',
    category: 'Residential',
    image: imgMarbella,
    url: 'https://marbella.majestiquelandmarks.com/',
  },
  {
    id: 'op-8',
    title: 'Majestique Memories',
    location: 'NIBM Annex, Pune',
    tagline: 'A Cherished Address for Modern Family Living',
    config: '2 & 3 BHK',
    category: 'Residential',
    image: imgMemories,
    url: 'https://memories.majestiquelandmarks.com/',
  },
  {
    id: 'op-9',
    title: 'Majestique Mrugavarsha',
    location: 'Dhayari, Pune',
    tagline: 'Where Every Day Begins with Peace',
    config: '2 & 3 BHK',
    category: 'Residential',
    image: imgMrugavarsha,
    url: 'https://mrugavarsha.majestiquelandmarks.com/',
  },
  {
    id: 'op-10',
    title: 'New Friends by Majestique',
    location: 'Kothrud, Pune',
    tagline: 'Timeless Living in the Heart of Kothrud',
    config: '2, 3 & 4 BHK',
    category: 'Residential',
    image: imgNewFriends,
    url: 'https://newfriendskothrud.majestiquelandmarks.com/',
  },
  {
    id: 'op-11',
    title: 'The Ornate by Majestique',
    location: 'Baner, Pune',
    tagline: 'A Masterpiece of Timeless Luxury in Baner',
    config: '3, 3.5, 4 & 5 BHK',
    category: 'Residential',
    image: imgOrnate,
    url: 'https://ornate.majestiquelandmarks.com/',
  },
  {
    id: 'op-12',
    title: 'Majestique Rhythm County',
    location: 'Hadapsar, Pune',
    tagline: "A Master-Planned Township Designed Around Life's Perfect Rhythm",
    config: '2 & 3 BHK',
    category: 'Residential',
    image: imgRhythmCounty,
    url: 'https://rhythmcounty.majestiquelandmarks.com/',
  },
  {
    id: 'op-13',
    title: 'Majestique Signature Towers',
    location: 'Balewadi, Pune',
    tagline: 'Where Luxury Meets The Pulse Of Balewadi',
    config: '2 & 3 BHK',
    category: 'Residential',
    image: imgSignature,
    url: 'https://signaturetowers.majestiquelandmarks.com/',
  },
  {
    id: 'op-14',
    title: 'Majestique Swapnangan',
    location: 'Dhayari, Pune',
    tagline: 'Dreams Take Shape in a Home Designed for Tomorrow',
    config: '2 & 3 BHK',
    category: 'Residential',
    image: imgSwapnangan,
    url: 'https://swapnangan.majestiquelandmarks.com/',
  },
  {
    id: 'op-15',
    title: 'Majestique Towers',
    location: 'Kharadi, Pune',
    tagline: 'Elevated Living. Exceptional Connectivity.',
    config: '2 & 3 BHK',
    category: 'Residential',
    image: imgTowers,
    url: 'https://towers.majestiquelandmarks.com/',
  },
  {
    id: 'op-16',
    title: 'Twilight by Majestique',
    location: 'Balewadi, Pune',
    tagline: 'Where Sophistication Meets Urban Excellence',
    config: '3 & 4 BHK',
    category: 'Residential',
    image: imgTwilight,
    url: 'https://twilight.majestiquelandmarks.com/',
  },
  {
    id: 'op-17',
    title: 'Majestique Ephelia',
    location: 'Central NIBM, Pune',
    tagline: 'Elegant Living. Connected Lifestyle.',
    config: '3 & 4 BHK',
    category: 'Residential',
    image: imgEphelia,
    url: 'https://ephelia.majestiquelandmarks.com/',
  },
  {
    id: 'op-18',
    title: 'Kothrud Central Mall',
    location: 'Kothrud, Pune',
    tagline: "Kothrud's Premier Retail and Commercial Destination",
    config: 'Commercial',
    category: 'Commercial',
    image: imgKothrudMall,
    url: 'https://kothrudcentralmall.majestiquelandmarks.com',
  },
]
