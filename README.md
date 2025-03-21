# CS_WI_6905_Group_3

Tech Stack
Frontend (User Interface)

Since the UI needs to be interactive, responsive, and modern, the best approach is to use:

    React.js (for component-based UI)
    Next.js (for server-side rendering and better SEO, optional)
    Tailwind CSS (for easy styling)
    Axios (for API communication)

Backend

To handle API requests, authentication, and data processing:

    Node.js with Express.js (lightweight backend framework)
    MongoDB Atlas (NoSQL Database) for on-premise training storage
    Amazon DynamoDB (NoSQL) for medical history and inference results
    Amazon S3 (for storing X-ray images)
    Amazon API Gateway (to manage API requests)
    AWS Lambda (for serverless execution, optional)
    AWS EC2 (for hosting the backend and web app)

Machine Learning

    Python (FastAPI/Flask) for Model Inference API
    Federated Learning with Flower framework
    PyTorch or TensorFlow (for CNN model training)
    Amazon ECS (Elastic Container Service) for running the federated learning aggregator

Security & Authentication

    AWS Cognito (for user authentication)
    JWT (JSON Web Tokens) for session management
    AWS IAM (Identity and Access Management) for role-based access control
    SSL/TLS Encryption (for secure data transfer)


