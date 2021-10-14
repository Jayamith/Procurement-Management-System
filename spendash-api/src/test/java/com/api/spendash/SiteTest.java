package com.api.spendash;

import com.api.spendash.model.Site;
import com.api.spendash.repository.SiteRepository;
import com.api.spendash.service.SiteService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
public class SiteTest {

    @Autowired
    private SiteService service;

    @MockBean
    private SiteRepository repository;

    @Test
    public void createSite() {
        Site site = new Site(1, "City Tower", "Colombo 07", 752345543);
        when(repository.save(site)).thenReturn(site);
        assertEquals(site, service.createSite(site));
    }

    @Test
    public void getAllSites() {
        Site site1 = new Site(1, "City Tower", "Colombo 07", 752345543);
        Site site2 = new Site(2, "Lake Lane", "Nuwara Eliya", 752345543);
        when(repository.findAll()).thenReturn(Stream.of(site1, site2).collect(Collectors.toList()));
        assertEquals(2, service.getAllSites().size());
    }

    @Test
    public void getSiteByIdTest() {
        Site site2 = new Site(2, "Lake Lane", "Nuwara Eliya", 752345543);
        when(repository.findById(2)).thenReturn(java.util.Optional.of(site2));
        assertEquals(site2, service.getSiteById(2));
    }

    @Test
    public void deleteSiteByIdTest() {
        service.deleteById(1);
        verify(repository, times(1)).deleteById(1);
    }
}
