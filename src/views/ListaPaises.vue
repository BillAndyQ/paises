<template>
    <div>
      <InputSearch @search-countries="searchCountries"/>
      <div class=" lg:w-fit w-full lg:mx-auto m-0 pb-6 flex justify-center max-w-screen-lg">
        <div class="grid grid-wrap gap-4 mt-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-center">
            <CardPais
            @detailsCountry="viewDetails(country.code, country.imageUrl)"
            v-for="country in countries"
            :key="country.code"
            :nombre-pais="country.name"
            :continente-pais="country.continent.name"
            :bandera="country.emoji"
            :imagenPais="country.imageUrl"
            
          />
          <DetailsCountry
          @update:hidden="classHidden = $event" 
            :key="detailCountry.code"
            :nombre-pais="detailCountry.name"
            :continente-pais="detailCountry.continent"
            :bandera="detailCountry.emoji"
            :languages="detailCountry.languages"
            :capital="detailCountry.capital"
            :currency="detailCountry.currency"
            :imagenPais="detailCountry.imageUrl"
            :states="detailCountry.states"
            :hidden="classHidden"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
//   Componentes
  import InputSearch from '@/components/InputSearch.vue';
  import CardPais from '@/components/CardPais.vue';
  import DetailsCountry from '@/components/DetailsCountry.vue';
  import gql from 'graphql-tag';
  import axios from 'axios';
  
  export default {
    name: 'ListaPaises',
    components: {
      InputSearch,
      CardPais,
      DetailsCountry
    },
    data() {
      return {
        countries: [], // Array que almacena la busqueda de los países
        loading: false,
        error: null,
        classHidden: "hidden",
        detailCountry : [], // Array que almacena los datos de un pais
      };
    },
    methods: {
        viewDetails(code, img){         //Ver detalles de un pais
            this.classHidden = "";
            this.getDataCountry(code, img);
        },
        async getDataCountry(code, img) { // Uso de apollo y graphql para la consulta a la api
            console.log(code);
            this.loading = true;
            if(code){
                try {
            const { data } = await this.$apollo.query({
                query: gql`
                    query GetCountry($code: ID!) {
                    country(code: $code) {
                        name
                        native
                        capital
                        emoji
                        currency
                        states {
                            name
                        }
                        continent {
                            code
                            name
                        }
                        languages {
                        code
                        name
                        }
                    }
                    }
                `,
                variables: {
                    code 
                }
            });
            // Uno los datos de la respuesta con la dirección de la imagen que ya tenía
            const countryWithImages = { ...data.country, imageUrl: img };
            // Guardo el objeto clonado
            this.detailCountry = countryWithImages;
            } catch (error) {
                console.error('Error fetching countries:', error);
            }finally {
            this.loading = false;
          }
            }else{
                this.detailCountry = [];
            }
        },
        
      async searchCountries(searchTerm, Continent) { // Busqueda de los paises desde el input de busqueda
        console.log(Continent);
        if (searchTerm) {
          this.loading = true;
          try {
            if(Continent.length>=1){
              const { data } = await this.$apollo.query({
                query: gql`
                    query ListCountriesThatBeginWithTheLetterA($name: String!, $continent: [String!]) {
                    countries(filter: { 
                        name: { regex: $name },
                        continent: { in : $continent }
                    }) {
                        code
                        name
                        currency
                        emoji
                        capital
                        continent {
                        code
                        name
                        }
                        languages {
                        name
                        }
                    }
                    }
                `,
                variables: { name: `^${searchTerm}`, continent: Continent  }, // Variables de la busqueda
                });
                const countriesWithImages = await Promise.all(  //Clona el array e inserto la direccion de las imagenes
                  data.countries.map(async (country) => ({
                      ...country,
                      imageUrl: await this.getCountryImageUrl(country.name) // Usa la api de Unsplash
                  }))
                );
                this.countries = countriesWithImages; 
            }else{
              const { data } = await this.$apollo.query({
                query: gql`
                    query ListCountriesThatBeginWithTheLetterA($name: String!) {
                    countries(filter: { 
                        name: { regex: $name }
                    }) {
                        code
                        name
                        currency
                        emoji
                        capital
                        continent {
                        code
                        name
                        }
                        languages {
                        name
                        }
                    }
                    }
                `,
                  variables: { name: `^${searchTerm}` }, // Variables de la busqueda
                });
                console.log(data);
              const countriesWithImages = await Promise.all(  //Clona el array e inserto la direccion de las imagenes
              data.countries.map(async (country) => ({
                  ...country,
                  imageUrl: await this.getCountryImageUrl(country.name) // Usa la api de Unsplash
              }))
              );
              this.countries = countriesWithImages; 
            }
            // Guarda el array clonado
          } catch (err) {
            this.error = err;
          } finally {
            this.loading = false;
          }
        } else {
          this.countries = [];
        }
      },

      async getCountryImageUrl(countryName) { //Busqueda de imagen de un pais en la api de Unsplash 
      const accessKey = 'buzogU9AyRlDcf1m2C3QHKj7mjUN1098uf3QVzodEcw';
      try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: {
            query: countryName,
            per_page: 1
          },
          headers: {
            Authorization: `Client-ID ${accessKey}`
          }
        });

        if (response.data.results.length > 0) {
          return response.data.results[0].urls.regular; // Guardo la direccion url
        } else {
          return '';
        }
      } catch (err) {
        console.error(err);
        return '';
      }}
    },
  };
  </script>
