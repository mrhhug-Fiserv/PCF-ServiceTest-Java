package com.webreadllc.servicevalidation.mysql;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Michael Hug
 */

public interface MemberRepository extends CrudRepository<BandMember, Integer> {

    //you should seriously consider using #spring.jpa.hibernate.ddl-auto=create
    // or keep ddl-auto off and have robust schema validation in prod
    String create = "CREATE TABLE IF NOT EXISTS band_member ("
      + "id int(11) NOT NULL AUTO_INCREMENT,"
      + "name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,"
      + "singer bit(1) NOT NULL,"
      + "specialty varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,"
      + "PRIMARY KEY (id)"
      + ") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci";
    @Modifying
    @Transactional
    @Query(value = create, nativeQuery = true)
    public void configureTable();
}
