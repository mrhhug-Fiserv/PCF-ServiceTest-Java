package com.webreadllc.servicevalidation.vault;

/**
 *
 * @author Michael Hug
 */

public class Static {
    
    //This gets set later by parsing vcap_services
    //spring would rather have you fail fast, but i don't want to do that here
    public static String root = "UNABLE-TO-PARSE-VCAP_SERVICES";
}
