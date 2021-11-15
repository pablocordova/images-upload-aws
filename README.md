# Images upload Dashboard

Upload of images with ReactJS and AWS serverless

## Design Explanation

- To speed up development I decided to use Cognito signin/signup instead of my own UI signin/signup.

- Each time a user confirm his email code when signing up, the `setup-user` lambda function is executed to create a dynamoDB table for this specific user,  where image information will be storaged.

- When the dashboard is shown the `ImagesList` component requests all the images of the user and `get-user-images` lambda function is used to get all the images of this specific user.

- When the user uploads an image, `get-signed-s3-url` lambda function is used to get a signed s3 url to upload the image in S3 and after `save-user-image` lambda function is used to storage the metadata in dynamoDB

## Build

### Requirements

- [node](https://nodejs.org/en/download/)
- Your port 3000 needs to be free

### Develop

1) Clone the repository
2) Use the file `/api/cloudFormationTemplate.yml` to deploy the resources in AWS, you need to fill only 2 fields:
    - **Stack Name**: <any name>
    - **AllowedCallbacks**: http://localhost:3000
3) Once the resources are deployed in AWS, replace the respective variables in `/client/src/env.tsx`
    - CLIENT_ID -> (Cognito -> users-pool -> App clients -> App client id)
    - API_ADDRESS -> (API Gateway -> APIs -> api-prod -> Stages -> prod -> Invoke URL)
4) Run in `/client` the command `npm install` and after `npm start`
5) Finally go to Cognito -> users-pool -> App integration -> App client settings -> Hosted UI -> Click on Launch Hosted UI