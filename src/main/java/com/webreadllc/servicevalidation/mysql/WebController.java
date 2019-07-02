package com.webreadllc.servicevalidation.mysql;

import java.util.HashSet;
import java.util.Optional;
import java.util.Random;
import java.util.Set;
import java.util.UUID;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 
 * @author Michael Hug
 */

@RestController("/api/mysql/")
public class WebController {
    
    @Autowired 
    private MemberRepository bandMemberRepository;

    @PostMapping("/api/mysql/{name}/{specialty}/{isSinger}")
    public BandMember create (@PathVariable String name, @PathVariable String specialty, @PathVariable Boolean isSinger) {
        System.out.println("PUT /api/mysql/" + name + "/" + specialty + "/" + isSinger + " was called");
        BandMember ret = bandMemberRepository.save(new BandMember(name, specialty, isSinger));
        return ret;
    }
    
    @PutMapping("/api/mysql/{id}/{name}/{specialty}/{isSinger}")
    public BandMember update (@PathVariable Integer id, @PathVariable String name, @PathVariable String specialty, @PathVariable Boolean isSinger) {
        System.out.println("PUT /api/mysql/" + id + "/" + name + "/" + specialty + "/" + isSinger + " was called");
        BandMember ret = bandMemberRepository.save(new BandMember(id, name, specialty, isSinger));
        return ret;
    }
    
    @PostMapping("/api/mysql/GodBlessTheGreatfulDead")
    public Set<BandMember> createTheGreatfulDead () {
        System.out.println("PUT /api/mysql/GodBlessTheGreatfulDead/ was called");
        Set<BandMember> ret = new HashSet<>();
	ret.add(create("Tom Constanten", "Keyboards", false));
	ret.add(create("Jerry Garcia", "Guitar", true));
	ret.add(create("Donna Jean Godchaux", "Vocals", true));
	ret.add(create("Keith Godchaux", "Keyboards", false));
	ret.add(create("Mickey Hart", "Drums", false));
	ret.add(create("Bill Kreutzmann", "Drums", false));
	ret.add(create("Phil Lesh", "Bass guitar", true));
	ret.add(create("Ron \"Pigpen\" McKernan", "Keyboards", true));
	ret.add(create("Brent Mydland", "Keyboards", true));
	ret.add(create("Steve Parish", "Roadie", false));
	ret.add(create("Bob Weir", "Guitar", true));
	ret.add(create("Vince Welnick", "Keyboards", true));
        return ret;
    }

    @GetMapping("/api/mysql/{id}")
    public Optional<BandMember> read(@PathVariable Integer id) {
        System.out.println("GET /api/mysql/" + id + " was called");
        Optional<BandMember> ret = bandMemberRepository.findById(id);
        return ret;
    }
    
    @GetMapping("/api/mysql/*")
    public Iterable<BandMember> readAll() {
        System.out.println("GET /api/mysql/* was called");
        Iterable<BandMember> ret = bandMemberRepository.findAll();
        return ret;
    }
    
    @DeleteMapping("/api/mysql/{id}")
    public void delete(@PathVariable Integer id) {
        System.out.println("DELETE /api/mysql/" + id + " was called");
	bandMemberRepository.delete(new BandMember(id));
    }
    
    @DeleteMapping("/api/mysql/*")
    public void deleteAll() {
        System.out.println("DELETE /api/mysql/* was called");
	bandMemberRepository.deleteAll();
    }

    @GetMapping("/api/mysql/healthcheck")
    public BandMember healthcheck() throws Exception {
        System.out.println("GET /api/mysql/healthcheck was called");
        String name = UUID.randomUUID().toString();
        String specialty = UUID.randomUUID().toString();
        boolean isSinger = new Random().nextBoolean();
        System.out.println("Healthcheck about to set member " + name + ":" + specialty + ":" + isSinger);
        BandMember ret = create(name, specialty, isSinger);
        if (!(ret.isSinger() == isSinger && ret.getName().equals(name) && ret.getSpecialty().equals(specialty))) {
            throw new Exception("MySql gave me back a different values than I put in!");
        }
        bandMemberRepository.delete(ret);
        return ret;
    }
    
    @PostConstruct
    public void init() {
	try {
            bandMemberRepository.configureTable();
	} catch (Exception e){
	}
    }
}
