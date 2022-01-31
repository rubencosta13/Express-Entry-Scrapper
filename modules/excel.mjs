import ExcelJS from 'exceljs'
export const writeDataToFile = (file, data,date , worksheetName="Results") => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet(worksheetName)
    worksheet.columns = [{key: date, header: date},{key: "Formatted Date", header: "Date 2"},{key: data, header: data}];
    data.forEach((item) => {worksheet.addRow(item)})
    workbook.xlsx.writeFile(`./data/files/${file}`) 
}  