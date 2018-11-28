package com.webreadllc.servicevalidation.vault;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.net.URI;
import java.util.Set;
import javax.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;
import org.springframework.vault.authentication.ClientAuthentication;
import org.springframework.vault.authentication.TokenAuthentication;
import org.springframework.vault.client.VaultEndpoint;
import org.springframework.vault.config.AbstractVaultConfiguration;

/**
 * 
 * @author Michael Hug
 */

@Configuration
public class VaultConfig extends AbstractVaultConfiguration {
    
    private String vault = "http://localhost:8200";
    private String token = "UNABLE-TO-PARSE-VCAP_SERVICES";
    
    @Override
    public VaultEndpoint vaultEndpoint() {
        return VaultEndpoint.from(URI.create(vault));
    }

    @Override
    public ClientAuthentication clientAuthentication() {
        return new TokenAuthentication(token);
    }
    
    @PostConstruct
    public void init() {
        try {
            parseVcapSerices();
        } catch (NullPointerException e) {
            System.out.println("Vault is going to fail, but it will not fail fast - intentionally");
        }
           
    }
    
    private void parseVcapSerices() {
        String vcap_services = System.getenv("VCAP_SERVICES");
        JsonObject o = new JsonParser().parse(vcap_services).getAsJsonObject();
        String vaultKeyName = null;
        Set<String> keys = o.keySet();
        for( String i : keys) {
            if( i.toLowerCase().contains("vault")) {
                vaultKeyName = i;
            }
        }
        JsonObject creds = o.get(vaultKeyName)
                .getAsJsonArray()
                .get(0)
                .getAsJsonObject()
                .get("credentials")
                .getAsJsonObject();
        try {
            vault = creds.get("vault").getAsString();
        } catch (NullPointerException e) {
            //you are using the hashicorp broker
            vault = creds.get("address").getAsString();
        }
        try {
            Static.root = creds.get("root").getAsString();
        } catch (NullPointerException e) {
            Static.root = creds.get("backends").getAsJsonObject().get("generic").getAsString();
        }
        try {
            token = creds.get("token").getAsString();
        } catch (NullPointerException e) {
            token = creds.get("auth").getAsJsonObject().get("token").getAsString();
        }
    }
}