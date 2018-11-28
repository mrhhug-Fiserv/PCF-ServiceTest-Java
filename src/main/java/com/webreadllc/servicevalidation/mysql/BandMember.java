package com.webreadllc.servicevalidation.mysql;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * 
 * @author Michael Hug
 */

// hibbernate can make a table out of this class
// add 'spring.jpa.hibernate.ddl-auto=create' to application.properties
@Entity 
public class BandMember implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String specialty;
    private boolean singer;

    public BandMember() {
    }
    
    public BandMember(Integer id) {
	this.id = id;
    }
    
    public BandMember(String name, String specialty, boolean singer) {
	this.name = name;
	this.specialty = specialty;
	this.singer = singer;
    }
    
    public BandMember(Integer id, String name, String specialty, boolean singer) {
	this.id = id;
	this.name = name;
	this.specialty = specialty;
	this.singer = singer;
    }
    
    public String getSpecialty() {
	return specialty;
    }

    public void setSpecialty(String specialty) {
	this.specialty = specialty;
    }  

    public boolean isSinger() {
	return singer;
    }

    public void setSinger(boolean singer) {
	this.singer = singer;
    }

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public Integer getId() {
	return id;
    }

    public void setId(Integer id) {
	this.id = id;
    }
}