
# Online Wishtree Application
This wishtree application currently runs within the AWS Platform currently and is in Beta version where improvements and suggestions are welcome. 

In order to get the application up and running you will need the following things already setup or available to you:
1. An Active AWS Account
2. The Serverless framework installed on your machine (This will provide the quickest installation of the application)

If you haven't got the serverless framework installed or configured visit https://serverless.com for instructions for your operating system on how to install and setup for working with AWS.

## Installation Steps
1. Download and Unzip the Wishtree Application found within the github project.
2. Copy the `api/config.sample.json` to `api/config.\<stagename>.json`
3. Update the `config.\<stagename>.json` file updating the names of both the `Wish_Tree_S3_Bucket` name and `Wish_Tree_Tags_Table` name within the file and save.
4. Using SLS deploy the application using 
> `sls deploy --stage <stagename>` 
5. Once the command finishes you will need to grab the API Endpoint Urls for Get and Post and update the following files:
	* `website/js/sketch.js`
	* `website/js/submission.js`
6. Navigate to the website folder in terminal / command line and use this command and this will upload the website files into the s3 bucket.
> `aws s3 sync . s3://<S3BucketName> --acl public-read`  
7. You can then visit the Public URL for the bucket.

## Support
If there are any improvements or support queries surrounding the use of this application, feel free to open an Issue and one of the team will look into it. We are also accepting Pull Requests, so if there are any improvements that you would like to make to the application we will be happy to review and put them in!
