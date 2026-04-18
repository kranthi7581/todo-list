# DoDoApp Deployment

This project is configured to deploy on Render as a single full-stack Node service.

## Local development

Backend:

```bash
cd doDoApp
npm install
npm run dev
```

Frontend:

```bash
cd doDoApp/client
npm install
npm start
```

Create a `.env` file in `doDoApp/` based on `.env.example`.

## Render deployment

1. Push this repository to GitHub.
2. In Render, create a new Blueprint deployment and select this repository.
3. Render will read `render.yaml` from the repo root.
4. Add the secret environment variables:
   - `MONGODB_URL`
   - `JWT_SECRET`
   - `FRONTEND_URL` (optional, useful if you want to lock CORS to your Render domain)

## Notes

- In production, Express serves the React build from `client/build`.
- The React app uses `REACT_APP_API_URL` if you set it, otherwise it calls the same-origin `/api`.
- For Render single-service deployment, you usually do not need `REACT_APP_API_URL`.
