import { HeadingLevel, Paragraph, TextRun } from "docx";

export class SarReportModel{
    constructor(){

    }
    setMemoPage(){
        
        return new Paragraph({
            children: [
                new TextRun({
                    text:'รายงานการปฏิบัติงาน Self Ampiplier Report',
                }),
                new TextRun({
                    text:'รายงานการปฏิบัติงาน Self Ampiplier Report',
                })
            ]
        })
         
    }
}