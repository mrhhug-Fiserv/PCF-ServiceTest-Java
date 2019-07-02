package com.webreadllc.servicevalidation.vault;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.vault.core.VaultTemplate;
import org.springframework.vault.support.VaultResponse;
import org.springframework.vault.support.VaultResponseSupport;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 
 * @author Michael Hug
 */

@RestController("/api/vault/")
public class WebController {

    @Autowired(required = false)
    private VaultTemplate vaultTemplate;

    @PutMapping("/api/vault/{huntName}/{startingCity}/{numberOfPaces}")
    public VaultResponse set(@PathVariable String huntName, @PathVariable String startingCity, @PathVariable String numberOfPaces) {
        System.out.println("PUT /api/vault/" + huntName + "/" + startingCity + "/" + numberOfPaces + " was called");
        TreasureHunt th = new TreasureHunt(startingCity, numberOfPaces);
        return vaultTemplate.write(VaultStatic.root + "/" + huntName, th);
    }
    
    @SuppressWarnings("null")
    @GetMapping("/api/vault/{huntName}")
    public VaultResponseSupport<TreasureHunt> get(@PathVariable String huntName) {
        System.out.println("GET /api/vault/" + huntName + " was called");
        VaultResponseSupport<TreasureHunt> ret = vaultTemplate.read(VaultStatic.root + "/" + huntName, TreasureHunt.class);
        HashMap<String, Object> myMap = new HashMap<>();
        myMap.put("", "");
        
        ret.setAuth(myMap);
        /*
        I am not exactly sure why, but jackson exploded when auth was null
        {
    "status": 500,
    "error": "Internal Server Error",
    "message": "Could not write JSON: Auth field is empty; nested exception is com.fasterxml.jackson.databind.JsonMappingException: Auth field is empty (through reference chain: org.springframework.vault.support.VaultResponseSupport[\"requiredAuth\"])",
}
2018-09-23 20:44:08.037  WARN 11032 --- [nio-8080-exec-3] .w.s.m.s.DefaultHandlerExceptionResolver : Failed to write HTTP message: org.springframework.http.converter.HttpMessageNotWritableException: Could not write JSON: Auth field is empty; nested exception is com.fasterxml.jackson.databind.JsonMappingException: Auth field is empty (through reference chain: org.springframework.vault.support.VaultResponseSupport["requiredAuth"])
        */
        return ret;
    }

    @PutMapping("/api/vault/createwinghunt")
    public VaultResponse createWingHunt() {
	String huntName = "Lemon Pepper Wings, Wet";
	String startingCity = "Alpharetta";
	String numberOfPaces = "285";
        System.out.println("PUT /api/vault/" + huntName + "/" + startingCity + "/" + numberOfPaces + " was called");
        TreasureHunt th = new TreasureHunt(startingCity, numberOfPaces);
        return vaultTemplate.write(VaultStatic.root + "/" + huntName, th);
    }

    @GetMapping("/api/vault/list")
    public List<String> listKeys() {
        System.out.println("GET /api/vault/list was called");
        return vaultTemplate.list(VaultStatic.root);
    }
    
    @DeleteMapping("/api/vault/{huntName}")
    public void deletHunt(@PathVariable String huntName) {
        System.out.println("DELETE /api/vault/" + huntName + " was called");
        vaultTemplate.delete(VaultStatic.root + "/" + huntName);
    }
    
    @GetMapping("/api/vault/healthcheck")
    public TreasureHunt healthcheck() throws Exception {
        System.out.println("GET /api/healthcheck was called");
        String name = UUID.randomUUID().toString();
        String city = UUID.randomUUID().toString();
        String paces = UUID.randomUUID().toString();
        System.out.println("Healthcheck about to set hunt " + name + ":" + city + ":" + paces);
        set(name, city, paces);
        System.out.println("Healthcheck about to get");
        TreasureHunt ret = get(name).getData();
        if (!(ret.getNumberOfPaces().equals(paces) && ret.getStartingCity().equals(city))) {
            throw new Exception("Vault gave me back a different values than I put in!");
        }
        deletHunt(name);
        return ret;
    }
}
