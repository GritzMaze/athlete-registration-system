interface Country {
  name: string;
  flag: string;
}

interface RawCountry {
  name: {
    common: string;
    official: string;
  };
  flag: string;
}

class CountriesService {
  private countries = [];
  async getCountries(): Promise<Country[]> {
    if (this.countries.length) {
      return this.countries;
    }

    const countries = (await (
      await fetch('https://restcountries.com/v3.1/all?fields=name,flag')
    ).json()) as RawCountry[];
    return countries.map((country) => ({
      name: country.name.common,
      flag: country.flag,
    }));
  }
}

export const countriesService = new CountriesService();
