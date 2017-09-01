# Senior Enrichment Project - by Jung Park

Title: Campus Manager

## Initialize project

1. run `npm install`
2. run `npm run seed`
    * NOTE: If you get an error, you might have to run this command couple times. This seems to be a problem with older version of PG.
3. run `npm start`

## Testing

### DB
Inside of db 'campusmanager', I defined following 2 models:

  1. campuses
    * id
    * name
    * image
    * descriptions

  2. students
    * id
    * name
    * email
    * image
    * phone
    * birthday

### Navigate

1. Go to `http://localhost:1337/` from Chrome
    * expected: list of campuses
2. Using links on the navbar, try navigate to students page
    * expected: list of students
3. Try toggling between 2 different views with links in the navbar
    * expected: list of campuses/students
4. Click detail from campus item
    * expected: detail of campus with students
5. Click detail from student item
    * expected: detail of student with one's campus
6. Try clicking detail button for campus from student detail form
    * expected: detail of campus
7. Try clicking detail button for student from campus detail form
    * expected: detail of student

### Actions
1. Using 'New Campus' button located below navbar, add new campus. You can specify name, image url (e.x https://i.ytimg.com/vi/v9oxyswY8fs/maxresdefault.jpg), and description.
    * expected: new campus is added without any student
2. Use update button in detail page to update detail of campus
    * expected: page is not refreshed, and new campus detail is updated immediately
3. Using 'New Student' button located below navbar, add new student. You can specify name, campus, Birthday, email, and phone number.
    * expected: new student is added with his/her campus picked
4. Use update button in detail page to update detail of student
    * expected: page is not refreshed, and new student detail is updated immediately
5. Try assigning student to different campus from student detail page
    * expected: new campus is assigned to student, and page detail updates immediately without full refresh
6. Try clicking remove button from campus item
    * expected: campus is removed without full refresh
7. Try clicking remove button from student item
    * expected: student is removed without full refresh
8. Try clicking remove button from campus item in student detail form
    * expected: campus is removed without full refresh
9. Try clicking remove button from student item in campus detail form
    * expected: student is removed without full refresh


`---------------------------------------------------------------`
  # Original Instruction
`---------------------------------------------------------------`

## Getting started

1. Fork and clone this repo
2. *Set the name of your project in `package.json`*. The skeleton intentionally ships with an invalid name.
3. `npm install`
4. Check out the mock-view in the `wireframes` folder
5. Start the build process with: `npm run build-watch`
6. In another terminal, start your app with `npm start`
7. If you navigate to the URL you should see some UI already :) [We already have some connection code to get you started]

## Requirements

### The Premise

You are the CTO of the Margaret Hamilton Interplanetary Academy of JavaScript. Create a RESTful web platform that allows you to manage your students and campuses.

### The tools

Use at least sequelize, express, react, and redux when creating this app. You can incorporate any additional libraries or tools you wish.

### DB Design

- Students
  * have profile info (e.g. name and email)
  * must be assigned to a campus

- Campuses
  * have info such as a name and image
  * can have many students assigned (may have none)

### Views and Functionality
#### See Wireframes folder for visual

- Navigation: as a user I...
  * will land on **Home** by default
  * can navigate to **Campuses** from **Home**
  * can navigate to **Students** from **Home**
  * can navigate to view a **Single Campus** from **Campuses**
  * can navigate to view a **Single Student** from **Students**
  * can navigate to view a **Single Student** from **Single Campus** (for any student at that campus)
  * can navigate to view that student's **Single Campus** from **Single Student**

- Views: as a user I...
  * see a list of all campuses on the **Campuses** view
  * see a list of all students on the **Students** view
  * see details about a campus on the **Single Campus** view, including that campus's students
  * see details about a student on the **Single Student** view, including that student's campus

- Actions: as a user I...
  * can create a campus
  * can edit a campus's info, including adding/removing a student to/from that campus
  * can delete a campus
  * can create a student
  * can edit a student's info, including the campus that student is assigned to
  * can delete a student

### Routes

```
GET
- all campuses
- a campus by id
- all students
- a student by id
```

```
POST
- new campus
- new student
```

```
PUT
- updated student info for one student
- updated campus info for one campus
```

```
DELETE
- a campus
- a student
```

### How to test functionality without a frontend
- GET: use your browser
- POST / PUT / DELETE :
 - CLI (command line interface) with `curl`
   - e.g. `curl -H "Content-Type: application/json" -X POST -d '{"username":"kate","password":"1234"}' http://localhost:3000/api/login`
   - `-H`: headers. `-X`: verb. `-d`: data (must be of the type specified in headers). http://[address]:[port]/[route_path]
 - [Postman](https://www.getpostman.com/)
   ![](https://www.dropbox.com/s/4fk3b90cd0i1a5y/postman_post.png?raw=true)
- Databases: use Sequelize in your routes and see if you are receiving what you expect

### Video Walkthrough
Please submit a 3-minute screencast of a walk-through of the functionality *and code* for each user story in your app. E.g. for "As a user, I can create a campus", please show us that you can successfully create a campus in your app, and also the actual code that is involved in doing that (from the front-end components to the backend routes and models). We recommend using Quicktime to record the screencast (instructions on how to do that [here](https://support.apple.com/kb/PH5882?locale=en_US&viewlocale=en_US)).

Once you've recorded your screencast, please *upload it to YouTube as an unlisted video*, and send us the link. This will aid us in evaluating your submission.

## Evaluation

- Code modularity/readability (25%)
- Models (25%)
- Routes (25%)
- Frontend logic and functionality (25%)
- Design + Bonus features (up to 10 Extra Credit points)

