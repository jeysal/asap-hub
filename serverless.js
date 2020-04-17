const { paramCase } = require('param-case');
const pkg = require('./package.json');

const { NODE_ENV = 'production', SLS_STAGE = 'development' } = process.env;

const production = (_) => NODE_ENV === 'production';
const service = paramCase(pkg.name);

const plugins = [
  'serverless-pseudo-parameters',
  ...['serverless-scriptable-plugin'].filter(production),
];

module.exports = {
  service,
  plugins,
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    timeout: 128,
    memorySize: 512,
    region: '${env:AWS_REGION, "us-east-1"}',
    stage: '${env:SLS_STAGE, "development"}',
  },
  custom: {
    scriptHooks: {
      'aws:deploy:finalize:cleanup': `aws s3 sync apps/frontend/public s3://\${self:service}-\${self:provider.stage}-static`,
    },
  },
  resources: {
    Resources: {
      Bucket: {
        Type: 'AWS::S3::Bucket',
        DeletionPolicy: 'Delete',
        Properties: {
          BucketName: `\${self:service}-\${self:provider.stage}-static`,
          AccessControl: 'PublicRead',
          CorsConfiguration: {
            CorsRules: [
              {
                AllowedMethods: ['GET', 'HEAD'],
                AllowedHeaders: ['*'],
                AllowedOrigins: ['*'],
                MaxAge: 3000,
              },
            ],
          },
        },
      },
      BucketPolicy: {
        Type: 'AWS::S3::BucketPolicy',
        Properties: {
          Bucket: '#{Bucket}',
          PolicyDocument: {
            Statement: [
              {
                Action: ['s3:GetObject'],
                Effect: 'Allow',
                Principal: '*',
                Resource: 'arn:aws:s3:::#{Bucket}/*',
              },
            ],
          },
        },
      },
      CloudFrontOriginAccessIdentity: {
        Type: 'AWS::CloudFront::CloudFrontOriginAccessIdentity',
        Properties: {
          CloudFrontOriginAccessIdentityConfig: {
            Comment: 'CloudFront OAI for #{Bucket}',
          },
        },
      },
      CloudFrontDistribution: {
        Type: 'AWS::CloudFront::Distribution',
        DependsOn: ['Bucket'],
        Properties: {
          DistributionConfig: {
            CustomErrorResponses: [
              {
                ErrorCode: 404,
                ResponseCode: 200,
                ResponsePagePath: '/index.html',
              },
            ],
            Origins: [
              {
                DomainName: '#{Bucket.RegionalDomainName}',
                Id: 's3origin',
                S3OriginConfig: {
                  OriginAccessIdentity:
                    'origin-access-identity/cloudfront/#{CloudFrontOriginAccessIdentity}',
                },
              },
            ],
            Enabled: true,
            DefaultRootObject: 'index.html',
            DefaultCacheBehavior: {
              AllowedMethods: ['GET', 'HEAD', 'OPTIONS'],
              CachedMethods: ['GET', 'HEAD', 'OPTIONS'],
              Compress: true,
              DefaultTTL: 3600,
              ForwardedValues: {
                Cookies: {
                  Forward: 'none',
                },
                QueryString: false,
              },
              TargetOriginId: 's3origin',
              ViewerProtocolPolicy: 'redirect-to-https',
            },
            PriceClass: 'PriceClass_100',
            ViewerCertificate: {
              CloudFrontDefaultCertificate: true,
            },
          },
        },
      },
    },
    Outputs: {
      CloudFrontDistributionDomain: {
        Value: {
          "Fn::GetAtt": ["CloudFrontDistribution", "DomainName"]
        }
      }
    },
  },
};
