import { randomUUID } from 'crypto';
import { resolve } from 'path';
import puppeteer from 'puppeteer';
import {
  Section,
  SubSection,
  Cell,
  Question,
  Row,
  Table,
} from 'src/modules/section/initialData';
import { QuestionType } from '@prisma/client'

export async function generatePdf(section: Section) {
  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();

    // Converting section data to apppropriate HTML document
    const html: string = generateHtml(section);

    page.setContent(html, { waitUntil: 'load' });

    const outputFile = resolve(`./pdfs/${randomUUID()}.pdf`);

    await page.pdf({
      path: outputFile,
      margin: { top: '30px', bottom: '30px', left: '20px', right: '20px' },
      waitForFonts: true,
      height: '1128px',
      width: '800px',
    });
    return outputFile;
  } catch (e) {
    await browser.close();
    throw e;
  }
}

function generateHtml(section: Section): string {
  // Section title
  let html = `<html><body style="width:100%; font-family: Arial;"><h1>${section.title}</h1>`;
  section.subsections.forEach((subSection: SubSection) => {
    // Subsection container
    html += `<div style="width: 100%;"><h3 style="margin-left:9px;">${subSection.title}</h3>`;
    subSection.questions.sort((a, b)=>a.index-b.index).forEach((question: Question) => {
      html += `<div style="width: 100%; margin-bottom: 30px;">`;
      if (question.type === QuestionType.TABLE) {
        html += `<h4 style="margin-left:16px;">${question.desc}</h4>`;
        question.answer_table?.forEach((table: Table) => {
          html += '<table style="width:740px; margin: auto; border-collapse:collapse;">';
          table.rows
            .filter((row: Row) => row.isHeading)
            .sort((a, b)=>a.index-b.index)
            .forEach((row: Row) => {
              html += '<tr>';
              row.cells.sort((a, b)=>a.index-b.index).forEach((cell: Cell) => {
                html += `<th style="border: 1px solid #dddddd; padding: 8; font-size:14px;" colspan="${cell.colSpan}" rowspan="${cell.rowSpan}">${cell.data}</th>`;
              });
              html += '</tr>';
            });

          table.rows
            .filter((row: Row) => !row.isHeading)
            .sort((a, b)=>a.index-b.index)
            .forEach((row: Row) => {
              html += '<tr>';
              row.cells.sort((a, b)=>a.index-b.index).forEach((cell: Cell) => {
                html += `<td style="border: 1px solid #dddddd; padding: 8; font-size:14px;" colspan="${cell.colSpan}" rowspan="${cell.rowSpan}">${cell.data}</th>`;
              });
              html += '</tr>';
            });
          html += '</table>';
        });
      } else if(question.type === QuestionType.TEXT) {
        html += `<h4 style="margin-left:20px">${question.desc}</h4>`;
        html += `<div style="padding-left: 10; font-size: 16; margin-left:30px;">Answer: ${question.answer_text || ''}</div>`;
      }
      else if(question.type === QuestionType.BOOLEAN) {
        html += `<h4 style="margin-left:20px">${question.desc}</h4>`;
        html += `<div style="padding-left: 10; font-size: 16; margin-left:30px; font-weight: bold;">${question.answer_text==='true'?'Yes': 'No'}</div>`;
      }
      html += '</div>';
    });
    html += '</div>';
  });
  html+='</body><html>'
  return html;
}
