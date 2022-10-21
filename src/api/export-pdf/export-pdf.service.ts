import { Injectable } from "@nestjs/common";
import { generatePdf } from 'html-pdf-node-ts';
import { PDFOptions } from 'puppeteer';
import { DataRowModel, HeaderReport } from "./interface/interface";
import { ClassDepressionReport } from "./libs/depression-report/class-depression-report";
import { ISumarizeRoomDepressionReport, RoomDepressionReport } from "./libs/depression-report/room-depression-report";
import { SumarizeDepressionReport } from "./libs/depression-report/sumarize-depression-report";
import { StudentFilterReportByRoom } from "./libs/student-filter/student-filter-report-by-room";
import { StudentFilterReport } from "./libs/student-filter/student-filter-report.model";
import { HtmlScanoutReportModel } from "./scanout-report-model";
@Injectable()
export class ExportPdfService {
    constructor(    
      
      ){
        
    }
    async getDepressionReportSumarize(header:HeaderReport,dataList:DataRowModel[],depression:DataRowModel[],sucuid:DataRowModel[]){
      const service:SumarizeDepressionReport = new SumarizeDepressionReport(header,dataList,depression,sucuid)
      const html = service.getHtml()    
      console.log(html);
      return this.downloadPdf(html)
    }
    async getDepressionReportByClass(header:HeaderReport,dataList:DataRowModel[],depression:DataRowModel[],sucuid:DataRowModel[]){
      const service:ClassDepressionReport = new ClassDepressionReport(header,dataList,depression,sucuid)
      const html = service.getHtml()    
      console.log(html);
      return this.downloadPdf(html)
    }
  async getDepressionReportByRoom(header:HeaderReport,dataList:DataRowModel[],sumModel:ISumarizeRoomDepressionReport){
    const service:RoomDepressionReport = new RoomDepressionReport(header,dataList,sumModel)
    const html = service.getHtml()    
    console.log(html);
    return this.downloadPdf(html)
  }
  async getStudentFilterReport(header:HeaderReport,dataList:DataRowModel[]){
    const service:StudentFilterReport = new StudentFilterReport(header,dataList)
    const html = service.getHtml()  
   
      
    return this.downloadPdf(html,true)

  }
  async getStudentFilterReportByRoom(header:HeaderReport,dataList:DataRowModel[],sumarize:DataRowModel[]){
    const service:StudentFilterReportByRoom = new  StudentFilterReportByRoom(header,dataList,sumarize)
    const html = service.getHtml()    
    return this.downloadPdf(html,true)

  }
  

  private async downloadPdf(html:string,landscape:boolean=false){
        const content = { content: html };
        const options: PDFOptions = {
          format: 'A4',
          landscape:landscape,
          margin:{
            bottom:'10mm',
            top:'10mm'
          }
        };
        return generatePdf(content, {...options,args:['--no-sandbox',
        '--disable-setuid-sandbox',
      ]})
      

    }
}