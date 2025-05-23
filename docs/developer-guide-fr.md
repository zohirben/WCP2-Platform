# Expérience Marocaine - Documentation pour Développeurs

## Aperçu

L'Expérience Marocaine est une application web complète construite avec Next.js qui fournit des informations sur le Maroc, y compris les sites culturels, les hébergements, les restaurants et les options de transport. Ce document sert de guide pour les développeurs travaillant sur ou maintenant la plateforme.

## Table des Matières

1. [Stack Technologique](#stack-technologique)
2. [Structure du Projet](#structure-du-projet)
3. [Composants Principaux](#composants-principaux)
4. [Système de Design](#système-de-design)
5. [Système de Motifs](#système-de-motifs)
6. [Flux d'Authentification](#flux-dauthentification)
7. [Ajout de Nouvelles Fonctionnalités](#ajout-de-nouvelles-fonctionnalités)
8. [Bonnes Pratiques](#bonnes-pratiques)
9. [Directives de Déploiement](#directives-de-déploiement)
10. [Dépannage](#dépannage)

---

## Stack Technologique

La plateforme est construite en utilisant les technologies suivantes:

- **Framework**: Next.js (App Router)
- **Langage**: TypeScript
- **Styling**: Tailwind CSS
- **Bibliothèque de Composants**: Composants personnalisés construits sur les primitives Radix UI
- **Authentification**: Implémentation personnalisée (extensible aux fournisseurs OAuth)
- **Gestion des Formulaires**: React Hook Form avec validation Zod
- **Animation**: Animations CSS via Tailwind

---

## Structure du Projet

```
WCP2-Platform/
├── app/                    # Pages et layouts Next.js App Router
│   ├── about/              # Page À propos
│   ├── auth/               # Pages d'authentification (connexion/inscription)
│   ├── contact/            # Page Contact
│   ├── offers/             # Page des offres pour matchs, restaurants, etc.
│   └── pattern-visualizer/ # Outil de développement pour visualiser les motifs
├── components/             # Composants React réutilisables
│   ├── auth/               # Composants d'authentification
│   ├── navigation/         # Composants d'en-tête, pied de page et navigation
│   └── ui/                 # Composants UI incluant les motifs
├── docs/                   # Fichiers de documentation
├── hooks/                  # Hooks React personnalisés
├── lib/                    # Fonctions utilitaires, constantes et configuration
├── public/                 # Assets statiques
│   └── downloaded designs/ # Images de motifs et ressources de design
└── tailwind.config.ts      # Configuration Tailwind avec thème personnalisé
```

---

## Composants Principaux

### Composants de Page

Chaque page dans l'application est représentée par un fichier `page.tsx` dans le répertoire correspondant sous le dossier `app`. Ces composants suivent la convention Next.js App Router et sont des composants serveur par défaut, sauf s'ils sont marqués avec `"use client"`.

### Composants UI

L'application utilise une collection de composants UI construits sur les primitives Radix UI. Ces composants sont organisés dans le répertoire `components/ui` et fournissent un style et un comportement cohérents dans toute l'application.

Les principaux composants UI incluent:

- **ButtonCTA**: Bouton d'appel à l'action personnalisé avec style marocain
- **Card**: Conteneur de contenu avec style cohérent
- **Composants de Motifs**: Composants pour rendre les motifs géométriques marocains

### Composants de Navigation

Le système de navigation comprend:

- **Header**: Barre de navigation principale en haut de chaque page
- **Footer**: Pied de page du site avec liens et informations
- **MainNav**: Liens de navigation et menu

---

## Système de Design

### Couleurs

L'application utilise une palette de couleurs inspirée du Maroc définie dans `tailwind.config.ts`:

```typescript
moroccan: {
  red: '#8A1538',      // Rouge marocain primaire
  blue: '#003366',     // Bleu profond utilisé dans les en-têtes et pieds de page
  sand: '#E0C097',     // Couleur sable chaude pour les arrière-plans
  green: '#6E7154',    // Couleur verte d'accent
}
```

Ces couleurs sont utilisées de manière cohérente dans toute l'application pour maintenir une cohérence visuelle.

### Typographie

L'application utilise une combinaison de polices système et de polices spécialisées pour les titres:

- **Titres**: Utilise la police "Amiri" pour une sensation marocaine traditionnelle
- **Corps**: Utilise la stack de polices système pour une lisibilité optimale

### Animations

Plusieurs animations personnalisées sont définies dans `tailwind.config.ts`:

- **geometric-reveal**: Animation subtile d'échelle et de fondu pour les éléments UI
- **pattern-float**: Mouvement subtil continu pour les motifs d'arrière-plan

Exemple d'utilisation:

```tsx
<div className="animate-geometric-reveal">Contenu</div>
```

---

## Système de Motifs

L'application présente un système complet de motifs marocains qui ajoute richesse visuelle et authenticité culturelle.

### Composants de Motifs

- **CustomZellijPattern**: Un composant configurable pour afficher les motifs zellij
- **ZellijPattern & MoroccanArchPattern**: Composants de motifs prédéfinis

### Animation de Motifs

Les motifs utilisent l'animation `pattern-float` pour un mouvement subtil:

```tsx
<div 
  className="absolute inset-0 opacity-10 z-0 pointer-events-none animate-pattern-float"
  style={{
    backgroundImage: "url('/downloaded designs/Tarceeh 1-7-11imageOne.jpg')",
    backgroundRepeat: "repeat",
    backgroundSize: "400px",
    imageRendering: "auto",
  }}
/>
```

L'animation déplace la position de l'arrière-plan en continu dans une boucle sans couture:

```typescript
'pattern-float': {
  '0%': { backgroundPosition: '0px 0px' },
  '100%': { backgroundPosition: '400px 400px' },
},
```

Avec une durée de 60 secondes:

```typescript
'pattern-float': 'pattern-float 60s linear infinite',
```

### Gestion des Motifs

Le script `manage-patterns.sh` fournit des utilitaires pour travailler avec les images de motifs:

```bash
./manage-patterns.sh optimize <chemin-image>  # Optimiser une image pour utilisation web
./manage-patterns.sh list                     # Lister les motifs disponibles
./manage-patterns.sh visualize                # Accéder au visualiseur de motifs
```

Le Visualiseur de Motifs (`/pattern-visualizer`) permet de tester différents motifs et configurations pendant le développement.

---

## Flux d'Authentification

Le système d'authentification est implémenté dans le répertoire `app/auth` avec les composants correspondants dans `components/auth`.

### Processus de Connexion

1. L'utilisateur entre ses identifiants dans le composant `LoginForm`
2. La validation du formulaire se fait via React Hook Form et Zod
3. Après validation réussie, la requête d'authentification est envoyée
4. L'utilisateur est redirigé vers la page d'accueil en cas de succès ou une erreur est affichée

### Processus d'Inscription

Similaire à la connexion mais avec des champs supplémentaires pour les informations utilisateur.

### Validation de Formulaire

Les formulaires utilisent React Hook Form avec des schémas Zod pour la validation:

```typescript
// Exemple de schéma
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
```

### Placeholders d'Authentification

L'implémentation actuelle utilise des fonctions placeholder pour les processus d'authentification. Elles se trouvent dans les composants de formulaire de connexion et d'inscription:

```typescript
// components/auth/login-form.tsx
const onSubmit = async (data: z.infer<typeof formSchema>) => {
  // Ceci est un placeholder pour la logique d'authentification réelle
  // À remplacer par votre intégration de service d'authentification
  try {
    // Délai simulé d'appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // TODO: Remplacer par un appel API d'authentification réel
    // Exemple: await authService.login(data.email, data.password);
    
    toast({
      title: "Connexion réussie!",
      description: "Bienvenue sur la plateforme.",
    });
    
    // Redirection vers le tableau de bord ou la page d'accueil
    router.push('/');
  } catch (error) {
    toast({
      title: "Échec de l'authentification",
      description: "Veuillez vérifier vos identifiants et réessayer.",
      variant: "destructive",
    });
  }
};
```

Pour implémenter l'authentification réelle:

1. Créer un service d'authentification dans `/lib/auth.ts`
2. Remplacer les fonctions placeholder par des appels API réels
3. Implémenter une gestion de session appropriée
4. Mettre à jour les formulaires pour gérer les réponses d'authentification réelles

Options d'authentification recommandées:
- Next-Auth pour l'intégration OAuth et la connexion sociale
- Implémentation JWT personnalisée pour les cas d'utilisation plus simples
- Firebase Authentication pour une configuration rapide

---

## Ajout de Nouvelles Fonctionnalités

### Ajouter une Nouvelle Page

1. Créer un nouveau répertoire dans le dossier `app`
2. Ajouter un fichier `page.tsx` avec le composant de page
3. Mettre à jour la navigation si nécessaire

Exemple:

```tsx
// app/new-feature/page.tsx
export default function NewFeaturePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="section-title">Nouvelle Fonctionnalité</h1>
      {/* Contenu de la page */}
    </div>
  );
}
```

### Ajouter un Nouveau Composant

1. Créer un nouveau fichier dans le répertoire approprié sous `components`
2. Exporter le composant en utilisant des exports nommés ou par défaut
3. Importer et utiliser le composant où nécessaire

Exemple:

```tsx
// components/ui/new-component.tsx
export function NewComponent({ title, children }) {
  return (
    <div className="p-4 border rounded">
      <h2 className="font-amiri text-xl mb-2">{title}</h2>
      <div>{children}</div>
    </div>
  );
}
```

### Ajouter un Nouveau Motif

1. Ajouter l'image du motif à `/public/pattern-options/`
2. L'optimiser en utilisant le script de gestion des motifs:
   ```bash
   ./manage-patterns.sh optimize /chemin/vers/nouveau-motif.jpg
   ```
3. L'utiliser dans vos composants:
   ```tsx
   <div
     className="absolute inset-0 opacity-10 animate-pattern-float"
     style={{
       backgroundImage: "url('/pattern-options/nouveau-motif.jpg')",
       backgroundRepeat: "repeat",
       backgroundSize: "400px",
       imageRendering: "auto",
     }}
   />
   ```

---

## Bonnes Pratiques

### Style de Code

- Utiliser TypeScript pour tous les nouveaux fichiers
- Suivre la structure de composants existante
- Utiliser des exports nommés pour les composants réutilisables
- Utiliser Tailwind CSS pour le styling
- Utiliser la palette de couleurs marocaine pour la cohérence

### Considérations de Performance

- Optimiser les images avant de les ajouter au projet
- Utiliser le composant `Image` de Next.js pour les images responsives
- Garder l'opacité des motifs basse (typiquement 0.10) pour éviter une surcharge visuelle
- Utiliser l'import `next/dynamic` pour les composants qui ne sont pas nécessaires immédiatement

### Accessibilité

- Utiliser des éléments HTML sémantiques
- Inclure du texte alternatif pour toutes les images
- Assurer un contraste de couleur suffisant
- Tester la navigation au clavier

---

## Directives de Déploiement

### Processus de Build

1. Exécuter la commande de build:
   ```bash
   npm run build
   ```

2. Tester le build de production localement:
   ```bash
   npm start
   ```

3. Déployer vers votre fournisseur d'hébergement

### Variables d'Environnement

L'application peut utiliser des variables d'environnement pour la configuration. Créer un fichier `.env.local` pour le développement local et définir les variables appropriées dans votre environnement de production.

---

## Dépannage

### Problèmes Courants

#### Problèmes de Rendu des Motifs

Si les motifs ne s'affichent pas correctement:

- Vérifier que le chemin de l'image est correct
- S'assurer que le fichier image existe
- Vérifier que l'animation est correctement appliquée
- Vérifier la console du navigateur pour les erreurs

#### Incohérences de Style

Si les styles ne sont pas appliqués correctement:

- Redémarrer le serveur de développement
- Vérifier la configuration Tailwind
- Vérifier que les noms de classe sont corrects

#### Erreurs de Build

Si le build échoue:

- Vérifier les erreurs TypeScript
- S'assurer que toutes les dépendances sont installées
- Vérifier que les imports de fichiers sont corrects

---

Pour un support supplémentaire, référez-vous au README du projet ou contactez les mainteneurs du projet.