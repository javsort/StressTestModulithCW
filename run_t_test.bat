
@echo off

setlocal
set MVN_COMMAND=mvn

:: Default values
set itemsAmt=6
set testLen=300
set usersPerSec=1
set maxUsersPerSec=25
set thinkTime=2

:: Restock before running the test
echo "Restocking the inventory before starting the test -> calling the restock endpoint"
curl -X GET "http://localhost:8081/restock" -H "accept: */*"

:: Run the Gatling test
echo "Running Gatling test with 'itemsAmt'=%itemsAmt%, 'testLen'=%testLen%, 'usersPerSec'=%usersPerSec%, 'maxUsersPerSec'=%maxUsersPerSec%, 'thinkTime'=%thinkTime%"

timeout /t 5
call %MVN_COMMAND% gatling:test -DitemsAmt=%itemsAmt% -DtestLen=%testLen% -DusersPerSec=%usersPerSec% -DmaxUsersPerSec=%maxUsersPerSec% -DthinkTime=%thinkTime%