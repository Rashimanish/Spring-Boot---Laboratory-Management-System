/*package com.example.loginreg.service;

import com.example.loginreg.entity.TestResult;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.colors.Color;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.SolidBorder;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Div;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;

@Service
public class PdfReportService{

    @Autowired
    private TestResultService testResultService;

    public byte[] generatePdf(String testResultId) {
        Optional<TestResult> optionalTestResult = testResultService.getTestResultById(testResultId);
        if (optionalTestResult.isPresent()) {
            try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
                PdfFont font = PdfFontFactory.createFont("Helvetica");
                Document document = new Document();
                document.setPageSize(PageSize.A4);


                // Add first column details in a paragraph
                Paragraph para1 = new Paragraph();
                para1.add(new com.itextpdf.layout.element.Text("Appointment ID: " + optionalTestResult.get().getAppointmentId()).setFont(font));
                para1.add("\n");
                para1.add(new com.itextpdf.layout.element.Text("Appointment Type: " + optionalTestResult.get().getAppointmentType()).setFont(font));
                para1.add("\n");
                para1.add(new com.itextpdf.layout.element.Text("Appointment Number: " + optionalTestResult.get().getAppointmentNumber()).setFont(font));
                para1.add("\n");
                para1.add(new com.itextpdf.layout.element.Text("Appointment DateTime: " + optionalTestResult.get().getAppointmentDateTime()).setFont(font));
                para1.add("\n\n");

                // Add second column details in a paragraph
                Paragraph para2 = new Paragraph();
                para2.add(new com.itextpdf.layout.element.Text("Patient Name: " + optionalTestResult.get().getPatientName()).setFont(font));
                para2.add("\n");
                para2.add(new com.itextpdf.layout.element.Text("Technician: " + optionalTestResult.get().getTechnician()).setFont(font));
                para2.add("\n\n");

                // Add a blue line separator
                Color blueColor = new DeviceRgb(0, 0, 255);
                Div separator = new Div().setBorder(new SolidBorder(blueColor, 2)).setHeight(1);

                // Add the paragraphs and separator to the document
                document.add(para1);
                document.add(para2);
                document.add(separator);

                // Add Test details in a table
                Table table = new Table(2);
                table.setWidthPercent(100);
                table.addCell(createCell("Test Name", optionalTestResult.get().getTestName(), font));
                table.addCell(createCell("Test Code", optionalTestResult.get().getTestCode(), font));
                table.addCell(createCell("Test Range", optionalTestResult.get().getTestRange(), font));
                table.addCell(createCell("Remark", optionalTestResult.get().getRemark(), font));
                table.addCell(createCell("Description", optionalTestResult.get().getDescription(), font));

                document.add(table);
                document.close();
                return baos.toByteArray();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return new byte[0];
    }

    private Cell createCell(String label, String value, PdfFont font) {
        Paragraph paragraph = new Paragraph();
        paragraph.add(new com.itextpdf.layout.element.Text(label + ": ").setFont(font).setBold());
        paragraph.add(new com.itextpdf.layout.element.Text(value).setFont(font));
        Cell cell = new Cell();
        cell.add(paragraph);
        return cell;
    }
}
*/