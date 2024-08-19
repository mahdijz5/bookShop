@echo off
cd /d "path/to/projects"

start cmd /k pnpm run start:dev core
start cmd /k pnpm run start:dev auth
start cmd /k pnpm run start:dev package

exit