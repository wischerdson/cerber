# Nexa

## Prepare environment
Add alias for *nexa* to your shell. For example for zsh: paste ```alias nexa="./nexa"``` to ```~/.zshrc``` and run ``` source ~/.zshrc```

Create a file .env based on .env.example:
```bash
cp .env.example .env
```

Edit .env file according to your environment.

For **development** purposes set ```APP_ENV``` to ```local```

Up application
```bash
nexa up
```
