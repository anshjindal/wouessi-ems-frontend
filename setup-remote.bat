@echo off

REM Reset remote origin
git remote remove origin
git remote add origin https://github.com/anshjindal/wouessi-ems-frontend
git remote set-url --add origin https://gitea.wouessi.com/Wouessi/ems-frontend.git

echo Remotes configured. Git will push to GitHub first, then Gitea.
pause
