export type Article = {
  id: string;
  title: string;
  category: string;
  readTime: string;
  status: 'Featured note' | 'Topic idea';
  dateLabel: string;
  excerpt: string;
  body: string[];
};

export const articles: Article[] = [
  {
    id: 'digital-campus-gis',
    title: 'Thinking in layers: a student approach to a digital campus GIS',
    category: 'GIS & Geospatial',
    readTime: '4 min read',
    status: 'Featured note',
    dateLabel: 'Portfolio note',
    excerpt:
      'How buildings, roads, drainage and asset information can be organised into a practical campus geospatial reference.',
    body: [
      'A campus is more than a collection of buildings. It is a connected environment of roads, pedestrian routes, drainage, open spaces and physical assets. A geographic information system can bring these elements into one organised spatial view.',
      'A student-scale digital campus GIS can begin with a clear base map, carefully named layers and consistent attributes. Separate layers make it easier to review building footprints, internal roads and drainage features without mixing unrelated information.',
      'The next important step is data quality. Every feature should have a useful identifier and attributes that are understandable to another person. Coordinate reference systems, source information and field checks should be documented so that the map can be trusted and updated.',
      'Export options such as GeoJSON and CSV can make the information easier to share with other tools. The goal is not simply to create a map that looks good. It is to build a structured spatial reference that can support planning, maintenance and future campus improvements.',
      'This is the direction of the MIT Mysuru Digital Campus GIS project showcased in this portfolio. The page describes the project concept and intended capabilities; implementation status and verified outputs should be updated as the work progresses.',
    ],
  },
  {
    id: 'field-survey-notes',
    title: 'From field observations to reliable survey records',
    category: 'Surveying',
    readTime: 'Topic outline',
    status: 'Topic idea',
    dateLabel: 'Planned article',
    excerpt:
      'A planned practical guide covering field notes, measurements, checks and clear survey documentation.',
    body: [],
  },
  {
    id: 'soil-lab-notes',
    title: 'Understanding soil mechanics through laboratory tests',
    category: 'Civil Engineering',
    readTime: 'Topic outline',
    status: 'Topic idea',
    dateLabel: 'Planned article',
    excerpt:
      'A planned student-friendly explanation of soil laboratory procedures, observations and calculations.',
    body: [],
  },
];
