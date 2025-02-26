import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

import { getDomainNameFromUrl } from "../utils";

type Props = {
  assetsBucket: s3.Bucket;
  openNextImageOptimisationFunctionDir: string;
};

export class NextJsImageOptimisationFunction extends Construct {
  public domainName: string;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    const imageOptimisationFunction = new lambda.Function(
      this,
      "ImageOptimisationFunctionLambda",
      {
        runtime: lambda.Runtime.NODEJS_LATEST,
        architecture: lambda.Architecture.ARM_64,
        handler: "index.handler",
        code: lambda.Code.fromAsset(props.openNextImageOptimisationFunctionDir),
        timeout: cdk.Duration.seconds(10),
        tracing: cdk.aws_lambda.Tracing.ACTIVE,
      }
    );

    // Server function environment variables
    imageOptimisationFunction.addEnvironment(
      "BUCKET_NAME",
      props.assetsBucket.bucketName
    );
    imageOptimisationFunction.addEnvironment("NODE_ENV", "production");

    // Add function URL
    const imageOptimisationFunctionUrl =
      imageOptimisationFunction.addFunctionUrl({
        authType: lambda.FunctionUrlAuthType.NONE,
      });
    // Strip scheme (https://) from image optimisation function url to use for an HttpOrigin
    const domainName = getDomainNameFromUrl(imageOptimisationFunctionUrl.url);

    // Allow read/write to assets bucket
    props.assetsBucket.grantRead(imageOptimisationFunction);

    this.domainName = domainName;
  }
}
