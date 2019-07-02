package com.webreadllc.servicevalidation.vault;

import org.springframework.cloud.Cloud; 
import org.springframework.cloud.CloudFactory;
import java.net.URI;
import io.pivotal.spring.cloud.vault.service.common.VaultServiceInfo;
import java.util.ArrayList;
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
    
    //this should be comming form your manifest or ANYWHERE not hard coded like this
    private String ServiceInstanceName = "PCF-Admins-Vault";
	private boolean vaultWillFail = false;
    
    @Override
    public VaultEndpoint vaultEndpoint() {
		if(!vaultWillFail) {
			Cloud cloud = new CloudFactory().getCloud();
			VaultServiceInfo myService = (VaultServiceInfo) cloud.getServiceInfo(ServiceInstanceName);
		
			return VaultEndpoint.from(URI.create(myService.getUri()));
		}
		return VaultEndpoint.from(URI.create("https://unwilling"));
    }

    @Override
    public ClientAuthentication clientAuthentication() {
		if(!vaultWillFail) {
			Cloud cloud = new CloudFactory().getCloud();
			VaultServiceInfo myService = (VaultServiceInfo) cloud.getServiceInfo(ServiceInstanceName);
			
			return new TokenAuthentication(new String(myService.getToken()));
		}
		return new TokenAuthentication("unwilling");
    }
    
    @PostConstruct
    public void init() {
        Cloud cloud = new CloudFactory().getCloud();
		try {
				VaultServiceInfo myService = (VaultServiceInfo) cloud.getServiceInfo(ServiceInstanceName);
				
				//these next two lines are shameful
				Object gener = (Object) myService.getBackends().get("generic");
				ArrayList<String> ge = (ArrayList<String>) gener;

				VaultStatic.root = ge.get(0);
		} catch (Exception e) {
			System.out.println("Vault is not going to work");
			vaultWillFail = true;
			System.out.println("Vault is not going to work");
			System.out.println("Vault is not going to work");
			System.out.println("Vault is not going to work");
		}
    }
}
