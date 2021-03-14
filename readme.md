
# Online Wishtree Application
This wishtree application currently runs within the AWS Platform currently and is in Beta version where improvements and suggestions are welcome. 

In order to get the application up and running you will need the following things already setup or available to you:
1. An active AWS Account
2. The [Serverless Framework](https://serverless.com) installed on your machine (This will provide the quickest installation of the application)

If you haven't got the serverless framework installed or configured visit https://serverless.com for instructions for your operating system on how to install and setup for working with AWS.

## Installation Steps
1. Download and Unzip the Wishtree Application found within the GitHub project.
2. Copy the [api/config.sample.json](api/config.sample.json) to `api/config.<stagename>.json`
3. Update the `config.\<stagename>.json` file updating config as required
   - `WISH_TREE_TAGS_TABLE` - Name of the DynamoDB table to store the wishtree tags
   - `WISH_TREE_S3_BUCKET` - (Optional) If you require an S3 bucket to store the website on, set the name of the bucket here.
4. (Optional) If an S3 Bucket needs to be created to store the website, please open the `api/serverless.yml` file and uncomment the S3 Bucket resource creation section.
5. Using SLS deploy the application using the command
> `sls deploy --stage <stagename>` 
6. Once the command finishes you will need to grab the API Endpoint URLs for GET and POST and update the following files:
	* [website/js/sketch.js](website/js/sketch.js)
	* [website/js/submission.js](website/js/submission.js)

## Optional S3 Bucket Upload
1. Navigate to the website folder in terminal / command line and use this command and this will upload the website files into the s3 bucket.
> `aws s3 sync . s3://<S3BucketName> --acl public-read`  
2. You can then visit the Public URL for the bucket

## Support
If there are any improvements or support queries surrounding the use of this application, feel free to open an Issue and one of the team will look into it. We are also accepting Pull Requests, so if there are any improvements that you would like to make to the application we will be happy to review and put them in!
