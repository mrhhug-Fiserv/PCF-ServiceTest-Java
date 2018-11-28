package com.webreadllc.servicevalidation.rabbit;

import java.io.Serializable;

/**
 * 
 * @author Michael Hug
 */

public class Message implements Serializable {
    
    private String message;

    public Message() {
    }

    public Message(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
    
    @Override
    public String toString() {
        //return "Message{" + "message=" + message + '}';
        return message;
    }   
}