import { Rule } from "sanity";

const product = {
	name: "product",
	title: "Product",
	type: "document",
	fields: [
		{
			name: "name",
			title: "Name",
			type: "string",
			validation: (rule: Rule) => rule.required().min(10).max(120),
		},
		{
			name: "description",
			title: "Description",
			type: "string",
			validation: (rule: Rule) => rule.max(120),
		},
		{
			name: "price",
			title: "Price",
			type: "object",
			fields: [
				{ name: "value", title: "Value", type: "number", validation: (rule: Rule) => rule.required() },
				{ name: "currency", title: "Currency", type: "string", validation: (rule: Rule) => rule.required().length(3).lowercase() },
			],
			validation: (rule: Rule) => rule.required(),
		},
		{
			name: "images",
			title: "Images",
			type: "array",
			of: [{ name: "image", title: "Image", type: "image" }],
			validation: (rule: Rule) => rule.max(8),
		},
	],
};

export default product;
