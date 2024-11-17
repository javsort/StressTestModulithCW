package de.unistuttgart.t2.modulith.gatling_test;

//import io.gatling.core.scenario.Simulation;

import io.gatling.javaapi.core.ChainBuilder; 
import io.gatling.javaapi.core.ScenarioBuilder; 
import io.gatling.javaapi.core.Simulation; 
import io.gatling.javaapi.http.HttpProtocolBuilder;

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

    // The time to wait between each action - based on student Id last digit -> 7
    private int thinkTime = 7;

    private int itemsAmt = Integer.parseInt(System.getProperty("itemsAmt", "6"));

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

        System.out.println("Selected randomItemId: " + randomItemId);

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
        setUp(
            stressTest.injectOpen(
                constantUsersPerSec(5).during(30).randomized()
            ).protocols(httpProtocol)
        );
    }
}
