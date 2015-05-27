# Twitter search

## Opis
Angular.js one page site koji simulira Twitter search koristeći Twitter API za dohvat tweetova. Unos keyworda se obavlja preko forme (imitacija Twitter search boxa). Suggestione se ne ispisuju (nije implementirano). Eventualne pogreške prilikom dohvata s APIja se ispisuju u popupu. Rezultati sa se ispisuju s pripadnim metapodacima (autor i tekst tweeta s brojem retweetova i favoritesa).

## Korištene tehnologije:
- MongoDB
- ExpressJs
- AngularJS
- Node.js
- Grunt
- socket.io

## Potrebna dokumentacija
Dokumentacija potrebnih API metoda se može pronaći na https://dev.twitter.com/rest/public.  
Proces registracije aplikacije i dohvata tokena za API requestove obaviti na https://apps.twitter.com/.

## TODO
- [x] paginacija za više od 20 rezultata
- [x] pamćenje prethodnih searcheva u sidebaru
- [ ] ispis pogrešaka u popupu
- [x] highlight traženog keyworda u tekstu tweeta
- [ ] refactoring koda
