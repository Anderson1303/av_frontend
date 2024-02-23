## Run Locally

1. Clone the repository:

```bash
git clone https://github.com/Anderson1303/av_frontend.git
cd app
docker build -f ./Dockerfile -t app:1.0 .
```

2. Install the dependencies:

```bash
npm install --legacy-peer-deps
```

3. Copy the `.env.example` file to `.env` and update the required environment variables:

```bash
cp .env.example .env
```

4. Run the application:

```bash
npm run start
```

5. Access the API at `http://localhost:3000`

## Testing

Run the test suite with the following command:

```bash
npm run test
```