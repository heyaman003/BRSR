// Define the structure of our conversion data

interface Unit {
  value: string;
  label: string;
}

interface Conversion {
  from: string;
  to: string;
  factor: number;
}

interface CategoryData {
  units: Unit[];
  conversions: Conversion[];
}

interface ConversionData {
  [key: string]: CategoryData;
}

export const conversionData: ConversionData = {
  volume: {
    units: [
      { value: 'kiloliter', label: 'Kiloliter (KL)' },
      { value: 'liter', label: 'Liter (L)' },
    ],
    conversions: [
      { from: 'kiloliter', to: 'liter', factor: 1000 },
      { from: 'liter', to: 'kiloliter', factor: 0.001 },
    ],
  },
  weight: {
    units: [
      { value: 'kilogram', label: 'Kilogram (KG)' },
      { value: 'tonne', label: 'Tonne (t)' },
    ],
    conversions: [
      { from: 'kilogram', to: 'tonne', factor: 0.001 },
      { from: 'tonne', to: 'kilogram', factor: 1000 },
    ],
  },
  energy: {
    units: [
      { value: 'kiloliter', label: 'Kiloliter (KL)' },
      { value: 'joule', label: 'Joule (J)' },
      { value: 'gigajoule', label: 'Gigajoule (GJ)' },
      { value: 'kilowatt-hour', label: 'Kilowatt-hour (KWh)' },
      { value: 'megawatt-hour', label: 'Megawatt-hour (MWh)' },
      { value: 'tonne', label: 'Tonne (t)' },
      { value: 'megajoule', label: 'Megajoule (MJ)' },
    ],
    conversions: [
      { from: 'joule', to: 'gigajoule', factor: 0.000000001 },
      { from: 'gigajoule', to: 'joule', factor: 1000000000 },
      { from: 'kilowatt-hour', to: 'gigajoule', factor: 0.0036 },
      { from: 'gigajoule', to: 'kilowatt-hour', factor: 277.778 },
      { from: 'megawatt-hour', to: 'gigajoule', factor: 3.6 },
      { from: 'gigajoule', to: 'megawatt-hour', factor: 0.27778 },
      { from: 'tonne', to: 'megajoule', factor: 4184 },
      { from: 'tonne', to: 'gigajoule', factor: 4.184 },
      { from: 'megajoule', to: 'gigajoule', factor: 0.001 },
      { from: 'gigajoule', to: 'megajoule', factor: 1000 },
    ],
  },
};