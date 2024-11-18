package de.unistuttgart.t2.modulith.gatling_test;

//import io.gatling.core.scenario.Simulation;

import io.gatling.javaapi.core.ChainBuilder; 
import io.gatling.javaapi.core.ScenarioBuilder; 
import io.gatling.javaapi.core.Simulation; 
import io.gatling.javaapi.http.HttpProtocolBuilder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.json.JSONObject;

import static io.gatling.javaapi.core.CoreDsl.*; 
import static io.gatling.javaapi.http.HttpDsl.*;

import java.util.concurrent.ThreadLocalRandom;


/*
 * Coursework 1.C. - T2 - Modulith
 * This class is used to simulate the stress test for the application.
 * 
*/
public class StressTestSimu extends Simulation {

    private final Logger LOG = LoggerFactory.getLogger(getClass());

    // The amount of items to add to the cart
    private int itemsAmt = Integer.parseInt(System.getProperty("itemsAmt", "6"));
    
    // The test length in seconds
    private int testLen = Integer.parseInt(System.getProperty("testLen", "300"));
    
    // The number of users per second to start with
    private int usersPerSec = Integer.parseInt(System.getProperty("usersPerSec", "1"));
    
    // The maximum number of users per second
    private int maxUsersPerSec = Integer.parseInt(System.getProperty("maxUsersPerSec", "50"));

    
    // The time to wait between each action - based on student Id last digit -> 7
    private int thinkTime = Integer.parseInt(System.getProperty("thinkTime", "7"));

    // 0.1 Get session Id
    ChainBuilder getSessionId = exec(
        http("Get Session Id")
            .get("/session")
            .check(status().is(200))
            .check(bodyString().saveAs("sessionId"))
    );

    // A. Browse the items
    ChainBuilder browse = exec(
        http("Browse Items")
            .get("/products")
            .check(status().is(200))
            .check(jsonPath("$[*]").findAll().saveAs("teaArray")) // Save all items in the array
    ).exec(session -> {
        // Get arr[] size and get the random position
        java.util.List<String> teaArray = session.getList("teaArray");

        if (teaArray == null || teaArray.isEmpty()) {
            System.err.println("Error: No products available in /products response.");
            throw new RuntimeException("No products available."); // Abort simulation
        }

        int randomIndex = ThreadLocalRandom.current().nextInt(teaArray.size());

        String teaJson = teaArray.get(randomIndex);
        String randomItemId = "";

        try {
            // Support on java JSON library to extract id
            JSONObject teaObject = new JSONObject(teaJson);
            randomItemId = teaObject.getString("id");

        } catch (Exception e){
            System.err.println("unable to JSONify the tea object: " + teaJson);
        }

        // System.out.println("Selected randomItemId: " + randomItemId);

        return session.set("randomItemId", randomItemId);
    });

    // B. Add a random item to the cart (CONFIGURABLE by itemsAmt)
    ChainBuilder addRandomToCart = repeat(itemsAmt).on(
        exec(
            http("Add an amount of random items to Cart")
                .post("/cart/#{sessionId}")  // Use the extracted value from browse
                .body(StringBody("{ \"content\": { \"#{randomItemId}\": 1 } }"))
                .asJson()
                .check(status().is(200))
        )
    );

    // C. Confirm the cart
    ChainBuilder confirm = exec(
        http("Confirm Cart")
            .post("/confirm")
            .body(StringBody( "{ " +
            "\"cardONumber\": \"1234567890123456\", " +
            "\"cardOwner\": \"John\", " +
            "\"checksum\": \"123\", " +
            "\"sessionId\": \"#{sessionId}\", " +
            "\"cardType\": \"MasterCard\", " +
            "\"cardOwnerLastname\": \"Hernandez\", " +
            "\"cardOwnerAddress\": \"Stuttgart\"" +	
            "}"))
            .asJson()
            .check(status().is(200))
    );

    // ~. Think -> placed somewhere in the middle of the scenario
    ChainBuilder think = exec(pause(thinkTime));

    HttpProtocolBuilder httpProtocol = http
    .baseUrl("http://localhost:8081")
    .acceptHeader("application/json")
    .contentTypeHeader("application/json")
    .userAgentHeader("Gatling/StressTest")
    .inferHtmlResources();

    ScenarioBuilder stressTest = scenario("Stress Test")
    .exec(getSessionId)
    .exec(browse)
    // Verify a random Id was selected
    .exec(session -> {
        if(!session.contains("randomItemId")) {
            System.err.println("randomItemId is missing in the session");
            throw new RuntimeException("randomItemId not found");
        }
        return session;
    })
    .exec(think)
    .exec(addRandomToCart)
    .exec(think)
    .exec(confirm);

    {
        
        LOG.info("Starting stress test simulation with the following details...");
        LOG.info("Open Injection method: rampUsersPerSec(usersPerSec).to(maxUsersPerSec).during(testLen)");
        
        LOG.info("Items amount: " + itemsAmt);
        LOG.info("Test length: " + testLen + " seconds");
        LOG.info("Users per second: " + usersPerSec);

        LOG.info("Think time between ChainBuilders: " + thinkTime + " seconds");

        try {
            Thread.sleep(1000);                 // Wait for the logger to print

        } catch (InterruptedException e) {
            LOG.error("Thread was interrupted", e);
            Thread.currentThread().interrupt();
        }

        setUp(
            stressTest.injectOpen(
                rampUsersPerSec(usersPerSec).to(maxUsersPerSec).during(testLen)
            ).protocols(httpProtocol)
        );
    }
}
