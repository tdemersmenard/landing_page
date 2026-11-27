# Séquences de relance : Système TDM

## Règles

- **Consentement.** Tout ce qui est promotionnel part seulement si `consentement = true`. Seule exception : le courriel immédiat de l'ebook, parce que la personne l'a demandé (version sans promotion).
- **Arrêts.** On arrête toute relance dès un achat (événement « achat_complete » envoyé par le webhook Stripe), un STOP ou un désabonnement.
- **Chaque courriel** finit par le pied de page plus bas (nom, adresse, désabonnement).
- **Chaque texto** finit par « Réponds STOP pour te désabonner ». Envoi entre 9 h et 20 h.
- **Rien après le lundi 30 novembre 2026, 23 h 59.** Un envoi dont l'heure est passée est sauté, pas reporté.
- Aucun revenu promis. Aucun faux témoignage.
- Variables : `{{prenom}}`, `{{email}}`, `{{lien_page}}` (la page de vente, /), `{{lien_pdf}}`, `{{lien_paiement}}` (/paiement), `{{lien_skool}}` (le cours, envoyé après l'achat), `{{lien_reservation}}` (Calendly, PLAN_DE_MATCH_URL), `{{lien_desabonnement}}`, `{{adresse_entreprise}}`, `{{date_limite_credit}}` (achat + 14 jours).

Pied de page des courriels :

> Système TDM, {{adresse_entreprise}}
> Tu reçois ce courriel parce que tu as demandé l'ebook ou commencé un achat. Me désabonner : {{lien_desabonnement}}

---

## 1. Type « ebook »

### Courriel 1 : tout de suite (à tout le monde)

**Objet :** Ton ebook est là

Salut {{prenom}},

Voici ton ebook, « Les 7 services qui peuvent te rapporter jusqu'à 900 $ par semaine cet été » : {{lien_pdf}}

Commence par la page « Choisis en 10 minutes ». T'as juste besoin d'un crayon.

Thomas

### Courriel 2 : le lendemain, 18 h

**Objet :** T'as choisi lequel?

Salut {{prenom}},

Le plus dur, c'est pas de savoir tondre un gazon ou laver une vitre. C'est de choisir, pis de commencer.

Si t'hésites entre deux services, prends celui que tu peux offrir à quelqu'un cette semaine.

La suite, étape par étape, c'est les 8 modules de Système TDM. C'est 87 $ jusqu'à lundi : {{lien_page}}

Thomas

### Courriel 3 : vendredi 27 novembre, 12 h

**Objet :** Black Friday : les 8 modules à 87 $

Salut {{prenom}},

Ce que t'as pour 87 $ : les 8 modules vidéo, le Kit Copier-Coller (soumission, contrat, facture, flyer, annonce), 25 scripts, les automatisations IA et la communauté Skool.

C'est préenregistré. Y'a pas d'appels de coaching là-dedans. Un seul paiement.

{{lien_page}}

Thomas

### Courriel 4 : dimanche 29 novembre, 18 h

**Objet :** « Pis si ça marche pas? »

Salut {{prenom}},

La garantie est simple : fais les modules 1 à 5 et contacte au moins 100 clients potentiels dans les 30 jours. Si t'as pas signé ton premier client, je te rembourse tes 87 $ au complet.

Je peux pas te garantir un revenu. Ça dépend de ton travail, de ton coin et de ton service.

{{lien_page}}

Thomas

### Courriel 5 : lundi 30 novembre, 18 h

**Objet :** Ça finit à 23 h 59

Salut {{prenom}},

Le prix de 87 $ finit ce soir à 23 h 59, heure de l'Est.

Si c'est pour toi, c'est ici : {{lien_page}}

Si c'est pas le bon moment, garde l'ebook et commence quand même par un premier client.

Thomas

---

## 2. Type « achat_commence », sans « achat_complete »

Envoyé par /paiement dès que le courriel est valide (une fois par session). `prenom` et `telephone` peuvent être vides : le texto part seulement s'il y a un téléphone, et le courriel dit « Salut » sans prénom s'il manque.

### Texto : après 1 h

Salut {{prenom}}, c'est Thomas de Système TDM. T'as commencé ton inscription, mais je vois pas ton achat. Besoin d'aide? C'est ici : {{lien_paiement}} Réponds STOP pour te désabonner

### Courriel : après 24 h

**Objet :** T'es resté pris quelque part?

Salut {{prenom}},

T'as commencé ton inscription à Système TDM, mais elle est pas finie.

1. Va ici : {{lien_paiement}}
2. Paie par carte, Apple Pay ou Google Pay : 87 $ CAD, un seul paiement.
3. Ton accès arrive par courriel tout de suite après.

Une question? Réponds à ce courriel, c'est moi qui lis.

Thomas

### Texto : lundi 30 novembre, 18 h

{{prenom}}, c'est Thomas de Système TDM. Le prix de 87 $ finit ce soir à 23 h 59 : {{lien_paiement}} Réponds STOP pour te désabonner

---

## 3. Après l'achat (« achat_complete ») : courriel de bienvenue avec l'accès

Bienvenue dans Système TDM, {{prenom}}!

1. **Ton cours :** {{lien_skool}}. Commence par le module 1, « Choisis ton service ».
2. **Ton Kit, tes 25 scripts et tes automatisations** sont dans la salle de classe.
3. **Ta garantie :** les 30 jours commencent le jour de l'achat. Note tes 100 contacts à mesure (date, moyen, quartier).
4. **Réserve ton appel « Plan de match » de 20 minutes :** {{lien_reservation}}. On regarde ton service, ton coin et ta prochaine étape. C'est facultatif. À la fin, je peux te parler du coaching, sans obligation.

Thomas

---

## 4. Ascension : le coaching

Après l'achat, seulement aux personnes qui ont pas déjà pris le coaching. Le crédit de 87 $ est appliqué à la main.

### Jour 3 (courriel)

**Objet :** T'es rendu où?

Salut {{prenom}},

T'as choisi ton service? Si t'as pas réservé ton appel « Plan de match », c'est ici : {{lien_reservation}}

20 minutes, pis tu repars avec ta prochaine étape.

Thomas

### Jour 7 (courriel)

**Objet :** Seul ou accompagné

Salut {{prenom}},

Les 8 modules, c'est fait pour avancer seul, à ton rythme. Y'en a qui préfèrent quelqu'un qui regarde leurs prix, leurs scripts pis leurs soumissions avec eux.

C'est ça, le programme avec coaching 1-on-1 : 1 500 $. Si tu montes d'ici le {{date_limite_credit}}, ton 87 $ est crédité.

On en parle à ton appel : {{lien_reservation}}

Thomas

### Jour 10 (texto)

{{prenom}}, c'est Thomas de Système TDM. T'as une question sur tes prix ou tes premiers clients? On en jase 20 min : {{lien_reservation}} Réponds STOP pour te désabonner

### Jour 13 (courriel)

**Objet :** Ton crédit de 87 $ finit demain

Salut {{prenom}},

Ton 87 $ peut être crédité sur le coaching 1-on-1 (1 500 $) jusqu'au {{date_limite_credit}}.

Si les modules te suffisent, continue comme ça. Si tu veux qu'on le fasse ensemble, réserve ici : {{lien_reservation}}

Thomas
