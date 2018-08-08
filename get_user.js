import * as dynamoDbLib from './libs/dynamodb-lib'
import {
  success,
  failure
} from './libs/response-lib'

export async function main(event, context, callback) {
  /* HTTP request parameters */
  const params = {
    TableName: "banditusers",
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId
    }
  }

  try {
    const result = await dynamoDbLib.call("get", params)
    if (result.Item) {
      callback(null, success(result.Item))
    } else {
      callback(null, failure({ status: false, error: "User not found." }))
    }
  } catch (e) {
    callback(null, failure({ status: false }))
  }
}