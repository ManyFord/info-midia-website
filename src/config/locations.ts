import type { CityMarker, CustomerLocation } from "@/types";

export const customerLocations: CustomerLocation[] = [
  {
    state: "Mato Grosso do Sul",
    stateCode: "MS",
    cities: ["Campo Grande"],
  },
  {
    state: "Mato Grosso",
    stateCode: "MT",
    cities: [
      "Alta Floresta",
      "Campo Verde",
      "Guarantã do Norte",
      "Lucas do Rio Verde",
      "Primavera do Leste",
    ],
  },
  {
    state: "Paraná",
    stateCode: "PR",
    cities: [
      "Altamira do Paraná",
      "Anahy",
      "Assis Chateaubriand",
      "Astorga",
      "Boa Vista da Aparecida",
      "Braganey",
      "Cafelândia",
      "Campina da Lagoa",
      "Campo Mourão",
      "Cascavel",
      "Corbélia",
      "Entre Rios do Oeste",
      "Faxinal",
      "Formosa do Oeste",
      "Goioerê",
      "Iporã",
      "Jesuítas",
      "Laranjeiras do Sul",
      "Maripá",
      "Matelândia",
      "Nova Aurora",
      "Nova Laranjeiras",
      "Pranchita",
      "Rio Bonito do Iguaçu",
      "São João",
      "Toledo",
      "Tuneiras do Oeste",
      "Tupãssi",
      "Ubiratã",
      "Umuarama",
    ],
  },
  {
    state: "Santa Catarina",
    stateCode: "SC",
    cities: ["Joinville"],
  },
  {
    state: "São Paulo",
    stateCode: "SP",
    cities: ["Caiuá", "Mirante do Paranapanema"],
  },
];

export const cityMarkers: CityMarker[] = [];

export const coverageStateCount = customerLocations.length;

export const coverageCityCount = customerLocations.reduce(
  (total, location) => total + location.cities.length,
  0,
);
