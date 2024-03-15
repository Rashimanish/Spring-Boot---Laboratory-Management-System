/*package com.example.loginreg.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//import com.example.loginreg.service.PdfReportService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;



@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/download")
public class PdfController {

    @Autowired
   // private PdfReportService pdfReportService;

    @GetMapping("/generate-pdf")
    public ResponseEntity<ByteArrayResource> generatePdf(@RequestParam String testResultId) {
      //  byte[] pdfContents = pdfReportService.generatePdf(testResultId);

      //  ByteArrayResource resource = new ByteArrayResource(pdfContents);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=test_report.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }
    
}*/
