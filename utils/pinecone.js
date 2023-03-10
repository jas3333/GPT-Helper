import axios from 'axios';

const queryIndex = async (vectors) => {
    const options = {
        method: 'POST',
        url: process.env.QUERY_URL,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'Api-Key': process.env.PINECONE_API,
        },
        data: {
            topK: 3,
            vector: vectors,
            includeValues: 'false',
            includeMetadata: 'false',
        },
    };

    try {
        const response = await axios.request(options);

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const upsert = async (payload) => {
    console.log('Upserting vectors...');
    const options = {
        method: 'POST',
        url: process.env.UPSERT_URL,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'Api-Key': process.env.PINECONE_API,
        },
        data: {
            vectors: [
                { values: [payload[0].vector], id: payload[0].uniqueID },
                { values: [payload[1].vector], id: payload[1].uniqueID },
            ],
        },
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export { queryIndex, upsert };
