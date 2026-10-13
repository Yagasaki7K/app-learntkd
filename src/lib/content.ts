import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const root = path.join(process.cwd(), 'content');

export type Technique = {
  slug: string;
  romanji: string;
  hangul: string;
  english: string;
  portuguese: string;
  belt: string;
  beltEnglish: string;
  beltSlug: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  purpose: string;
  purposeEnglish: string;
  execution: string;
  executionEnglish: string;
  pronunciation: string;
};

export type Belt = {
  slug: string;
  name: string;
  namePt: string;
  rank: string;
  rankEn: string;
  color: string;
  colorPt: string;
  tip: string;
  tipPt: string;
  order: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  meaning: string;
  meaningPt: string;
  advance: string;
  advancePt: string;
  next: string;
  html: string;
};

export type ContentPage = { title: string; html: string; htmlEnglish: string; htmlPortuguese: string; plain: string; plainEnglish: string; plainPortuguese: string };

function readMarkdownFiles(directory: string): string[] {
  return fs.readdirSync(directory).filter((file) => file.endsWith('.md')).sort();
}

function parseFields(section: string): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const line of section.split('\n')) {
    const match = line.match(/^- \*\*(.+?):\*\*\s*(.*)$/);
    if (match) fields[match[1].toLowerCase()] = match[2].trim();
  }
  return fields;
}

export function getTechniques(): Technique[] {
  const directory = path.join(root, 'techniques');
  const beltsBySlug = new Map(getBelts().map((belt) => [belt.slug, belt]));
  return readMarkdownFiles(directory).flatMap((file) => {
    const source = fs.readFileSync(path.join(directory, file), 'utf8');
    const sections = source.split(/^## /m).slice(1);
    return sections.map((section) => {
      const [heading, ...body] = section.split('\n');
      const fields = parseFields(body.join('\n'));
      return {
        slug: heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        romanji: fields.romanji || heading,
        hangul: fields.hangul || '',
        english: fields.english || heading,
        portuguese: fields.portuguese || heading,
        belt: fields.belt || '',
        beltSlug: fields['belt slug'] || '',
        beltEnglish: beltsBySlug.get(fields['belt slug'] || '')?.name || fields.belt || '',
        level: (fields.level || 'beginner') as Technique['level'],
        category: fields.category || file.replace('.md', ''),
        purpose: fields.purpose || '',
        purposeEnglish: fields['purpose english'] || fields.purpose || '',
        execution: fields.execution || '',
        executionEnglish: fields['execution english'] || fields.execution || '',
        pronunciation: fields.pronunciation || '',
      };
    });
  });
}

export function getBelts(): Belt[] {
  const directory = path.join(root, 'belts');
  return readMarkdownFiles(directory).map((file) => {
    const parsed = matter(fs.readFileSync(path.join(directory, file), 'utf8'));
    return { ...parsed.data, order: Number(parsed.data.order), html: marked.parse(parsed.content) as string } as Belt;
  }).sort((a, b) => a.order - b.order);
}

export function getMarkdownPage(folder: 'grading' | 'hierarchy' | 'terminology', file: string): ContentPage {
  const source = fs.readFileSync(path.join(root, folder, file), 'utf8');
  const title = source.match(/^# (.+)$/m)?.[1] || folder;
  const body = source.replace(/^# .+\r?\n/m, '');
  const english = body.match(/^## English\r?\n([\s\S]*?)(?=^## Português\s*$|$)/m)?.[1] || '';
  const portuguese = body.match(/^## Português\r?\n([\s\S]*)$/m)?.[1];
  const portugueseContent = portuguese || '';
  const plain = (text: string) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[#*|`>-]/g, ' ').replace(/\s+/g, ' ').trim();
  const htmlEnglish = marked.parse(english) as string;
  const htmlPortuguese = marked.parse(portugueseContent) as string;
  const plainEnglish = plain(english);
  const plainPortuguese = plain(portugueseContent);
  return { title, html: htmlEnglish, htmlEnglish, htmlPortuguese, plain: `${plainEnglish} ${plainPortuguese}`.trim(), plainEnglish, plainPortuguese };
}

