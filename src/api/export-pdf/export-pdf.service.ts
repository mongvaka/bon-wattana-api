import { Injectable } from "@nestjs/common";
import { generatePdf } from 'html-pdf-node-ts';
import { PDFOptions } from 'puppeteer';
import { DataRowModel, HeaderReport } from "./interface/interface";
import { StudentFilterReportByRoom } from "./libs/student-filter/student-filter-report-by-room";
import { StudentFilterReport } from "./libs/student-filter/student-filter-report.model";
import { HtmlScanoutReportModel } from "./scanout-report-model";
@Injectable()
export class ExportPdfService {
    constructor(    
      
      ){
        
    }
  async getStudentFilterReport(header:HeaderReport,dataList:DataRowModel[]){
    const service:StudentFilterReport = new StudentFilterReport(header,dataList)
    const html = service.getHtml()    
    return this.downloadPdf(html)

  }
  async getStudentFilterReportByRoom(header:HeaderReport,dataList:DataRowModel[],sumarize:DataRowModel[]){
    const service:StudentFilterReportByRoom = new  StudentFilterReportByRoom(header,dataList,sumarize)
    const html = service.getHtml()    
    return this.downloadPdf(html)

  }
  

  private async downloadPdf(html:string){
        const content = { content: html };
        const options: PDFOptions = {
          format: 'A4',
          landscape:true,
          margin:{
            bottom:'10mm',
            top:'10mm'
          }
        };
        return generatePdf(content, options)
      

    }
}