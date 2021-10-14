package com.api.spendash.service;

import com.api.spendash.model.Site;
import com.api.spendash.repository.SiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SiteService {
    private final SiteRepository repository;

    @Autowired
    public SiteService(SiteRepository repository) {
        this.repository = repository;
    }

    public Site createSite(Site site) {
        return repository.save(site);
    }

    public Site getSiteById(int id) {
        return repository.findById(id).get();
    }

    public List<Site> getAllSites() {
        return repository.findAll();
    }

    public Site updateSite(Site site) {
        return repository.save(site);
    }

    public void deleteById(int id) {
        repository.deleteById(id);
    }
}
