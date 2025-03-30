#!/bin/bash

# Reset the remote origin to GitHub and add Gitea
git remote remove origin
git remote add origin https://github.com/anshjindal/wouessi-ems-frontend
git remote set-url --add origin https://gitea.wouessi.com/Wouessi/ems-frontend.git

echo "Remotes configured. Git will now push to GitHub first, then Gitea."
