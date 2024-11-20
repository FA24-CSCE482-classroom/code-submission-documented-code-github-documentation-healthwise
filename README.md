# README

## Introduction

<img src="https://github.com/oliviahealth/ichild/assets/48499839/793bf4eb-18ee-4028-8d57-422aff598fd3" width="300" />

**IntelligentCHILD** is a RAG application that provides pregnant women and families with personalized, dynamic search results by leveraging advanced natural language querying and the OliviaHealth knowledge base for accurate, health-related insights.

Access the iCHILD application here: [http://18.190.26.46](http://18.190.26.46)

Key features of the iCHILD application:
- **Natural Language Querying**: Effortlessly search through a curated database of resources/content using natural language prompts.
- **Langchain Integration**: Leverage Retrieval Augmented Generation (RAG) for enhanced information retrieval and response generation.
- **OliviaHealth Knowledge Base**: Seamlessly integrated with the OliviaHealth knowledge base for accurate, health-related insights.
- **Follow-Up Questions**: Enable dynamic, context-aware follow-up questions for deeper, ongoing conversations.
- **Conversational History**: Users can easily revisit previous interactions to track progress and refine queries.
- **Streaming (Under Development)**: A new feature in progress that will enable continuous, real-time data streaming for improved user interaction (currently under scope creep).

## Demo Video

<video width="600" controls>
  <source src="iCHILD_Demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>


## Requirements

This code has been run and tested using the following internal and external components:

### Environment
- Ubuntu v22.04
- Node.js v18.x
- Python 3.9+
- PostgreSQL v13+
- Flask v2.2.0+

### Program
- **Frontend:** TypeScript, React, React Query, Zod, Zustand, TailwindCSS  
- **Backend:** Python, Flask, Flask-JWT, PostgreSQL, SQLAlchemy, PyTorch, Sentence-Transformers  
- Retrieval-Augmented Generation (RAG) Pipeline
  - LangChain library
  - Vector database integration
  - Custom embedding model and LLM

### Tools
- GitHub for version control
- VS Code as the IDE
- Yarn for frontend dependency management
- pip for backend dependency management
- pytest for testing.
- GitHub Projects Kanban Board for task management.

## External Dependencies

- Node.js: [Download latest version](https://nodejs.org/)
- Yarn: [Download Yarn](https://classic.yarnpkg.com/lang/en/docs/install)
- Git: [Download latest version](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Python: [Download Python](https://www.python.org/downloads/)
- AWS: 

## Documentation

Documentation includes the following:
- Final Report v3.0
- UX Design: v2.0  
- User's Manual: v1.0  

## Environment Variables

Environment variables need to be set up for both the frontend and backend. Contact the team for details.

### Frontend Variables
- `VITE_API_URL`  
- `VITE_GOOGLE_API_KEY`

### Backend Variables
- `POSTGRESQL_CONNECTION_STRING`  
- `ADMIN_POSTGRESQL_CONNECTION_STRING`  
- `GOOGLE_API_KEY`  
- `MODEL_PATH`  
- `SECRET_KEY`

## Run Locally

### Clone the Project

Clone the repositories needed for the project:  

```bash  
git clone https://github.com/oliviahealth/ichild.git
git clone https://github.com/FA24-CSCE482-classroom/code-submission-documented-code-github-documentation-healthwise.git
```
#### Go to the Project Directory
```bash 
cd ichild
```

### 1. Install Frontend Dependencies
```bash
npm install
```

#### Add Frontend Environment Variables
```bash
touch .env
```

#### Add the following variables in the .env file:
```bash
VITE_API_URL=<your_api_url
VITE_GOOGLE_API_KEY=<your_google_api_key>
```

#### Start the Frontend
```bash
npm run dev
```

### 2. Install Backend Dependencies
```bash
cd backend/server
pip install -r requirements.txt
```

#### Add Backend Environment Variables
```bash
touch .env
```

#### Add the following variables in the .env file:
```bash
POSTGRESQL_CONNECTION_STRING=<your_connection_string>
ADMIN_POSTGRESQL_CONNECTION_STRING=<your_admin_connection_string>
GOOGLE_API_KEY=<your_google_api_key>
MODEL_PATH=<your_model_path>
SECRET_KEY=<your_secret_key>
```

#### Start the Frontend
```bash
cd search
flask run
```

or 

```bash
cd search
flask –-app db_search run 
```

```bash
cd search
python db_search.py
```


### Test(Optional)
    Testing can be implemented using pytest. Install pytest via pip:
```bash
pip install pytest
```

#### Run tests with:
```bash
pytest .
```


## Deployment  

- Deployment is done on AWS.  
- Use a different branch (not `main`) for testing and staging.  
- Push the `main` branch to trigger production deployment.  

## Support  

For any issues, reach out to the **HealthWise Team**:  
- **Uzma Hamid**: uzma_hamid@tamu.edu  
- **Gopal Othayoth**: cerebraldatabank@tamu.edu
- **Nick Jonacik**: nicknackj@tamu.edu
- **Ethan Chen** : chenners@tamu.edu
- **Logan Talton**: logan.talton@tamu.edu

## References  

- [OpenAI](https://openai.com/)  
- [LangChain Documentation](https://docs.langchain.com/)  
- [Flask Documentation](https://flask.palletsprojects.com/)  
- [Olivia Health](https://www.oliviahealth.org/)  


