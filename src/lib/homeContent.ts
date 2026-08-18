export type HomeStat = {
  value: string;
  label: string;
};

export type HomeProduct = {
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
};

export type HomePartner = {
  name: string;
  logo: string;
};

export type HomeClientSlide = {
  src: string;
  alt: string;
};

export const HOME_STATS: HomeStat[] = [
  { value: "50+", label: "Years of experience" },
  { value: "100+", label: "Dedicated employees" },
  { value: "3,000+", label: "Happy clients" },
  { value: "10,000+", label: "Generator installations" },
  { value: "500+", label: "Solar installations" },
];

export const HOME_PRODUCTS: HomeProduct[] = [
  {
    title: "Multiline Generators",
    description:
      "Diesel generators with Perkins and Cummins engines, on-site warranty and rental fleet support.",
    href: "/generators",
    image: "/images/multiline-icon.png",
    imageAlt: "Multiline diesel generator",
  },
  {
    title: "Solar",
    description:
      "Licensed net-metered solar installations with engineering-led sizing and after-sales support.",
    href: "/solar",
    image: "/images/solar-plates.jpg",
    imageAlt: "Solar panel array",
  },
  {
    title: "EV Charging",
    description:
      "AC and DC charging systems for homes, workplaces, fleets and public sites across Pakistan.",
    href: "/ev-chargers",
    image: "/images/products/22kw-jensonn-ac.png",
    imageAlt: "22kW EV AC charger",
  },
];

export const ABOUT_MULTILINE_PARAGRAPHS: readonly string[] = [
  "Multiline is brainchild of the late Mr. M. A. Khaliq who was a highly qualified electrical engineer. During his service he had the opportunity to enhance his qualification in UK and then in the USA. Later on he got the opportunity to work with SIEMENS in Erlangen, Germany, where he really got interested in manufacturing. He started Multiline in Lahore in 1975 where he designed and assembled battery chargers, parts of telecom equipment and radio communication equipment, all with great success.",
  "Multiline produced its first diesel generator with sound-proof canopy in 1996. The product was offered with complete on-site warranty. A call center was also established for after sales support. This was quite un-common at the time and was really appreciated by the clients and the product started enjoying great success.",
  "Multiline now offers a complete range of diesel generators with world famous Perkins engines from UK and with Cummins engines from USA. It also offers a range of products with other reliable engines which can be offered with similar warranty as Perkins and Cummins at a much lower price. We have supplied and installed over 10,000 generators all over Pakistan, several with our on-site services. Multiline operates a sizable “Rental Generator” fleet as well.",
  "Multiline's renewable energy division came into being in 2016. During the last few years it has shown a phenomenal growth. Multiline has obtained its own license from Alternative Energy Development Board (AEDB). Although hundreds of companies are working in this field in Pakistan, but less than 30 companies (as of now) have been given a license to officially install and process net-metered installations for their clients.",
  "Multiline is still a family owned and run company which is now being managed by Mr. Zubair Khaliq, who is an American qualified Electrical Engineer. Multiline Engineering symbolizes a company dedicated to the provision of innovative engineering systems based upon solid traditions of personal service, excellence and quality engineering skills. Each year witnesses further application of latest technology to its product innovation, reliability and customer satisfaction.",
];

export const HOME_PARTNERS: HomePartner[] = [
  { name: "Cummins", logo: "/images/comint.png" },
  { name: "Canadian Solar", logo: "/images/canadian.png" },
  { name: "Stamford", logo: "/images/stam.png" },
  { name: "Perkins", logo: "/images/perkin.png" },
  { name: "Mecc Alte", logo: "/images/mcc.png" },
  { name: "Longi", logo: "/images/longi.png" },
  { name: "Leroy-Somer", logo: "/images/leory.png" },
  { name: "Huawei", logo: "/images/huwei.png" },
  { name: "Fronius", logo: "/images/fronius.png" },
  { name: "DSE", logo: "/images/dse.png" },
];

export const HOME_STORY_IMAGES = [
  {
    src: "/images/multiline-paper-1.jpg",
    alt: "Multiline historical newspaper archive collage — part one",
  },
  {
    src: "/images/multiline-paper-2.jpg",
    alt: "Multiline historical newspaper archive collage — part two",
  },
] as const;

export const HOME_CLIENT_SLIDES: HomeClientSlide[] = [
  { src: "/images/slider-logos.png", alt: "Multiline client logos" },
  { src: "/images/slide-02.jpg", alt: "Multiline client logos — slide two" },
  { src: "/images/slide-03.jpg", alt: "Multiline client logos — slide three" },
];
