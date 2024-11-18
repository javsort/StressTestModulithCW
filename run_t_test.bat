
@echo off

setlocal
set MVN_COMMAND=mvn

:: Check for flags
REM Check if itemsAmt is set, if not set it to default value 10
if "%itemsAmt%"=="" (
    set itemsAmt=10
)

REM Check if testLen is set, if not set it to default value 600
if "%testLen%"=="" (
    set testLen=600
)

REM Check if usersPerSec is set, if not set it to default value 10
if "%usersPerSec%"=="" (
    set usersPerSec=10
)

REM Check if maxUsersPerSec is set, if not set it to default value 100
if "%maxUsersPerSec%"=="" (
    set maxUsersPerSec=100
)

REM Check if thinkTime is set, if not set it to default value 7
if "%thinkTime%"=="" (
    set thinkTime=7
)

:: Run the Gatling test
echo Running Gatling test with 'itemsAmt'=%itemsAmt%, 'testLen'=%testLen%, 'usersPerSec'=%usersPerSec%, 'maxUsersPerSec'=%maxUsersPerSec%, 'thinkTime'=%thinkTime%
call %MVN_COMMAND% gatling:test -DitemsAmt=%itemsAmt% -DtestLen=%testLen% -DuserPerSec=%usersPerSec% -DmaxUsersPerSec=%maxUsersPerSec% -DthinkTime=%thinkTime%