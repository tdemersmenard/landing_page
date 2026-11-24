# Projet : landing page Black Friday de Touch Grass Academy

## L'offre
- Programme : Touch Grass Academy, une formation pour les jeunes qui veulent lancer une business de service (tonte de gazon, piscines, lavage de vitres, déneigement, etc.).
- Promesse : « Lance ta business de service et signe ton premier client en 30 jours. Sinon, t'es remboursé. »
- Offre Black Friday : les 8 modules préenregistrés pour 87 $ CAD. Le programme complet avec coaching se vend 997 $.
- Le prix 87 $ doit être L'ÉLÉMENT LE PLUS VISIBLE de la page. Le 997 $ apparaît barré, toujours avec la mention « Les 8 modules du programme à 997 $ ». Ne jamais écrire juste « 87 $ au lieu de 997 $ » sans préciser que le coaching n'est pas inclus (Loi sur la concurrence, prix de comparaison).
- Fin de l'offre : lundi 30 novembre 2026, 23 h 59, heure de l'Est. Après, les boutons d'achat se désactivent.
- Inclus à 87 $ : les 8 modules vidéo, le Kit Copier-Coller (soumission, contrat, facture, flyer, annonce Marketplace), les 25 scripts qui signent, les automatisations IA prêtes à installer, la communauté Skool privée.
- PAS inclus : l'appel 1-on-1 et les 12 semaines d'appels de groupe (ça, c'est le programme à 997 $).
- Garantie : « Fais les modules 1 à 5 et contacte au moins 100 clients potentiels dans les 30 jours. Si t'as pas signé ton premier client, je te rembourse tes 87 $ au complet. »
- Preuve du fondateur : près de 100 000 $ en un été avec une business de service.

## Les 8 modules (dans l'ordre)
1. Choisis ton service : grille selon ton coin, ton budget, la demande, avec une calculatrice de rentabilité.
2. Pars avec presque rien : quoi acheter, où le trouver usagé, comment le payer avec ton premier client.
3. Règle le légal sans stress : NEQ, assurance responsabilité, taxes (pas de TPS/TVQ avant 30 000 $ de revenus).
4. Fixe tes prix : le calculateur de prix avec les vraies grilles.
5. Trouve tes clients en 7 jours : porte-à-porte, Marketplace, groupes Facebook, flyers, références.
6. Vends sans être gêné : scripts pour la porte, le téléphone, les textos, réponses aux objections.
7. Gère la paperasse : soumissions, contrats, factures, automatisations.
8. Grossis : pubs locales et premier employé.

## Le lead magnet
Ebook gratuit : « Les 7 services que tu peux lancer avec moins de 500 $ ».

## Public et ton
- Jeunes du Québec qui veulent arrêter de travailler au salaire minimum pour un boss.
- Français québécois naturel, direct, tutoiement. Pas de ton de « guru ». Pas de fausse rareté, pas de faux témoignages, pas de revenus promis.
- Mobile d'abord : la majorité du trafic vient d'Instagram et TikTok.

## Stack technique
- Next.js (App Router) + TypeScript + Tailwind, déployé sur Vercel.
- Paiement : page de paiement unique Skool (NEXT_PUBLIC_SKOOL_URL). Skool encaisse et donne l'accès automatiquement. Skool facture en USD.
- Leads : envoyés à un webhook Make (variable d'environnement MAKE_WEBHOOK_URL), qui s'occupe des courriels et des textos.
- Les secrets vont TOUJOURS dans .env.local, jamais dans le code. Tiens un fichier .env.example à jour.

## Placeholders
Tout ce que je dois fournir moi-même (nom, âge, histoire, photo, courriel de contact) doit être écrit entre [crochets] et surligné visuellement, pour que je le voie avant de publier. N'invente jamais de témoignage ni de chiffre.
