package com.webreadllc.servicevalidation;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Michael Hug
 */

@RestController("/api/vcap_services")
public class WebController {
        
    @GetMapping("/api/vcap_services")
    public String VCAP_SERVICES() {
        //return System.getenv("VCAP_SERVICES").replaceAll("\"password\":\\s\".+?\"", "\"password\": \"<REDACTED>\"");
        return System.getenv("VCAP_SERVICES");
    }
}