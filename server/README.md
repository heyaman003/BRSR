
In /src/modules folder all the modules are listed i.e.:

  /auth - Includes the user authentication related APIs.
  /chat - Pending (AI Chatbot)
  /company - Includes the company details related APIs.
  /conflict-resolution - Has the websocket endpoints related to conflict-resolution in      table and subsections.
  /notification - Manages the notification system
  /question-comments -  Manages the comment related feature
  /section - Includes all the APIs related to subsection, question and table.
  /user -  Manages all the user related APIs.

Each module has their own repository, service, controller and module.

Route information:

  /src/modules/auth:
       
       - POST "/auth/signin" - User signin.

       - POST "/auth/logout" - Logout the current user.

       - GET "/auth/userdetails" -  Get the userdetails of the currently logged in user.
    
  /chat: 

  
  /src/modules/company:

       - POST "/company" - Creates a company. 
       - GET "/company/all" - Lists all the companies. 
       - GET "/company/:companyId" -  Lists the company details of a given company.
       - DELETE "/company/:companyId" -  Deletes a given company.
       - GET "/company/:companyId/sections" -  Lists the section details of a given company. i.e Sections, Subsections and Questions. * Not the answer to the questions.
       - GET "/company/:companyId/questions/stats" - Lists the questions stats of the company. i.e. the total number of questions and total answered among them.
        
  /src/modules/conflict-resolution:
      Contains the websocket endpoints related to conflict resolutions.

       - /conflict-resolution/join-room - Join a room in the conflict-resolution namespace.

       - Method that broadcasts the table change in a room. (to be used by other services).

       - Mathod that broadcasts text answer change in a room. (to be used by other services).

  /src/modules/notification:
      Contains the logic regarding the user mention notification.
        
       - Server Sent Event - "/notification/mentions/:userId" - Add client to the set of active clients.

       - GET - "/notification/mentions/:userId/close" - Remove client from the set of active clients.

       - Method - sendNotification(userId, data) - Sends notification
  
  /src/modules/question-comment:
      Contains the logic regarding the question comments feature.
       
       - POST - "/comment" - Adds a comment to the given question

       - GET - "/comment" - Lists all the comments corresponding to a question


  /src/modules/section:
      
      - GET - "/section/subsection/:subsectionId" - Fetches the whole subsection data, i.e. all the questions, tables, rows and cells.

      - POST - "/section/subsection/:subsectionId" - Saves the subsection data.

      - POST - "/section/table/:tableId" - Updates a table.

  /src/modules/section:

      - GET - "/section/:sectionId/extract" - Exports the given section data to a pdf.

      - GET -  "/section/:qeustionId/hisotry" - Lists the history of a question.


  /src/modules/user:

      - POST - "/user/create/client" - Create an user with client role. Requires Admin or Superadmin privilege.
      
      - POST - "/user/create/client" - Create an user with client role. Requires Admin or Superadmin privilege.

      - POST - "/user/create/admin" - Create an user with role Admin. Requires Superadmin privilege.

      - DELETE - "/user/userId" - Deletes an user.

      - GET - "/get/mentions" - Fetches all the mentions corresponding to an user.



In /src/utils all the utility files are present:

    /src/utils/auth includes the authentication related utilites:

        - auth.guard.ts - includes the authentication guard. This is a global guard applied to all routes in the application.

        - public.decorator.ts - includes the custom decorator that marks any route as Public route. A public is used to bypass authentication on a route.

        - roles.decorator.ts - decorator that sets the role for any route

    /src/utils/interceptors includes all the interceptors in the application:

        - /src/utils/interceptors/process-response.interceptor.ts has the interceptor that intercepts all the http response going out from the application and processes it. i.e. updates the statuscode and deletes empty body.


    /src/utils/convertToPdf.ts contains method for exporting a subsection to a PDF


