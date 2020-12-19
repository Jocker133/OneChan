                                                         🎉 Bonjour et bienvenu sur OneChan 🎉

Je vais vous accompagner pour une visite guidée de ce merveilleux site, mais tout d'abord, qu'est-ce que OneChan?

OneChan est comme son nom l'indique, une version plus petite et simpliste du grand 4chan (donc un forum de discussion en gros). Où vous pouvez créer des thread de discussion ainsi qu'y répondre via des posts. La partie "simpliste" vient en partie du fait que nous n'avons qu'une seule page de discussion.

Vous vous demandez surement quelles technologies ont été utilisées pour créer un tel chef d'oeuvre?

Des components, des services, du routing, des observables et un peu de testing (sinon c'est pas drôle).

D'où on récupère/envoie les données pour les thread/posts?

-> serveur Json, et pour les données :
    -> un id
    -> une date de création
    -> un message
    -> une image (pas utilisé certes)
    -> un parentid (vous verrez son utilisation plus tard)
    -> un rôle (pour différencier "Admins", "Modos" et "Anonymous")
    -> un threadHead (pour différencier une tête de thread d'un simple post)

En dehors des données, il y a du css personnel ainsi qu'un travail TITANESQUE fait par Angular material.

Maintenant passons à la partie intéressante, comment accéder au site?

Et bien si vous ne l'avez pas encore fait il faut récupérer "nodes_modules" en tappant "npm install" dans le terminal.
Et sinon pour la suite il vous suffit d'ouvrir deux terminaux: un où vous écrirez "json-server db.json" et l'autre "ng serve" et la magie devrait opérer.

Une fois arrivé sur le site ne vous en faite pas, je vais vous guider.

Vous allez probablement voir les différents threads mais ce n'est pas ce qui va nous intéresser pour le moment.
Il y a déjà un bouton "Delete without confirmation" qui deviendra "Delete with confirmation" après avoir cliqué dessus.
La version "without" vous laissera supprimer un post/thread sans problème, mais si vous avez peur que votre souris dérappe et que vous supprimiez accidentellement un post, utilisez alors la version "with" qui vous enverra un popup de confirmation dès que vous voudrez supprimer un message.

Le bouton suivant, "Add a thread" vous enverra vers un formulaire pour créer une tête de thread (pour commencer une discussion).

"Touch me to delete multiple posts" va vous changer de "mode" puisqu'une fois que vous aurez cliqué dessus vous ne pourre plus cliquer que sur "Select me" que vous trouverez sur les têtes de thread/posts et sur "Delete the posts", qui vous permettra de supprimer tout ce que vous aurez sélectionné. Bien sur si vous cliquez sur "Choose posts to delete" vous repasserez en mode "normal". Et n'essayez pas de cliquer sur "Delete posts" sans avoir sélectionné de posts au préalable, on vous surveille (un popup vous dira non).

Maintenant que ces trois boutons ont été expliqués, passons à la gestion des thread.

Pour les têtes de thread (en bleu), il y a "edit" (plutôt explicite), "delete" (faites attention appuyer sur ce bouton supprimera le thread en entier, pas que la tête, puisque des posts n'ont pas vraiment de raisons d'être sans tête de thread), "-" (qui cachera les posts présents dans le thread, une fois utilisé le bouton deviendra un "+" pour les révéler à nouveau) ainsi que "Add a post in this thread" (qui vous permettra de créer un nouveau post dans le thread en question).

Pour les posts (en bleu), vous trouverez "edit", "delete" (qui ne supprimer que le post) et "Answer" qui vous demandera de créer un post de réponse dans le thread, ce post contiendra l'id du post question et, en passant la souris sur l'id (qui sera sous forme de bouton) le post question sera mis en surbrillance.

Si vous dévidez de supprimer tous les posts de la page, quelqu'un viendra mendier.