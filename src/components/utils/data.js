const duplicateData = [
    {
        "scores": {
            "mathematics": 17,
            "physics": 13,
            "chemistry": 10,
            "total": 40
        },
        "_id": {
            "$oid": "6630a09a4118e2fbb5b8fd46"
        },
        "hallTicketNo": "0000000001",
        "name": "Saran",
        "dateOfBirth": {
            "$date": "2024-04-10T00:00:00.000Z"
        },
        "gender": "male",
        "__v": 0
    },
    {
        "scores": {
            "mathematics": 24,
            "physics": 26,
            "chemistry": 12,
            "total": 62
        },
        "_id": {
            "$oid": "6630a09a4118e2fbb5b8fd46"
        },
        "hallTicketNo": "0000000002",
        "name": "Saran",
        "dateOfBirth": {
            "$date": "2024-04-10T00:00:00.000Z"
        },
        "gender": "female",
        "__v": 0
    },
    {
        "scores": {
            "mathematics": 19,
            "physics": 11,
            "chemistry": 21,
            "total": 51
        },
        "_id": {
            "$oid": "6630a09a4118e2fbb5b8fd46"
        },
        "hallTicketNo": "0000000003",
        "name": "edison",
        "dateOfBirth": {
            "$date": "2024-04-10T00:00:00.000Z"
        },
        "gender": "male",
        "__v": 0
    },
    {
        "scores": {
            "mathematics": 23,
            "physics": 27,
            "chemistry": 10,
            "total": 60
        },
        "_id": {
            "$oid": "6630a09a4118e2fbb5b8fd46"
        },
        "hallTicketNo": "0000000004",
        "name": "Saran",
        "dateOfBirth": {
            "$date": "2024-04-10T00:00:00.000Z"
        },
        "gender": "female",
        "__v": 0
    },
    {
        "scores": {
            "mathematics": 30,
            "physics": 11,
            "chemistry": 11,
            "total": 52
        },
        "_id": {
            "$oid": "6630a09a4118e2fbb5b8fd46"
        },
        "hallTicketNo": "0000000005",
        "name": "einstein",
        "dateOfBirth": {
            "$date": "2024-04-10T00:00:00.000Z"
        },
        "gender": "male",
        "__v": 0
    },
    {
        "scores": {
            "mathematics": 18,
            "physics": 22,
            "chemistry": 22,
            "total": 52
        },
        "_id": {
            "$oid": "6630a09a4118e2fbb5b8fd46"
        },
        "hallTicketNo": "0000000006",
        "name": "tesla",
        "dateOfBirth": {
            "$date": "2024-04-10T00:00:00.000Z"
        },
        "gender": "female",
        "__v": 0
    },
    {
        "scores": {
            "mathematics": 21,
            "physics": 21,
            "chemistry": 11,
            "total": 53
        },
        "_id": {
            "$oid": "6630a09a4118e2fbb5b8fd46"
        },
        "hallTicketNo": "0000000007",
        "name": "Saran",
        "dateOfBirth": {
            "$date": "2024-04-10T00:00:00.000Z"
        },
        "gender": "male",
        "__v": 0
    },
    {
        "scores": {
            "mathematics": 21,
            "physics": 13,
            "chemistry": 10,
            "total": 44
        },
        "_id": {
            "$oid": "6630a09a4118e2fbb5b8fd46"
        },
        "hallTicketNo": "0000000008",
        "name": "mariecurie",
        "dateOfBirth": {
            "$date": "2024-04-10T00:00:00.000Z"
        },
        "gender": "female",
        "__v": 0
    },
    {
        "scores": {
            "mathematics": 11,
            "physics": 11,
            "chemistry": 11,
            "total": 33
        },
        "_id": {
            "$oid": "6630a09a4118e2fbb5b8fd46"
        },
        "hallTicketNo": "0000000009",
        "name": "newton",
        "dateOfBirth": {
            "$date": "2024-04-10T00:00:00.000Z"
        },
        "gender": "female",
        "__v": 0
    }
];

const data = duplicateData.map((item, index) => {
    return {        
        hallticketNo: item.hallTicketNo,
        name: item.name,
        dateOfBirth: item.dateOfBirth.$date,
        gender: item.gender,
        Maths: item.scores.mathematics , 
        Physics: item.scores.physics ,
        Chemistry: item.scores.chemistry ,
        Total: item.scores.total ,
    };
});

data.sort((a, b) => b.Total - a.Total);

// Loop through the sorted data and update the rank
data.forEach((item, index) => {
    item.Rank = index + 1;
});



console.log(data);
export default data;

