# Personal Blog

This Blog website was created as part of the Odin project curriculum. It is primarily for practicing coding and there are a couple of things that have not been implemented yet due to time constraints. While parts of the design were inspired by AI generated designs, the vast majority of code was written by hand and with limited AI usage.

The Website filters the posts to only show public posts and private posts of the logged in user. Clicking on a post loads the post and shows it completely, along with its comments. Users can post new comments. As of now there is no convenient way to add new posts, which may be added in the future. Authentication is handled via JWTs.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Frontend**: Vite + React
- **Authentication**: JWTs

## Screenshots

**Different Posts seen by different users, due to one Post being private**

![Homepage User 1](./_images/Screenshot%20From%202026-10-12%2020-29-09.png)
![Homepage User 2](./_images/Screenshot%20From%202026-10-12%2020-28-27.png)

**Page to inspect individual Post with comments**

![Post Page 1](./_images/Screenshot%20From%202026-10-12%2020-28-45.png)
![Post Page 1](./_images/Screenshot%20From%202026-10-12%2020-28-54.png)
