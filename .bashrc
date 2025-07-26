 HEAD
# ~/.bashrc — Termux clean setup

# Set PATH
export PATH=$PREFIX/bin:$PATH

# Set aliases
alias ll='ls -la'
alias gs='git status'
alias gc='git commit'
alias gp='git push'
alias gco='git checkout'

# Set default editor
export EDITOR=nano

# Add custom prompt (optional)
PS1='\u@\h:\w$ '

# Enable colors for grep
export GREP_OPTIONS='--color=auto'

# Load termux styling (optional)
if [ -f ~/.termux/colors.properties ]; then
  termux-reload-settings
fi

# GIT and Android SDK setup
export GIT_DISCOVERY_ACROSS_FILESYSTEM=1
 HEAD
export GIT_DISCOVERY_ACROSS_FILESYSTEM=1

 04fc1bb49 (Update .gitcookies)
export ANDROID_NDK_HOME=$HOME/android-ndk-r25b
export android_ndk_path=$ANDROID_NDK_HOME
export PATH=$PATH:$ANDROID_NDK_HOME

 HEAD
# Node Version Manager (NVM)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Git sync aliases
alias syncup="git add . && git commit -m '🔄 Sync update' && git pull --rebase origin main && git push"
alias syncdown="git pull --rebase origin main"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
 HEAD
 origin/master
=======
alias syncup="git add . && git commit -m '🔄 Sync update' && git pull --rebase origin main && git push origin main"
alias syncdown="git pull --rebase origin main"
 293eda3f6a (🔄 Sync update)
 04fc1bb49 (Update .gitcookies)
