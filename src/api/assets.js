import { getCurrentUser } from './auth'
import AWS from 'aws-sdk'

import { AWS_CONFIG_REGION, AWS_IDENTITY_POOL_ID, AWS_COGNITO_POOL, AWS_S3_BUCKET_NAME } from '../config'

import uuidv1 from 'uuid/v1'

export function deleteFile(folder, file) {
  var cognitoUser = getCurrentUser()

  return new Promise((resolve, reject) =>
    cognitoUser.getSession((err, session) => {
      if (err) return reject(err)

      AWS.config.region = AWS_CONFIG_REGION

      if (AWS.config.credentials) AWS.config.credentials.clearCachedId()
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId : AWS_IDENTITY_POOL_ID, // your identity pool id here
          Logins : {
              // Change the key below according to the specific region your user pool is in.
              [`cognito-idp.${ AWS_CONFIG_REGION }.amazonaws.com/${ AWS_COGNITO_POOL.UserPoolId }`] : session.getIdToken().getJwtToken()
          }
      })

      AWS.config.credentials.refresh((error) => {
        if (error) {
          console.error(error);
        } else {
          var s3 = new AWS.S3({
            apiVersion: cognitoUser.pool.client.config.apiVersion,
            params: { Bucket: AWS_S3_BUCKET_NAME }
          })

          const key = encodeURIComponent(folder) + '/' + file

          s3.deleteObject({ Key: key }, (err, data) => {
            if (err) reject(err)
            else resolve(data)
          })
        }
      })

    })
  ).then(response => {
      return response
    }, err => {
      throw err
    }
  )

}

export function uploadFile(folder, file) {
  var cognitoUser = getCurrentUser()

  return new Promise((resolve, reject) =>
    cognitoUser.getSession((err, session) => {
      if (err) return reject(err)

      AWS.config.region = AWS_CONFIG_REGION


      if (AWS.config.credentials) AWS.config.credentials.clearCachedId()
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId : AWS_IDENTITY_POOL_ID, // your identity pool id here
          Logins : {
              // Change the key below according to the specific region your user pool is in.
              [`cognito-idp.${ AWS_CONFIG_REGION }.amazonaws.com/${ AWS_COGNITO_POOL.UserPoolId }`] : session.getIdToken().getJwtToken()
          }
      })

      AWS.config.credentials.refresh((error) => {
        if (error) {
            console.error(error);
        } else {
          var s3 = new AWS.S3({
            apiVersion: cognitoUser.pool.client.config.apiVersion,
            params: { Bucket: AWS_S3_BUCKET_NAME }
          })

          const ext = file.name.split('.')
          const key = encodeURIComponent(folder) + '/' + uuidv1() + '.' + ext[ext.length - 1]

          s3.upload({
            Key: key,
            Body: file,
            ACL: 'public-read'
          }, function(err, data) {
            if (err) reject(err)
            else resolve(data)
          })
        }
      });

    })
  ).then(response => {
      return response
    }, err => {
      throw err
    }
  )
}
