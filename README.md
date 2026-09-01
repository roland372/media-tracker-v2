# [Media-Tracker](https://media-tracker.netlify.app/)

Media-Tracker is a web app where you can keep track of your favourite media like anime, games, manga, books, etc.

You can browse a limited demo without signing in. To use your own library and edit entries you need to log in with Google, since the full data is stored in Google Sheets.

After signing in you can start updating your media straight away, just open an entry and fill out the form (only title is required, you can fill the rest later).

And after that you can easily access your media, change the status, keep track of progress, sort, filter or even view various statistics and charts.

## Usage

1. Go to the frontend folder and install dependencies

```
cd frontend
npm install
```

2. Create a Google Sheet with tabs for Anime, Books, Characters, Games, Manga, Movies and Users.

3. Set up a [Supabase](https://supabase.com/) project with Google as an auth provider. Add the Sheets scope so the app can update your spreadsheet after login.

4. Create a `.env` file in the `frontend` directory with the following variables and replace the empty values with your own:

```
VUE_APP_SUPABASE_URL=
VUE_APP_SUPABASE_ANON_KEY=
VUE_APP_GOOGLE_CLIENT_ID=
VUE_APP_SHEET_ID=
VUE_APP_TinyMCEAPIKey=
VUE_APP_YOUTUBE_API_KEY=
```

5. Run the app

```
npm run dev
```

or for a production build:

```
npm run serve
```
