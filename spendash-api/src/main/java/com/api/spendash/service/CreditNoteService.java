package com.api.spendash.service;

import com.api.spendash.dto.ItemDTO.ItemDTO;
import com.api.spendash.dto.ItemDTO.ItemDTORepository;
import com.api.spendash.model.*;
import com.api.spendash.repository.CreditNoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CreditNoteService {
    private final CreditNoteRepository repository;
    private final ItemDTORepository itemDTORepository;

    @Autowired
    public CreditNoteService(CreditNoteRepository repository, ItemDTORepository itemDTORepository) {
        this.repository = repository;
        this.itemDTORepository = itemDTORepository;
    }

    public CreditNote createCreditNote(CreditNote creditNote, Item[] itemsList) {
        CreditNote tmpCreditNote = repository.save(creditNote);
        for (Item item : itemsList) {
            ItemDTO itemDTO = new ItemDTO();
            itemDTO.setCreditNote(creditNote);
            itemDTO.setIdRef(item.getId());
            itemDTO.setName(item.getName());
            itemDTO.setQty(item.getQty());
            itemDTO.setSupplier(item.getSupplier());
            itemDTO.setPrice(item.getPrice());

            itemDTORepository.save(itemDTO);
        }
        return tmpCreditNote;
    }

    public CreditNote getCreditNoteById(long id) {
        CreditNote creditNote = repository.findById(id).get();
        ArrayList<Item> itemArrayList = new ArrayList<>();
        if (creditNote != null) {
            List<ItemDTO> itemDTOS = itemDTORepository.findByCreditNote(creditNote);
            for (ItemDTO itemDTO : itemDTOS) {
                Item item = new Item();
                item.setId(itemDTO.getIdRef());
                item.setName(itemDTO.getName());
                item.setQty(itemDTO.getQty());
                item.setSupplier(itemDTO.getSupplier());
                item.setPrice(itemDTO.getPrice());
                itemArrayList.add(item);
            }
        }
        creditNote.setItems(itemArrayList);
        return creditNote;
    }

    public List<CreditNote> getAllCreditNotes(Site site, Receipt invoiceRef) {
        List<CreditNote> creditNotes = null;
        if (site == null && invoiceRef == null) {
            creditNotes = repository.findAll();
        } else if (site != null && invoiceRef == null) {
            creditNotes = repository.findBySite(site);
        } else if (site == null && invoiceRef != null) {
            creditNotes = repository.findByInvoiceRef(invoiceRef);
        } else {
            creditNotes = repository.findBySiteAndInvoiceRef(site, invoiceRef);
        }

        for (CreditNote creditNote : creditNotes) {
            ArrayList<Item> itemArrayList = new ArrayList<>();
            List<ItemDTO> itemDTOS = itemDTORepository.findByCreditNote(creditNote);
            for (ItemDTO itemDTO : itemDTOS) {
                Item item = new Item();
                item.setId(itemDTO.getIdRef());
                item.setName(itemDTO.getName());
                item.setQty(itemDTO.getQty());
                item.setSupplier(itemDTO.getSupplier());
                item.setPrice(itemDTO.getPrice());
                itemArrayList.add(item);
            }
            creditNote.setItems(itemArrayList);
        }
        return creditNotes;
    }

    public CreditNote updateCreditNote(CreditNote creditNote, Item[] items) {
        CreditNote tmpCreditNote = repository.save(creditNote);
        List<ItemDTO> dItems = itemDTORepository.findByCreditNote(creditNote);
        for (ItemDTO itemDTO : dItems) {
            int id = itemDTO.getId();
            itemDTORepository.deleteById(id);
        }
        for (Item item : items) {
            ItemDTO itemDTO = new ItemDTO();
            itemDTO.setCreditNote(creditNote);
            itemDTO.setIdRef(item.getId());
            itemDTO.setName(item.getName());
            itemDTO.setQty(item.getQty());
            itemDTO.setSupplier(item.getSupplier());
            itemDTO.setPrice(item.getPrice());

            itemDTORepository.save(itemDTO);
        }
        return tmpCreditNote;
    }

    public CreditNote changeStatus(long id, String status) {
        CreditNote tmpCreditNote= repository.findById(id).get();
        tmpCreditNote.setStatus(status);
        return repository.save(tmpCreditNote);
    }

    public void deleteById(long id) {
        CreditNote tmpCreditNote= repository.findById(id).get();
        List<ItemDTO> dItems = itemDTORepository.findByCreditNote(tmpCreditNote);
        for (ItemDTO itemDTO : dItems) {
            int tmpId = itemDTO.getId();
            itemDTORepository.deleteById(tmpId);
        }
        repository.deleteById(id);
    }


}
