---
title: Deploying a TypeScript Express Backend on AWS EC2
date: 2023-11-15
description: A comprehensive guide to deploying and managing a TypeScript Express.js application on AWS EC2, including setup, configuration, and best practices for production environments.
image: https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1472&auto=format&fit=crop
imageAlt: Server racks in a data center with blue lighting
imageCredit: Taylor Vick on Unsplash
---

# Deploying a TypeScript Express Backend on AWS EC2

In today's cloud-centric world, deploying applications to production environments is a critical skill for any full-stack developer. In this guide, I'll walk you through the entire process of deploying a TypeScript Express.js backend to an AWS EC2 instance, from initial setup to final production configurations.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Step 1: Preparing Your TypeScript Express Application](#step-1-preparing-your-typescript-express-application)
- [Step 2: Launching and Configuring an EC2 Instance](#step-2-launching-and-configuring-an-ec2-instance)
- [Step 3: Setting Up the EC2 Environment](#step-3-setting-up-the-ec2-environment)
- [Step 4: Deploying Your Application](#step-4-deploying-your-application)
- [Step 5: Setting Up a Domain and HTTPS](#step-5-setting-up-a-domain-and-https-optional)
- [Step 6: Assigning an Elastic IP](#step-6-assigning-an-elastic-ip-optional)
- [Step 7: Continuous Deployment](#step-7-continuous-deployment-optional)
- [Step 8: Monitoring and Logging](#step-8-monitoring-and-logging)
- [Common Issues and Troubleshooting](#common-issues-and-troubleshooting)
- [Issues I Faced During Deployment](#issues-i-faced-during-deployment)
- [Conclusion](#conclusion)
- [Additional Resources](#additional-resources)

## Prerequisites

Before we begin, make sure you have the following:

- A TypeScript Express.js application ready for deployment
- An AWS account
- Basic knowledge of Linux commands
- SSH client installed on your local machine
- Node.js and npm/yarn experience

## Step 1: Preparing Your TypeScript Express Application

Let's start by ensuring our TypeScript Express application is production-ready. The structure of a typical TypeScript Express app should look something like this:

```
project/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   └── index.ts
├── dist/
├── node_modules/
├── package.json
├── tsconfig.json
└── .env
```

### Key Configuration Files

Let's review two critical configuration files:

#### package.json

Make sure your `package.json` includes the necessary scripts:

```json
{
  "name": "typescript-express-api",
  "version": "1.0.0",
  "scripts": {
    "start": "node dist/index.js",
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "lint": "eslint . --ext .ts"
  },
  "dependencies": {
    "express": "^4.17.1",
    "dotenv": "^10.0.0",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "@types/express": "^4.17.13",
    "@types/node": "^16.7.1",
    "typescript": "^4.3.5",
    "ts-node": "^10.2.1",
    "nodemon": "^2.0.12"
  }
}
```

#### tsconfig.json

Ensure your TypeScript configuration is properly set up:

```json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}
```

### Test Your Build Locally

Before deploying, it's crucial to verify that your application builds and runs correctly:

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Start the built application
npm start
```

If your application runs without errors, you're ready to move on to the deployment stage.

## Step 2: Launching and Configuring an EC2 Instance

![AWS Console Dashboard](https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1470&auto=format&fit=crop)
*Photo by Richard Horvath on Unsplash*

### Launch a New EC2 Instance

1. Log in to your AWS Management Console
2. Navigate to EC2 service
3. Click "Launch Instance"

### Instance Configuration

For a basic Express.js application, choose the following settings:

- **Amazon Machine Image (AMI)**: Amazon Linux 2 or Ubuntu 20.04 LTS
- **Instance Type**: t2.micro (eligible for free tier)
- **Key Pair**: Create a new key pair and download the `.pem` file
- **Network Settings**: Allow SSH, HTTP, and HTTPS traffic
- **Configure Storage**: Default 8GB SSD should be sufficient for a small app

### Security Group Configuration

Configure a security group with the following rules:

- Allow SSH (port 22) from your IP address
- Allow HTTP (port 80) from anywhere
- Allow HTTPS (port 443) from anywhere
- Allow custom TCP on the port your application runs (e.g., 3000) from anywhere

![Server security concept](https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1470&auto=format&fit=crop)
*Photo by FLY:D on Unsplash*

### Connect to Your Instance

Once the instance is running, connect to it via SSH:

```bash
# Change permissions for your key file
chmod 400 your-key-pair.pem

# Connect to your instance
ssh -i "your-key-pair.pem" ec2-user@your-ec2-public-dns.amazonaws.com
```

## Step 3: Setting Up the EC2 Environment

After connecting to your instance, set up the environment with the necessary dependencies:

### Installing Node.js and npm

For Amazon Linux 2:

```bash
# Update system packages
sudo yum update -y

# Install Node.js and npm
curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
sudo yum install -y nodejs

# Verify installation
node -v
npm -v
```

For Ubuntu:

```bash
# Update system packages
sudo apt update

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node -v
npm -v
```

### Installing Git

```bash
# For Amazon Linux
sudo yum install git -y

# For Ubuntu
sudo apt install git -y

# Verify installation
git --version
```

### Installing PM2 for Process Management

PM2 is a process manager that will keep your application running and restart it if it crashes:

```bash
# Install PM2 globally
sudo npm install -g pm2
```

## Step 4: Deploying Your Application

### Cloning Your Repository

If your repository is public:

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

If your repository is private, you'll need to set up deploy keys:

1. On your EC2 instance, generate an SSH key:
   ```bash
   ssh-keygen -t rsa -b 4096 -C "your-email@example.com"
   cat ~/.ssh/id_rsa.pub
   ```

2. Copy the printed key and add it to your GitHub repository's deploy keys in Settings > Deploy keys.

3. Clone your repository using SSH:
   ```bash
   git clone git@github.com:yourusername/your-repo.git
   cd your-repo
   ```

### Installing Dependencies and Building

```bash
# Install dependencies
npm install

# Build the TypeScript application
npm run build
```

### Environment Variables

Create a production `.env` file:

```bash
# Create .env file
touch .env

# Edit the file
nano .env
```

Add your environment variables:

```
PORT=3000
NODE_ENV=production
DATABASE_URL=your-database-url
# Other environment variables...
```

### Running with PM2

Start your application with PM2:

```bash
# Start the application
pm2 start npm --name "typescript-express-app" -- start

# Other useful PM2 commands
pm2 status
pm2 logs
pm2 restart typescript-express-app
pm2 stop typescript-express-app
```

Set up PM2 to start on boot:

```bash
# Generate startup script
pm2 startup

# Save the current process list
pm2 save
```

![Server monitoring concept](https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1470&auto=format&fit=crop)
*Photo by Luke Chesser on Unsplash*

## Step 5: Setting Up a Domain and HTTPS (Optional)

For a production environment, you'll likely want a domain name and HTTPS configuration:

### Configuring Nginx as a Reverse Proxy

```bash
# Install Nginx
sudo yum install nginx -y  # Amazon Linux
# or
sudo apt install nginx -y  # Ubuntu

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

Create a new Nginx configuration:

```bash
sudo nano /etc/nginx/conf.d/your-app.conf
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Restart Nginx:

```bash
sudo systemctl restart nginx
```

### Setting Up HTTPS with Let's Encrypt

Install Certbot:

```bash
# For Amazon Linux
sudo amazon-linux-extras install epel -y
sudo yum install certbot python-certbot-nginx -y

# For Ubuntu
sudo apt install certbot python3-certbot-nginx -y
```

Obtain a certificate:

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Step 6: Assigning an Elastic IP (Optional)

If you want your EC2 instance to have a static IP address:

1. In the AWS console, go to EC2 > Elastic IPs
2. Click "Allocate Elastic IP address"
3. Select the newly allocated Elastic IP
4. Click "Actions" > "Associate Elastic IP address"
5. Select your instance and click "Associate"

**Note:** Elastic IPs are free only when associated with a running instance. You'll be charged for allocated EIPs that aren't associated with a running instance.

![Cloud computing concept](https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1470&auto=format&fit=crop)
*Photo by Christina Morillo on Unsplash*

## Step 7: Continuous Deployment (Optional)

For automated deployments, you can set up a simple deployment script:

Create a `deploy.sh` file in your home directory:

```bash
#!/bin/bash

cd ~/your-repo
git pull
npm install
npm run build
pm2 restart typescript-express-app
```

Make it executable:

```bash
chmod +x ~/deploy.sh
```

You can now run `~/deploy.sh` whenever you want to deploy updates.

For more sophisticated CI/CD, consider using GitHub Actions, Jenkins, or AWS CodeDeploy.

## Step 8: Monitoring and Logging

### Basic Monitoring with PM2

PM2 provides basic monitoring:

```bash
pm2 monit
```

### Setting Up CloudWatch (Optional)

For more comprehensive monitoring, set up AWS CloudWatch:

```bash
# Install CloudWatch agent
sudo yum install amazon-cloudwatch-agent -y  # Amazon Linux
# or
sudo apt install amazon-cloudwatch-agent -y  # Ubuntu

# Configure CloudWatch agent
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard
```

## Common Issues and Troubleshooting

### Application Won't Start

Check the logs:

```bash
pm2 logs
```

Verify that:
- All dependencies are installed
- The build was successful
- Environment variables are correctly set
- Port isn't already in use

### Can't Connect to Application

Verify:
- Security group allows traffic on your application port
- Your application is listening on the correct interface (0.0.0.0, not localhost)
- Firewall settings allow traffic

### High CPU/Memory Usage

Monitor resource usage:

```bash
top
free -m
```

Consider:
- Optimizing your application
- Using a larger instance type
- Implementing caching

## Issues I Faced During Deployment

During my journey deploying TypeScript Express applications to EC2, I encountered several challenges that weren't covered in most tutorials. Here's what I learned the hard way:

### 1. TypeScript Build Errors on Low-Memory Instances

When trying to build a moderately complex TypeScript application on a t2.micro instance (1GB RAM), the build process would fail with memory errors:

```
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
```

**Solution**: Increase the Node.js memory limit temporarily for the build process:

```bash
NODE_OPTIONS="--max-old-space-size=512" npm run build
```

### 2. API Routes Returning 404 Despite Working Locally

After deployment, many API routes that worked locally were returning 404 errors.

**Root cause**: The application was using case-sensitive file paths that worked on my macOS development machine but failed on the Linux EC2 instance.

**Solution**: Ensure consistent file naming conventions and update import paths to match exactly:

```typescript
// Wrong (might work on macOS but fail on Linux)
import UserController from './controllers/User.controller';

// Correct (works consistently across platforms)
import UserController from './controllers/user.controller';
```

### 3. Security Group Configuration Issues

Despite setting up the security group correctly in the AWS console, I couldn't connect to my application from outside.

**Root cause**: I had configured the application to listen on `localhost` (127.0.0.1) instead of all interfaces.

**Solution**: Update the Express application to listen on all interfaces:

```typescript
// Wrong
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

// Correct
app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
```

### 4. Unexpected Costs with Elastic IP

I was shocked to see unexpected charges on my AWS bill related to Elastic IP.

**Root cause**: I had allocated several Elastic IPs for testing but wasn't using all of them with running instances.

**Solution**: Always release unused Elastic IPs and be aware that they're only free when associated with a running EC2 instance.

### 5. Application Not Restarting After Server Reboot

After an AWS maintenance reboot, my application didn't automatically restart.

**Root cause**: PM2 startup script wasn't properly configured.

**Solution**: Make sure to run both commands after setting up PM2:

```bash
# Generate and run the startup script
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ec2-user --hp /home/ec2-user
pm2 save
```

### 6. Environment Variables Not Loading in Production

My application couldn't access environment variables despite having a proper `.env` file.

**Root cause**: The `dotenv` package wasn't being called in the production build.

**Solution**: Ensure `dotenv` is configured correctly in your application:

```typescript
// Near the top of your entry file (e.g., index.ts)
import * as dotenv from 'dotenv';
dotenv.config();
```

### 7. Database Connection Timeouts

After deploying, the application would frequently lose database connections.

**Root cause**: Default connection pool settings weren't optimized for production.

**Solution**: Configure connection pooling appropriately:

```typescript
const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

### 8. SSL Certificate Renewal Failures

After a few months, HTTPS stopped working because the Let's Encrypt certificate wasn't renewed.

**Solution**: Set up automatic certificate renewal with a cron job:

```bash
echo "0 12 * * * root /usr/bin/certbot renew --quiet" | sudo tee -a /etc/crontab > /dev/null
```

![Debugging issues concept](https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1470&auto=format&fit=crop)
*Photo by Markus Spiske on Unsplash*

## Conclusion

Deploying a TypeScript Express application to AWS EC2 is a multi-step process, but it gives you complete control over your environment and infrastructure. This approach is ideal for small to medium-sized applications where cost-efficiency and control are important factors.

Remember that this is just the beginning of your cloud journey. As your application grows, you might want to explore more advanced options like Docker containers, AWS ECS/EKS, or serverless architectures like AWS Lambda.

The skills you've learned in this tutorial form a solid foundation for deploying and managing web applications in a cloud environment, regardless of which specific technologies you choose to use in the future.

![Successful deployment concept](https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop)
*Photo by Austin Distel on Unsplash*

Happy coding and deploying!

## Additional Resources

- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/)
- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nginx Documentation](https://nginx.org/en/docs/)
