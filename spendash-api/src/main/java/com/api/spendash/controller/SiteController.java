package com.api.spendash.controller;

import com.api.spendash.model.Site;
import com.api.spendash.service.SiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class SiteController {
    private final SiteService service;

    @Autowired
    public SiteController(SiteService service) {
        this.service = service;
    }

    @PostMapping("/site")
    public ResponseEntity<?> createSite(@RequestParam("name") String name,
                                        @RequestParam("address") String address,
                                        @RequestParam("contact") int contact)
    {
        Site site = new Site();
        site.setName(name);
        site.setAddress(address);
        site.setContact(contact);
        return new ResponseEntity<>(service.createSite(site), HttpStatus.CREATED);
    }

    @GetMapping("/site/{id}")
    public ResponseEntity<?> getSiteById(@PathVariable int id) {
        return new ResponseEntity<>(service.getSiteById(id), HttpStatus.OK);
    }

    @GetMapping("/site")
    public ResponseEntity<?> getAllSites() {
        return new ResponseEntity<>(service.getAllSites(), HttpStatus.OK);
    }

    @PutMapping("/site")
    public ResponseEntity<?> updateSite(@RequestParam("id") int id,
                                        @RequestParam("name") String name,
                                        @RequestParam("address") String address,
                                        @RequestParam("contact") int contact)
    {
        Site site = new Site(id, name, address, contact);
        return new ResponseEntity<>(service.updateSite(site), HttpStatus.OK);
    }

    @DeleteMapping("/site/{id}")
    public ResponseEntity<?> deleteSiteById(@PathVariable int id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
