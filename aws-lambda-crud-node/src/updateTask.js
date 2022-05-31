const AWS = require("aws-sdk");

const updateTask = async(event) => {
    const { id } = event.pathParameters;
    const { done, title, description } = JSON.parse(event.body); //Los datos de event viene en json

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    await dynamodb.update({
        TableName: "TaskTable",
        Key: { id },
        UpdateExpression: "set done = :done, title = :title, description = :description",
        ExpressionAttributeValues: {
            ":done": done,
            ":title": title,
            ":description": description
        },
        ReturnValues: "ALL_NEW"
    }).promise();

    return ({
        statusCode: 200,
        body: JSON.stringify({
            message: "Actualizado correctamente"
        })
    })

}

module.exports = { updateTask }