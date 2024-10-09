import { groq } from "next-sanity";

export const PRODUCTS_QUERY = groq`
*[_type == 'product']{
    name,
    description,
    price {
        'value': value * 100,
        currency
    },
    'image': images[][0],
    'id': _id
}
`;
