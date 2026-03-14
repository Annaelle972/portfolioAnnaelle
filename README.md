# PortfolioAnnaelle - Lancement dans GitHub Codespaces

Ce projet est un site **HTML/CSS/JS pur**.  
Dans GitHub Codespaces, il est plus pratique d’utiliser un petit serveur local pour pouvoir ouvrir le site via un port.

## Prérequis pour le bon fonctionnement de ce site Web

- Un Codespace créé à partir de ce dépôt.
- Node.js installé dans le Codespace (normalement déjà présent).

## Démarrage rapide

1. Ouvrir un terminal dans le Codespace  
   - Menu : `Terminal` → `New Terminal`.

2. Installer le serveur statique `serve` (une seule fois) :

   ```bash
   npm install -g serve
   ```

3. Aller dans le dossier qui contient index.html (si c'est le cas, sinon pas besoin d'aller dans un dossier):

   ```bash
   cd nomDossier
   ```

4. Lancer le serveur sur le port 3000 :

   ```bash
   serve -l 3000 
   ```

5. Ouvrir le site dans le navigateur :

    - En bas de VS Code, onglet PORTS.
    - Repérer le port 3000.
    - Cliquer sur l’icône de globe (Open in Browser).

   ```bash
   Le site s’ouvrira alors dans un nouvel onglet de ton navigateur, servi directement depuis le Codespace.
   ```

