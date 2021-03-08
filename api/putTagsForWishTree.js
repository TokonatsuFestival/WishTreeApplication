const AWS = require('aws-sdk');
AWS.config.update({region: process.env.AWS_REGION});
const docClient = new AWS.DynamoDB.DocumentClient();

async function dbWrite(params) {
    let promise = docClient.put(params).promise();
    let result = await promise;
    console.log(result);
}

exports.handler = async (event, context, callback) => {
    console.log(event);
    console.log(event.body);
    let bodyJson = JSON.parse(event.body);
    
    console.log("Getting the Event");
    console.log(event);
    var setTagsParams = { 
        TableName:  process.env.WISH_TREE_TAGS_TABLE,
        Item: {
            'Description': bodyJson.TagDescription
        }
    };

    console.log(setTagsParams);
    
    let tagInsert = await dbWrite(setTagsParams);
    
    const response = {
        statusCode: 200,
        body: '{"Message": "We did it!"}',
        headers:{ 
            'Access-Control-Allow-Origin' : '*',
            "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        }
    };
    return response;

};
