/**Importera npm paket att använda package.json använder type:"module" */
import express from 'express';
import fetch from 'node-fetch';

/** Instantiera express klassen och lägger den inuti appi konstant smat sätter port nummer */
const app = express();
const port = 3000;

/** Skapar ett API endpoint med express */
app.get('/products', (req, res) => {

  fetch('https://draft.grebban.com/backend/products.json') /**Hämtar produkt datan */
  .then(response => response.json())
  .then(products => {
    return fetch('https://draft.grebban.com/backend/attribute_meta.json') /**Hämtar attribut datan samt returnera det så att den är nårbart utanför den lokala scopen */
      .then(response => response.json())
      .then(attributes => {
        /** "Mappa" igenom produkt attributerna */
        products.forEach(product => {
          for (let key in product.attributes) {
            let attributeValue = product.attributes[key];
            let attribute = attributes.find(attr => attr.code === key);
            
            /** Kontrollera att attributerna existera i produkt subet nycklar om det gör det jämför då både nycklarna i båda subset */
            if (attribute) {
              let value = attribute.values.find(val => val.code === attributeValue);
              if (value) { /** Om det nycklarna matchar går ner i dimensioner tills värderna matchar */
                product.attributes[key] = value.name;
                if (attribute.code === 'cat') { /**kollar så att värdet börjar med "cat" */
                  let parentCategory = attributes.find(attr => attr.code === 'cat' && value.code.startsWith(attr.code));
                  if (parentCategory) { /** Kolla om kategorin har föräldrar */
                    if (parentCategory.code !== value.code) {
                      product.attributes[key] = parentCategory.name + '>' + value.name;
                    } else {
                      product.attributes[key] = value.name; /** Annars returnera */
                    }
                  }
                }
              }
            }
          } /** Kolla om det finns hierarki i category baserad på om det finns komma(",") någonstans i strängen*/
          if (product.attributes['cat'] && product.attributes['cat'].startsWith('cat_')) {
            let catValues = product.attributes['cat'].split(',');
            let newCatValues = [];
            catValues.forEach(catValue => {
              let attribute = attributes.find(attr => attr.code === 'cat');
              let value = attribute.values.find(val => val.code === catValue);
              if (value) {
                let parentCategory = attributes.find(attr => attr.code === 'cat' && value.code.startsWith(attr.code));
                if (parentCategory) {
                  if (parentCategory.code !== value.code) {
                    newCatValues.push(parentCategory.name + '>' + value.name);
                  } else {
                    newCatValues.push(value.name);
                  }
                }
              }
            });
            if (newCatValues.length > 0) {
              product.attributes['cat'] = newCatValues.join(',');
            }
          }
        });

        res.send(products);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Internal Server Error');
      });
  })
  .catch(error => {
    console.error(error);
    res.status(500).send('Internal Server Error');
  });

});


/** Starta API ändpunkten */
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});