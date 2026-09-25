# Image Fetcher for Reddit Achievements

A CORS proxy that can only go to one domain and one URL structure (`share.redd.it`), to prevent heavy abuse of resources. Used with [Image Downloader for Reddit Achievements](https://github.com/46009361/raid).

## Running locally

1. Open your terminal and run:
```sh
git clone https://github.com/46009361/raid-fetcher.git
cd raid-fetcher
cp -i .env.example .env
edit .env
```
2. Add your email address after the equals sign.
3. Save the file.
4. `edit server.js` and update the user agent to [something unique and descriptive](https://support.reddithelp.com/hc/en-us/articles/16160319875092-Reddit-Data-API-Wiki#h_01HHQTDCCK4WA84KQ9EKX8C11D).
