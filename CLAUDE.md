# Projet : funnel Black Friday de Système TDM

## L'offre
- Programme : Système TDM, une formation pour les jeunes qui veulent lancer une business de service (tonte de gazon, piscines, lavage de vitres, déneigement, etc.).
- Promesse : « Lance ta business de service et signe ton premier client en 30 jours. Sinon, t'es remboursé. »
- Offre Black Friday : le programme (8 modules préenregistrés) à 87 $ CAD, sans coaching.
- Le prix 87 $ doit être L'ÉLÉMENT LE PLUS VISIBLE de la page. Seul prix barré permis : le programme avec coaching 1-on-1 (1 500 $), TOUJOURS avec la mention « avec coaching 1-on-1 ».
- Fin de l'offre : lundi 30 novembre 2026, 23 h 59, heure de l'Est. Après, les boutons d'achat se désactivent.
- Inclus à 87 $ : les 8 modules vidéo, le Kit Copier-Coller (soumission, contrat, facture, flyer, annonce Marketplace), les 25 scripts qui signent, les automatisations IA prêtes à installer, la communauté Skool.
- Pas d'appels de coaching dans l'offre à 87 $.
- Garantie : « Fais les modules 1 à 5 et contacte au moins 100 clients potentiels dans les 30 jours. Si t'as pas signé ton premier client, je te rembourse tes 87 $ au complet. »
- Preuve du fondateur : près de 100 000 $ de ventes (avant dépenses) en un été avec une business de service.

## Le funnel officiel
- Pubs froides (Meta) → /ebook → /ebook/merci (offre à 87 $) → /paiement → /merci-achat.
- Trafic chaud (Instagram, TikTok, lien en bio, relances) → / (page de vente à 87 $) → /paiement → /merci-achat.
- Pas de retargeting pour l'instant.
- Le paiement se fait sur le site, à /paiement : Stripe Payment Element + Apple Pay / Google Pay, 87 $ CAD fixé côté serveur. Le webhook Stripe (/api/stripe-webhook) envoie « achat_complete » à Make, qui envoie l'accès Skool par courriel.
- Après l'achat : un appel « Plan de match » de 20 minutes (PLAN_DE_MATCH_URL, Calendly), puis le coaching à 1 500 $. Le 87 $ est crédité si la personne monte dans les 14 jours (crédit appliqué à la main).
- Règle : une page = une action. /ebook ne mentionne jamais le prix, le Black Friday ni le compte à rebours, et n'a aucun lien vers la page de vente.
- Toutes les valeurs (prix, nom, liens, infos légales, garantie) sont dans lib/config.ts. Aucune valeur écrite en dur dans les pages.
- Les messages de relance sont dans content/sequences.md.

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
- Paiement : Stripe (clés dans .env.local : STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET). L'accès à Skool est envoyé par Make après « achat_complete ».
- Leads : envoyés à un webhook Make (variable d'environnement MAKE_WEBHOOK_URL), qui s'occupe des courriels et des textos.
- Les secrets vont TOUJOURS dans .env.local, jamais dans le code. Tiens un fichier .env.example à jour.

## Placeholders
Tout ce que je dois fournir moi-même (nom, âge, histoire, photo, courriel de contact) doit être écrit entre [crochets] et surligné visuellement, pour que je le voie avant de publier. N'invente jamais de témoignage ni de chiffre.
