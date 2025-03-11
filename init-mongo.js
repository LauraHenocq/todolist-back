db = db.getSiblingDB('todolistdb');

db.tasks.insertMany([
  {
    title: 'Appeler Octopus',
    description: 'Appeler le fournisseur d\'énergie Octopus pour faire un devis et comparer le prix à mon fournisseur d\'énergie actuel',
    status: 'TODO'
  },
  {
    title: 'Acheter des oranges',
    description: 'Pour les jus du petit déjeuner de la semaine',
    status: 'TODO'
  },
  {
    title: "Commander des croquettes pour le chat",
    description: 'Sa majesté le chat souhaite changer de croquettes, les actuelles ne lui plaisent plus',
    status: 'TODO'
  }
]);

print("Données insérées !");