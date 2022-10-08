import { Injectable } from "@nestjs/common";
import { generatePdf } from 'html-pdf-node-ts';
import { PDFOptions } from 'puppeteer';
import { HtmlScanoutReportModel } from "./scanout-report-model";
@Injectable()
export class ExportPdfService {
    constructor(    
      
      ){
        
    }
  
   async downloadPdf(){
    const htmlService = new HtmlScanoutReportModel()
        const content = { content: htmlService.getHtmlPaper() };
        const options: PDFOptions = {
          format: 'A4',
    
        };
        return generatePdf(content, {...options,args:['--no-sandbox',
        '--disable-setuid-sandbox',
      ]})
      

    }
}