
@echo off

setlocal
set MVN_COMMAND=mvn

:: Check for flags
REM Check if itemsAmt is set, if not set it to default value 10
if "%itemsAmt%"=="" (
    set itemsAmt=6
)

REM Check if testLen is set, if not set it to default value 600
if "%testLen%"=="" (
    set testLen=300
)

REM Check if usersPerSec is set, if not set it to default value 10
if "%usersPerSec%"=="" (
    set usersPerSec=1
)

REM Check if maxUsersPerSec is set, if not set it to default value 100
if "%maxUsersPerSec%"=="" (
    set maxUsersPerSec=25
)

REM Check if thinkTime is set, if not set it to default value 2
if "%thinkTime%"=="" (
    set thinkTime=2
)

:: Restock before running the test
echo "Restocking the inventory before starting the test -> calling the restock endpoint"
curl -X GET "http://localhost:8081/restock" -H "accept: */*"

:: Run the Gatling test
echo "\nRunning Gatling test with 'itemsAmt'=%itemsAmt%, 'testLen'=%testLen%, 'usersPerSec'=%usersPerSec%, 'maxUsersPerSec'=%maxUsersPerSec%, 'thinkTime'=%thinkTime%"

timeout /t 5
call %MVN_COMMAND% gatling:test -DitemsAmt=%itemsAmt% -DtestLen=%testLen% -DusersPerSec=%usersPerSec% -DmaxUsersPerSec=%maxUsersPerSec% -DthinkTime=%thinkTime%