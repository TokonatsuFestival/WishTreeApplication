const AWS = require('aws-sdk');
AWS.config.update({region: process.env.AWS_REGION});
const docClient = new AWS.DynamoDB.DocumentClient();

async function dbRead(params) {
    let promise = docClient.scan(params).promise();
    let result = await promise;
    let data = result.Items;
    if (result.LastEvauluatedKey) {
        params.ExclusiveStartKey = result.LastEvauluatedKey;
        data = data.concat(await dbRead(params));
    }
    return data;
}

exports.handler = async (event, context, callback) => {
    
    console.log("Setting Params");
    var params = { 
        TableName: process.env.WISH_TREE_TAGS_TABLE
    };
    let data = await dbRead(params);
    console.log(data);
    const response = {
        statusCode: 200,
        headers: { 
            'Access-Control-Allow-Origin':  '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'accept, content-type'
        },
        body: JSON.stringify(data),
        "isBase64Encoded": false
    };
    console.log(response);
    callback(null, response);
};
