---
title: How I setup my Mac
date: 2023/8/29
tag: Development
author: Cloud
---

# How I setup my Mac

## Handy Tools
- **uTools**: https://www.u.tools/
- **Arc**: https://arc.net/
- **Warp**: https://www.warp.dev/
- **Notion**: https://www.notion.so/
- **GitHub Desktop**: https://desktop.github.com/
- **Postman**: https://www.postman.com/downloads/
- **Docker Desktop**: https://www.docker.com/products/docker-desktop/

## Set .zshrc

```shell
export SSR_PORT=1087

alias ll="ls -al"
alias l="ls -al"
alias ,setProxy="export http_proxy=127.0.0.1:$SSR_PORT https_proxy=127.0.0.1:$SSR_PORT HTTP_PROXY=127.0.0.1:$SSR_PORT HTTPS_PROXY=127.0.0.1:$SSR_PORT"
alias ,unsetProxy="unset http_proxy && unset https_proxy && unset HTTP_PROXY && unset HTTPS_PROXY"
alias work="cd ~/Documents/work/www/"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

export DPRINT_INSTALL="/Users/cloud.liu/.dprint"
export PATH="$DPRINT_INSTALL/bin:$PATH"
```

## Create ssh key

```shell
cd ~ && mkdir .ssh && cd .ssh
touch id_rsa && touch id_rsa.pub
# Put content into credentials
chmod 400 id_rsa && chmod 400 id_rsa.pub
```

## Install Brew

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Install Wget

```shell
brew install wget
```

## Install Neovim

```shell
brew install neovim
brew install ripgrep
brew install fd
cd ~/.config/ && git clone git@github.com:GitHubCloud/nvim-cloud.git nvim
```

## Install Hack Font

https://www.nerdfonts.com/font-downloads

https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/Hack.zip

## Install Rust

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

## Install NVM

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
```

```shell
echo '[http "https//github.com/"]' >> ~/.gitconfig
echo "	proxy = http://127.0.0.1:$SSR_PORT/" >> ~/.gitconfig
npm config set proxy http://localhost:$SSR_PORT
npm config set https-proxy http://localhost:$SSR_PORT
npm i -g yarn
```
