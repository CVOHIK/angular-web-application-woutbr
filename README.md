# angular-web-application-woutbr > angular-fijnstof-wandeling
Deze Angular applicatie toont een kaart van Antwerpen met de meting van fijnstof. Je kunt een route plannen en een grafiek van de hoeveelheid fijnstof langs deze route wordt getoond.
## Installation
Voeg een Google Maps api key toe in `angular-fijnstof-wandeling\src\environments\environment.ts` onder `environment.apiKeyGMaps`. De api's places en visualization moeten enabled zijn.
## Usage
Kies een begin en eind-locatie via de input velden. Een route hiertussen wordt getoond en een grafiek. Je kunt de route verplaatsen en waypoints toevoegen.