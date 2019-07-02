package com.webreadllc.servicevalidation.redis;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 
 * @author Michael Hug
 */

@RestController("/api/redis/")
public class WebController {

    @Autowired
    private KeyValueRepository keyValueRepository;

    @GetMapping("/api/redis/get/{key}")
    public Map<String,String> get(@PathVariable String key) {
        System.out.println("GET /api/redis/get/" + key + " was called");
        return new HashMap<String, String>() {{
            put(key, keyValueRepository.get(key));
        }};
    }

    @GetMapping("/api/redis/get/*")
    public Map<String, String> getAllKeyValues() {
        System.out.println("GET /api/redis/get/* was called");
        return keyValueRepository.getAllKeyValues();
    }

    @PutMapping("/api/redis/set/{key}/{value}")
    public void set(@PathVariable String key, @PathVariable String value) {
        System.out.println("PUT /api/redis/set/" + key + "/" + value + " was called");
        keyValueRepository.set(key, value);
    }

    @PutMapping("/api/redis/set/random/{count}")
    public void setRandom(@PathVariable int count) {
        System.out.println("PUT /api/redis/set/random/" + count + " was called");
        for (int i=0 ; i < count; i++) {
            UUID uuid = UUID.randomUUID();
            if( uuid.hashCode() % 12 == 0) { // because twelve is that largest one syllable number
                keyValueRepository.set(uuid.toString() , "MichaelIsMetal");
            } else {
                keyValueRepository.set(uuid.toString() , UUID.randomUUID().toString());
            }
        }
    }

    @DeleteMapping("/api/redis/del/{key}")
    public void del(@PathVariable String key) {
        System.out.println("DELETE /api/redis/del/" + key + " was called");
        keyValueRepository.del(key);
    }

    @DeleteMapping("/api/redis/del/*")
    public void flushAll() {
        System.out.println("DELETE /api/redis/del/* was called");
        keyValueRepository.flushAll();
    }	

    @GetMapping("/api/redis/healthcheck")
    public Map<String, String> healthcheck() throws Exception {
        System.out.println("GET /api/redis/healthcheck was called");
        String key = UUID.randomUUID().toString();
        String value = UUID.randomUUID().toString();
        set(key, value);
        System.out.println("Healthcheck just set pair " + key + ":" + value);
        Map<String, String> ret = get(key);
        if (!ret.get(key).equals(value)) {
            throw new Exception("Redis gave me back a different value than I put in");
        }
        del(key);
        return ret;
    }
}
