package com.webreadllc.servicevalidation.rabbit;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.core.AmqpAdmin;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * 
 * @author Michael Hug
 */

@RestController("/api/rabbit/")
public class WebController {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private AmqpAdmin amqpAdmin;
    
    @PostMapping("/api/rabbit/produce/{message}")
    public void produce(@PathVariable String message) {
        System.out.println("POST /api/rabbit/produce/" + message + " was called");
	rabbitTemplate.convertAndSend(new Message(message));
    }
    
    @PostMapping("/api/rabbit/produce/random/{count}")
    public void setRandom(@PathVariable int count) {
        System.out.println("POST /api/rabbit/produce/random/" + count + " was called");
	for (int i=0 ; i < count; i++) {
	    UUID uuid = UUID.randomUUID();
	    if( uuid.hashCode() % 12 == 0) { // because twelve is that largest one syllable number
		rabbitTemplate.convertAndSend(new Message("MichaelIsMetal"));
	    } else {
		rabbitTemplate.convertAndSend(new Message(uuid.toString()));
	    }
	}
    }
    
    @PostMapping("/api/rabbit/consume")
    public Message consume() {
        System.out.println("POST /api/rabbit/consume/ was called");
        //this cast feel particularly shameful, but i couldn't find a good example for this seemingly simple operation
	//and the commented line complained about a smartconverter, but wouldn't let me use :
	//https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/messaging/converter/StringMessageConverter.html	
	//Message ret = rabbitTemplate.receiveAndConvert(new ParameterizedTypeReference<Message>() {});
        Message ret = (Message) rabbitTemplate.receiveAndConvert();
        if(null == ret) {
            return null;
        }
        return ret;
    }
    
    @PostMapping("/api/rabbit/consume/*")
    public List<Message> consumeAll() {
        System.out.println("POST /api/rabbit/consume/* was called");
	List<Message> ret = new ArrayList<>();
	Message buf = consume();
	while( null != buf) {
	    ret.add(buf);
	    buf = consume();
	}
	return ret;
    }
    
    @GetMapping("/api/rabbit/count")
    public int count() {
        System.out.println("POST /api/rabbit/count/ was called");
        return Integer.parseInt(amqpAdmin.getQueueProperties(Static.QUEUENAME).get("QUEUE_MESSAGE_COUNT").toString());
    }
    
    @GetMapping("/api/rabbit/healthcheck")
    public Message healthcheck() throws Exception {
        System.out.println("GET /api/rabbit/healthcheck was called");
        String message = UUID.randomUUID().toString();
        System.out.println("Healthcheck about to produce " + message);
        int preProduceCount = count();
        produce(message);
        int postProduceCount = count();
        Message ret = consume();
        int postConsumeCount = count();
        if ((preProduceCount != postConsumeCount) && (preProduceCount != (postProduceCount - 1))) {
            throw new Exception("Rabbit gave me back unexpected queue lengths!");
        }
        return ret;
    }
}
