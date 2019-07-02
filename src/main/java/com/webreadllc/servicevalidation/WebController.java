package com.webreadllc.servicevalidation;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
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
        
    @GetMapping("/api/datetime")
    public String datetime() {
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
	Date date = new Date();
        return dateFormat.format(date);
    }
}

@Configuration
@EnableWebSecurity
class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(final HttpSecurity http) throws Exception {
		http.csrf().disable();
        http.authorizeRequests().antMatchers(HttpMethod.OPTIONS, "/**").denyAll().antMatchers("/**").permitAll();
    }
}
