package com.api.spendash.service;

import com.api.spendash.dto.ItemDTO.ItemDTO;
import com.api.spendash.dto.ItemDTO.ItemDTORepository;
import com.api.spendash.model.*;
import com.api.spendash.repository.ReceiptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReceiptService {
    private final ReceiptRepository repository;
    private final ItemDTORepository itemDTORepository;

    @Autowired
    public ReceiptService(ReceiptRepository repository, ItemDTORepository itemDTORepository) {
        this.repository = repository;
        this.itemDTORepository = itemDTORepository;
    }

    public Receipt createReceipt(Receipt receipt, Item[] items) {
        Receipt tmpReceipt = repository.save(receipt);
        for (Item item : items) {
            ItemDTO itemDTO = new ItemDTO();
            itemDTO.setReceipt(receipt);
            itemDTO.setIdRef(item.getId());
            itemDTO.setName(item.getName());
            itemDTO.setQty(item.getQty());
            itemDTO.setSupplier(item.getSupplier());
            itemDTO.setPrice(item.getPrice());

            itemDTORepository.save(itemDTO);
        }

        return tmpReceipt;
    }

    public Receipt getReceiptById(long id) {
        Receipt receipt = repository.findById(id).get();
        ArrayList<Item> itemArrayList = new ArrayList<>();
        if (receipt != null) {
            List<ItemDTO> itemDTOS = itemDTORepository.findByReceipt(receipt);
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
        receipt.setItems(itemArrayList);
        return receipt;
    }

    public List<Receipt> getReceiptByOrder(Orders order) {
        List<Receipt> receipts = repository.findByOrderRef(order);
        for (Receipt tmpReceipt : receipts) {
            ArrayList<Item> itemArrayList = new ArrayList<>();
            List<ItemDTO> itemDTOS = itemDTORepository.findByReceipt(tmpReceipt);
            for (ItemDTO itemDTO : itemDTOS) {
                Item item = new Item();
                item.setId(itemDTO.getIdRef());
                item.setName(itemDTO.getName());
                item.setQty(itemDTO.getQty());
                item.setSupplier(itemDTO.getSupplier());
                item.setPrice(itemDTO.getPrice());
                itemArrayList.add(item);
            }
            tmpReceipt.setItems(itemArrayList);
        }
        return receipts;
    }

    public List<Receipt> getAllReceipts(Site site, User supplier, String type) {
        List<Receipt> receipts = null;

        if (site == null && supplier == null && type == null) {
            receipts = repository.findAll();
        } else if (site != null && supplier == null && type == null) {
            receipts = repository.findBySite(site);
        } else if (site != null && supplier != null && type == null) {
            receipts = repository.findBySiteAndSupplier(site, supplier);
        } else if (site == null && supplier == null && type != null) {
            receipts = repository.findByTypeEquals(type);
        } else if (site == null && supplier != null && type != null) {
            receipts = repository.findBySupplierAndTypeEquals(supplier, type);
        } else if (site == null && supplier != null && type == null) {
            receipts = repository.findBySupplier(supplier);
        } else if (site != null && supplier == null && type != null) {
            receipts = repository.findBySiteAndTypeEquals(site, type);
        } else {
            receipts = repository.findBySiteAndSupplierAndTypeEquals(site, supplier, type);
        }

        for (Receipt tmpReceipt : receipts) {
            ArrayList<Item> itemArrayList = new ArrayList<>();
            List<ItemDTO> itemDTOS = itemDTORepository.findByReceipt(tmpReceipt);
            for (ItemDTO itemDTO : itemDTOS) {
                Item item = new Item();
                item.setId(itemDTO.getIdRef());
                item.setName(itemDTO.getName());
                item.setQty(itemDTO.getQty());
                item.setSupplier(itemDTO.getSupplier());
                item.setPrice(itemDTO.getPrice());
                itemArrayList.add(item);
            }
            tmpReceipt.setItems(itemArrayList);
        }

        return receipts;
    }

    public Receipt updateReceipt(Receipt receipt, Item[] itemsList) {
        Receipt tmpReceipt = repository.save(receipt);
        List<ItemDTO> dItems = itemDTORepository.findByReceipt(receipt);
        for (ItemDTO itemDTO : dItems) {
            int id = itemDTO.getId();
            itemDTORepository.deleteById(id);
        }
        for (Item item : itemsList) {
            ItemDTO itemDTO = new ItemDTO();
            itemDTO.setReceipt(receipt);
            itemDTO.setIdRef(item.getId());
            itemDTO.setName(item.getName());
            itemDTO.setQty(item.getQty());
            itemDTO.setSupplier(item.getSupplier());
            itemDTO.setPrice(item.getPrice());

            itemDTORepository.save(itemDTO);
        }
        return tmpReceipt;
    }

    public void deleteById(long id) {
        Receipt tmpReceipt = repository.findById(id).get();
        List<ItemDTO> dItems = itemDTORepository.findByReceipt(tmpReceipt);
        for (ItemDTO itemDTO : dItems) {
            int tmpId = itemDTO.getId();
            itemDTORepository.deleteById(tmpId);
        }
        repository.deleteById(id);
    }

    public Receipt changeAcceptanceStatus(long id, String status) {
        Receipt tmpReceipt = repository.findById(id).get();
        tmpReceipt.setAcceptanceStatus(status);
        return repository.save(tmpReceipt);
    }

    public Receipt changePaymentStatus(long id, String status) {
        Receipt tmpReceipt = repository.findById(id).get();
        tmpReceipt.setPaymentStatus(status);
        return repository.save(tmpReceipt);
    }

    public Receipt changeType(long id, String type) {
        Receipt tmpReceipt = repository.findById(id).get();
        tmpReceipt.setType(type);
        return repository.save(tmpReceipt);
    }

    public boolean checkReceiptExistByOrder(Orders order) {
        return repository.existsByOrderRef(order);
    }

}
