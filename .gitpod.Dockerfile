FROM gitpod/workspace-full:latest

# Cache firebase
RUN nvm install 14 && \
    npm install --global npm gulp-cli yo @microsoft/generator-sharepoint