import { SARABAN } from "../assert/font-data"

export class BaseReport{
   protected getCss(custom:string):string{
        let cssPaper = ' <style>'
        cssPaper += custom
        cssPaper += `@font-face { 
            font-family: "Sarabun";
            font-style: normal;
            src: url(${SARABAN});
            }
            html {
              -webkit-print-color-adjust: exact;
            }
            </style>
            </head>`
        return cssPaper
    }
    protected closeTagHtml():string {
        return `    </html>`
          
        }
        protected closeTagBody():string {
          return `      </body>`
        }
        protected openTagBody():string {
            return `    <body>`
        }

        protected openTagHtml():string {
            return `<html>
            <head>`
        }
}