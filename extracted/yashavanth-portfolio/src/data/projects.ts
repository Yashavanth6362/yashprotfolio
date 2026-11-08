export type Project = {
  id: string;
  number: string;
  title: string;
  category: 'GIS & Geospatial' | 'Civil Engineering';
  status: string;
  summary: string;
  details: string[];
  tags: string[];
};

export const projects: Project[] = [
  {
    id: 'digital-campus-gis',
    number: '01',
    title: 'MIT Mysuru — Digital Campus GIS',
    category: 'GIS & Geospatial',
    status: 'Project showcase',
    summary:
      'A digital geospatial campus concept focused on organising campus features as a useful, searchable map and asset reference.',
    details: [
      'Campus feature mapping for buildings, internal roads and circulation.',
      'GIS layers for drainage and other campus infrastructure assets.',
      'A structured geodatabase concept with clear attribute information.',
      'Planned exchange formats including GeoJSON and CSV for wider use.',
    ],
    tags: ['GIS', 'QGIS', 'Geodatabase', 'Campus Mapping'],
  },
];
