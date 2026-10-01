
import XLSX from 'xlsx'
import * as fs from 'fs'
import * as path from 'path'

export class ExcelHelper
{
   static readExcel(filePath:string, sheetName?:string):Record<string,string>[]
   {
      let excelPath = filePath;
      if (fs.existsSync(excelPath) && fs.statSync(excelPath).isDirectory()) {
         const excelFile = fs.readdirSync(excelPath).find(file => /\.(xlsx|xls|xlsm|xlsb)$/i.test(file));
         if (!excelFile) throw new Error(`No Excel file found in directory: ${excelPath}`);
         excelPath = path.join(excelPath, excelFile);
      } else if (!path.extname(excelPath)) {
         const candidate = ['.xlsx', '.xls', '.xlsm', '.xlsb']
            .map(extension => `${excelPath}${extension}`)
            .find(file => fs.existsSync(file) && fs.statSync(file).isFile());
         if (candidate) excelPath = candidate;
      }

      const workbook=XLSX.readFile(excelPath)
    const sheet=workbook.Sheets[sheetName || workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json<Record<string,string>>(sheet);
   }

}