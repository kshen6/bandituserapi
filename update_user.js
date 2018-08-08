import * as dynamoDbLib from './libs/dynamodb-lib'
import {
  success,
  failure
} from './libs/response-lib'

export async function main(event, context, callback) {
  /* HTTP request parameters */
  const data = JSON.parse(event.body)
  const params = {
    TableName: "banditusers",
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId
    },
    UpdateExpression: "SET given_name = :given_name, photo = :photo",
    ExpressionAttributeValues: {
      ":given_name": data.given_name ? data.given_name : null,
      ":photo": data.photo ? data.photo : null
    },
    ReturnValues: "ALL_NEW"
  }

  try {
    const result = await dynamoDbLib.call("update", params)
    callback(null, success({ status: true }))
  } catch (e) {
    console.log(e)
    callback(null, failure({ status: false }))
  }
}