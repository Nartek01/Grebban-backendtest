const express = require('express');
const api = express();
const port = 8888;

const products = [
    {
        "id": 6267654,
        "name": "Auto Omega",
        "attributes": {
            "cat": "cat_2",
            "color": "black,white"
        }
    },
    {
        "id": 8094994,
        "name": "Bike Alef",
        "attributes": {
            "color": "black,white",
            "cat": "cat_1"
        }
    },
    {
        "id": 2846132,
        "name": "Bike Bet",
        "attributes": {
            "color": "blue",
            "cat": "cat_1_1,cat_1_2"
        }
    },
    {
        "id": 2169396,
        "name": "Auto Alpha",
        "attributes": {
            "color": "green,blue",
            "cat": "cat_2_2"
        }
    },
    {
        "id": 2749899,
        "name": "Auto Delta",
        "attributes": {
            "color": "red",
            "cat": "cat_2_2"
        }
    },
    {
        "id": 3311138,
        "name": "Auto Gamma",
        "attributes": {
            "cat": "cat_2_3,cat_2_2",
            "color": "black,white"
        }
    },
    {
        "id": 4364807,
        "name": "Bike Gimel",
        "attributes": {
            "color": "red,white,green",
            "cat": "cat_1_1,cat_1_2"
        }
    },
    {
        "id": 5385176,
        "name": "Bike Dalet",
        "attributes": {
            "color": "black",
            "cat": "cat_1_2"
        }
    },
    {
        "id": 12345,
        "name": "Random product",
        "attributes": {}
    }
]

const attribute_meta = [
    {
        "name": "Color",
        "code": "color",
        "values": [
            {
                "name": "Brown",
                "code": "brown"
            },
            {
                "name": "Black",
                "code": "black"
            },
            {
                "name": "White",
                "code": "white"
            },
            {
                "name": "Blue",
                "code": "blue"
            },
            {
                "name": "Green",
                "code": "green"
            },
            {
                "name": "Red",
                "code": "red"
            }
        ]
    },
    {
        "name": "Category",
        "code": "cat",
        "values": [
            {
                "name": "Electric bikes",
                "code": "cat_1_1"
            },
            {
                "name": "Bikes",
                "code": "cat_1"
            },
            {
                "name": "BMX",
                "code": "cat_1_2"
            },
            {
                "name": "Cars",
                "code": "cat_2"
            },
            {
                "name": "Electric cars",
                "code": "cat_2_1"
            },
            {
                "name": "Hybrids",
                "code": "cat_2_2"
            },
            {
                "name": "Sportscars",
                "code": "cat_2_3"
            }
        ]
    }
]

api.listen(port, () => {
    console.log(`API app listening on port ${port}`);
})