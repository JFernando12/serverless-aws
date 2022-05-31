const AWS = require("aws-sdk");

const deleteTask = async(event) => {
    const { id } = event.pathParameters;

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    

    await dynamodb.delete({
        TableName: "TaskTable",
        Key: {
            id
        }
    }).promise();

    return({
        statusCode: 200,
        body: JSON.stringify({
            message: "Eliminado correctamente"
        })
    })

}

module.exports = { deleteTask }