@echo off
goto set

:set
cls
chcp 65001
echo.
echo ==========================================
echo             잠시만 기다리세요...
echo ==========================================
echo.
title 잠시만 기다려 주세요..
color 0b
set target_version=v13.7.0
set version=undefined
goto check

:check
FOR /F "tokens=*" %%a IN ('node -v') do (SET version=%%a)
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
if '%errorlevel%' NEQ '0' (
    set administrator_now=0
) else (
    set administrator_now=1
)
goto main

:main
cls
title 루탑봇 D20 구동기
echo.
echo 1. 모듈 설치 및 업데이트
echo 2. 루탑봇 D20 구동하기 (일반)
echo 3. 루탑봇 D20 구동하기 (-ar)
echo 4. 나가기
echo.
set /p b=원하시는 숫자를 입력 후, 엔터하세요. : 
if %b% == 1 (
    goto Module_Install
) else if %b% == 2 (
    set arg=0
    goto Run
) else if %b% == 3 (
    set arg=1
    goto Run
) else (
    goto out
)

:out
exit

:Module_Install
cls
title 루탑봇 D20 구동기 - 알림

if %version% == undefined (
    cls
    color 4e
    echo Node.js가 감지되지 않았습니다.
    echo.
    echo 아무 키나 입력하여 메인으로 돌아갑니다..
    set /p b=
    color 0b
    goto main
)

if %administrator_now% == 1 (
    cls
    color 4e
    echo 관리자 권한이 감지되었습니다.
    echo 모듈이 올바르지 않은 경로에 설치 될 수 있습니다.
    echo.
    echo 해당 내용을 인지 했으며, 모듈 설치 및 업데이트를 진행 하시려면, 아무 키나 눌러주세요.
    set /p b=
    color 0b
)

if not "%version%" == "%target_version%" (
    cls
    color 4e
    echo 주의하세요! 현재 사용중이신 Node.js 버전은 루탑봇에서 권장하지 않는 버전입니다.
    echo 현재 감지된 Node.js 버전은 %version%이며, 권장 버전은 %target_version% 입니다.
    echo.
    echo 해당 내용을 인지 했으며, 모듈 설치 및 업데이트를 진행 하시려면, 아무 키나 눌러주세요.
    set /p b=
    color 0b
)

cls
title 루탑봇 D20 구동기 - 모듈 설치 및 업데이트
echo.
echo ==============================================
echo               잠시만 기다리세요...
echo ==============================================
echo.
echo 새 창에서 작업이 진행됩니다.
echo 작업이 종료되면 새 창도 같이 종료됩니다.
start cmd /c npm install npm -g
echo 창이 종료되었으면 아무 키나 눌러 모듈 설치 및 업데이트를 계속합니다.
set /p b=
start cmd /c npm install
echo.
echo ==============================================
echo  아무 키나 입력하여 메인 화면으로 돌아갑니다.
echo ==============================================
set /p b=
goto main

:Run
cls
title 루탑봇 D20 구동기 - 알림

if %version% == undefined (
    cls
    color 4e
    echo Node.js가 감지되지 않았습니다.
    echo.
    echo 아무 키나 입력하여 메인으로 돌아갑니다..
    set /p b=
    color 0b
    goto main
)

if not "%version%" == "%target_version%" (
    cls
    color 4e
    echo 주의하세요! 현재 사용중이신 Node.js 버전은 루탑봇에서 권장하지 않는 버전입니다.
    echo 현재 감지된 Node.js 버전은 %version%이며, 권장 버전은 %target_version% 입니다.
    echo.
    echo 해당 내용을 인지 했으며, 루탑봇을 구동 하시려면, 아무 키나 눌러주세요.
    set /p b=
    color 0b
)

if %administrator_now% == 1 (
    cls
    color 4e
    echo 관리자 권한이 감지되었습니다. 루탑봇이 정상적으로 구동되지 않을 수 있습니다.
    echo.
    echo 해당 내용을 인지 했으며, 루탑봇을 구동 하시려면, 아무 키나 눌러주세요.
    set /p b=
    color 0b
)

cls
title 루탑봇 D20 구동기 - 루탑봇 D20 구동하기
echo.
echo ==============================================
echo               잠시만 기다리세요...
echo ==============================================
echo.
echo Crtl + C 로 봇을 종료시킬 수 있습니다.
echo.
color 07
if %arg% == 0 (
    npm start
) else if %arg% == 1 (
    npm run start-ar
) else (
    echo 잘못된 접근입니다.
)
color 0b
echo.
echo ==============================================
echo  아무 키나 입력하여 메인 화면으로 돌아갑니다.
echo ==============================================
set /p b=
goto main
