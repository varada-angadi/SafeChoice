import fs from 'fs';
import { parse } from 'csv-parse/sync';

// Read CSV file as UTF-8 and remove BOM if present
const csvFile = fs.readFileSync('./data/IARC_full_list.csv', 'utf8').replace(/^\uFEFF/, '');

const records = parse(csvFile, {
  columns: true,
  skip_empty_lines: true,
  relax_quotes: true,   // allow irregular quotes
});

const carcinogens = records.map((r) => ({
  name: r['Agent'],
  group: r['Group'],
  year: r['Evaluation year'],
  info: r['Additional information'] || '',
}));

fs.writeFileSync('./data/carcinogens.json', JSON.stringify(carcinogens, null, 2));

console.log(`✅ Saved ${carcinogens.length} carcinogens to /data/carcinogens.json`);
