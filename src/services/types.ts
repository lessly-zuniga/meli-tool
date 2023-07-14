export type FirebaseProduct = {
    asin: string;
    product_name: string;
    current_price: number;
    is_prime: boolean;
    image_url: string;
    locale: string;
    currency_symbol: string;
}

export type FirebaseData = {
    country: string;
    currency: string;
    products: FirebaseProduct[];
    status: string;
    timestamp: any;
}

export type AmazonProduct = {
    asin: string;
    product_name: string;
    current_price: number;
    is_prime: boolean;
    image_url: string;
    locale: string;
    currency_symbol: string;
}

export type SaleTerm= {
    id: string;
    value_name: string;
  }

export type Picture= {
    source: string;
  }

export type Attribute= {
    id: string;
    value_name: string;
  }

export type CreateItemPayload= {
    title: string;
    category_id: string;
    price: number;
    currency_id: string;
    available_quantity: number;
    buying_mode: string;
    condition: string;
    listing_type_id: string;
    sale_terms: SaleTerm[];
    pictures: Picture[];
    attributes: Attribute[];
  }
