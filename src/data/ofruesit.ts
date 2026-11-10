// Të dhëna demo, derisa të lidhemi me databazën.

export const kategorite = [
  'Të gjitha',
  'Berber & Frizer',
  'Sallon thonjsh',
  'Elektricist',
  'Hidraulik',
  'Klima & ngrohje',
  'Mekanik',
  'Lavazh',
  'Pastrim',
  'Riparim telefonash',
] as const;

export type Kategoria = (typeof kategorite)[number];

export type Ofruesi = {
  id: string;
  emri: string;
  kategoria: Exclude<Kategoria, 'Të gjitha'>;
  qyteti: string;
  vleresimi: number;
  cmimiFillestar: number;
};

export const ofruesit: Ofruesi[] = [
  { id: '1', emri: 'Berberi Arti', kategoria: 'Berber & Frizer', qyteti: 'Prishtinë', vleresimi: 4.8, cmimiFillestar: 5 },
  { id: '2', emri: 'Studio Bukuria', kategoria: 'Berber & Frizer', qyteti: 'Prishtinë', vleresimi: 4.7, cmimiFillestar: 10 },
  { id: '3', emri: 'Nails by Era', kategoria: 'Sallon thonjsh', qyteti: 'Prishtinë', vleresimi: 4.9, cmimiFillestar: 15 },
  { id: '4', emri: 'Elektro Dardania', kategoria: 'Elektricist', qyteti: 'Prishtinë', vleresimi: 4.6, cmimiFillestar: 15 },
  { id: '5', emri: 'Hidro Servis', kategoria: 'Hidraulik', qyteti: 'Fushë Kosovë', vleresimi: 4.5, cmimiFillestar: 20 },
  { id: '6', emri: 'Klima Ekspert', kategoria: 'Klima & ngrohje', qyteti: 'Prishtinë', vleresimi: 4.6, cmimiFillestar: 25 },
  { id: '7', emri: 'Auto Servisi Besa', kategoria: 'Mekanik', qyteti: 'Prizren', vleresimi: 4.9, cmimiFillestar: 25 },
  { id: '8', emri: 'Lavazhi Shpejt', kategoria: 'Lavazh', qyteti: 'Prishtinë', vleresimi: 4.4, cmimiFillestar: 4 },
  { id: '9', emri: 'Pastrimi Shkëlqim', kategoria: 'Pastrim', qyteti: 'Pejë', vleresimi: 4.4, cmimiFillestar: 30 },
  { id: '10', emri: 'Phone Fix', kategoria: 'Riparim telefonash', qyteti: 'Gjilan', vleresimi: 4.7, cmimiFillestar: 10 },
];
