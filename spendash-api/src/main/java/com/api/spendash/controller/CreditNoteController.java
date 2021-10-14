package com.api.spendash.controller;

import com.api.spendash.model.CreditNote;
import com.api.spendash.model.Item;
import com.api.spendash.model.Receipt;
import com.api.spendash.model.Site;
import com.api.spendash.service.CreditNoteService;
import com.api.spendash.service.OrderService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class CreditNoteController {
    private final CreditNoteService service;
    ObjectMapper mapper = new ObjectMapper();

    @Autowired
    public CreditNoteController(CreditNoteService service) {
        this.service = service;
    }

    @PostMapping("/creditnote")
    public ResponseEntity<?> createCreditNote(@RequestParam("items") String items,
                                              @RequestParam("amount") double amount,
                                              @RequestParam("invoiceRef") Receipt invoiceRef,
                                              @RequestParam("status") String status,
                                              @RequestParam("comment") String comment,
                                              @RequestParam("site") Site site) throws JsonProcessingException {
        Item[] itemsList = mapper.readValue(items, Item[].class);
        CreditNote creditNote = new CreditNote();
        creditNote.setId(System.currentTimeMillis());
        creditNote.setAmount(amount);
        creditNote.setInvoiceRef(invoiceRef);
        creditNote.setStatus(status);
        creditNote.setComment(comment);
        creditNote.setSite(site);
        return new ResponseEntity<>(service.createCreditNote(creditNote, itemsList), HttpStatus.CREATED);
    }

    @GetMapping("/creditnote/{id}")
    public ResponseEntity<?> getCreditNoteById(@PathVariable long id) {
        return new ResponseEntity<>(service.getCreditNoteById(id), HttpStatus.OK);
    }

    @GetMapping("/creditnote")
    public ResponseEntity<?> getAllCreditNotes(@RequestParam(required = false, value = "site") Site site,
                                               @RequestParam(required = false, value = "invoice") Receipt invoice)
    {
        return new ResponseEntity<>(service.getAllCreditNotes(site, invoice), HttpStatus.OK);
    }

    @PutMapping("/creditnote")
    public ResponseEntity<?> updateCreditNote(@RequestParam("id") String id,
                                              @RequestParam("items") String items,
                                              @RequestParam("amount") double amount,
                                              @RequestParam("invoiceRef") Receipt invoiceRef,
                                              @RequestParam("status") String status,
                                              @RequestParam("comment") String comment,
                                              @RequestParam("site") Site site) throws JsonProcessingException {
        Item[] itemsList = mapper.readValue(items, Item[].class);
        CreditNote creditNote = new CreditNote();
        creditNote.setId(Long.parseLong(id));
        creditNote.setInvoiceRef(invoiceRef);
        creditNote.setStatus(status);
        creditNote.setAmount(amount);
        creditNote.setComment(comment);
        creditNote.setSite(site);
        return new ResponseEntity<>(service.updateCreditNote(creditNote, itemsList), HttpStatus.OK);
    }

    @PostMapping("/creditnote/status")
    public ResponseEntity<?> changeStatus(@RequestParam("id") long id,
                                          @RequestParam("status") String status) {
        return new ResponseEntity<>(service.changeStatus(id, status), HttpStatus.OK);
    }

    @DeleteMapping("/creditnote/{id}")
    public ResponseEntity<?> deleteById(@PathVariable long id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
