Procédure d'installation du module Open Data Drupal
===================================================



Prérequis
---------

Le module a été développé pour s'intégrer dans un site Drupal. 
Version minimale : **Drupal 8.3.7**
 

La mise en cache des jeux de données s'effectue dans une instance CKAN. Cette instance peut être installée en local ou sur un serveur distant.
Le module a été validé avec **CKAN version 2.7.0**





Intégration dans Drupal
-----------------------

Copier le dossier `//bfc_odl_admin` dans le répertoire `modules` de votre installation Drupal

Copier le dossier `//portail_bfc` dans le répertoire `sites//default/files/api` de votre installation Drupal

Activer le module bfc_odl_admin dans le menu Extension de Drupal

Accéder au menu Configuration > Administration Open Data.
Cliquer sur l'onglet **Ckan** pour définir l'URL et la clé API de l'instance CKAN utilisée comme cache local.
L'onglet **Moissonnage** permet de rechercher des organisations sur le site data.gouv.fr et d'intégrer leurs jeux de données dans le cache CKAN.
L'onglet **Sélection** permet de consulter la liste des organisations possédant des jeux de données dans l'instance CKAN. Il permet aussi de supprimer les organisations du cache.