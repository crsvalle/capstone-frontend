**<h1 align='center'><span style='color: #fd2a5c'>KEEPSAKE</span></h1>**

## Live: [Keepsake](https://keepssake.netlify.app/)

### Requirements
- For development, you will only need Node.js installed on your environement and the backend API.
- A [Firebase account for image storage](https://firebase.google.com/docs/storage), [Google API for Geolocation](https://developers.google.com/maps/documentation/geolocation/overview), and [Stripe API](https://docs.stripe.com/api).
- [The Backend Repository for API](https://github.com/teegrg/keepsake-backend)

### Getting started

**Clone the Repository**: Use the following command to clone the repository:
```bash
git clone <repository_url>
```

**Install Dependencies**: Run this command to install dependencies:
```bash
npm install
```

 **Configure App**: Add API variable in the environmental file:
```bash
REACT_APP_API_URL=<"server_url"> # API key for your backend service
REACT_APP_API_KEY=<"client_url"> # Client URL 
REACT_APP_GEOLOCATION_API= <"google_geolocation_api">
REACT_APP_AUTH_DOMAIN=<"your-app.firebaseapp.com">    # Firebase authentication domain
REACT_APP_PROJECT_ID=<"your_project_id">     # Firebase project ID
REACT_APP_STORAGE_BUCKET=<"your-app-id.appspot.com"> # Firebase storage bucket URL
REACT_APP_MSG_SENDER_ID=<"your_sender_id">  # Firebase messaging sender ID
REACT_APP_APP_ID=<"your_application_id">         # Firebase application ID
REACT_APP_MEASUREMENT_ID=<"your_measurement_id"> # Google Analytics measurement ID

REACT_APP_STRIPE_API_KEY = <"stripe_api">
```

### Start
```bash
npm start
```

### Future Features
* [ ] Add a secure Chat system to enable users to chat to one another.
* [ ] Notifications and Alerts:
Expiration Dates: Notify users of items nearing expiration or needing maintenance.
Item Reminders: Set reminders for retrieving or replacing items.
* [ ] Integrate a better User Management System.

## Creators

👤 **Cristian Valle**  
Github: [@crsvalle](https://github.com/crsvalle)  
👤 **Tshering Gurung**  
Github: [@teegrg](https://github.com/teegrg)  
👤 **Rizwan Kawsar**  
Github: [@RK-404](https://github.com/RK-404)  
👤 **Jerry John**  
Github: [@imjerryjohn](https://github.com/imjerryjohn)
