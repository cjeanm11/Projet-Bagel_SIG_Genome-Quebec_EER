---
lang: en
---

### Mandate:

- Develop technical requirements
- Document requirements
- Develop a prototype
- User interface design
- Implementation
- Testing

### Report :

#### May 14 - 27, 2022:

Over the past few weeks there have been many discussions about the technical side of the app, what it needs to do and what needs to be implemented.
We had meetings with the EER and the organization Genome Quebec to discuss their needs.

Following the discussions, we developed user stories for the project.

Here are some examples:
- As an administrator, I want to see and modify all labels in order to correct errors in the label data.
- As a {student, teacher, administrator}, I want to see and compare all labels in order to explore the work of others.
- As {student, teacher, administrator}, I want to view statistics of all the labels in order to see an overall portrait of the labels and the project.

#### 30 may - 10 june 2022 :

During this period, I did several technical tasks to prepare for the start of development:
Here's an enumeration :
- I created this site to document the progress and describe the project.
- Design and preparation of the basic shell/structure of the code with the objective of preserving maintainability over time. The structure is inspired by the MVC model (model-view-controller).
- Describe the preliminary techniques to start the application and contribute to the project.
- Creation of a basic [design document](/projet-IFT3150/extra/endPoints.html) to elaborate the different endpoints that reflects different user stories.
- Designed a UI [prototype](https://www.figma.com/file/PKpWv1xNZZSQ9bKw9wtKBu/Geo-app) to provide suggestions.

#### June 13 - 27, 2022:

During this time I did:
- Addition of different end-points described in the back-end design document I previously made.
- Progress on understanding the requirements by drawing a starting data model with the team.
- Added the routing functionality in the front-end which will allow us to transition from one page to another.
- Addition of basic functionalities and different components: Header, Footer, home page, etc.
- Preparation of the technical basis for the use of the redux tool - a tool that will allow us to manage the state across several components.

#### June 27 - July 25, 2022:

During this period, I worked a lot on creating a basic front-end prototype that we can present in order to get feedback.
This includes the creation of different components: modals, pages, the map component, etc.
I also worked on functional aspects related the different contexts changes of the application.