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
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      given_name: data.given_name,
      photo: data.photo,
      createdAt: JSON.parse(JSON.stringify(new Date()))
    },
  }

  try {
    await dynamoDbLib.call("put", params)
    callback(null, success(params.Item))
  } catch (e) {
    callback(null, failure({ status: false }))
  }
}